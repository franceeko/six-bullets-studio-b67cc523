import { useEffect, useRef } from "react";

import { detectDeviceTier, type DeviceTier } from "@/hooks/use-device-tier";

/**
 * Liquid background — WebGL fragment shader (fbm + domain warping) with
 * pointer/touch ripples, light+dark palettes and a per-device render budget.
 * Falls back to the CSS gradient painted by `.liquid-bg` when WebGL is
 * unavailable or the device is too weak to afford a shader.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const MAX_RIPPLES = 4;

const frag = (octaves: number) => `
precision mediump float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uPress;
uniform float uDark;
uniform vec3  uRipples[${MAX_RIPPLES}];

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
        dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
    mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
        dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < ${octaves}; i++) {
    v += a * noise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float m0 = min(uRes.x, uRes.y);
  vec2 st = (gl_FragCoord.xy - 0.5 * uRes.xy) / m0;

  float t = uTime * 0.06;

  // pointer swirl
  vec2 m = (uMouse - 0.5 * uRes.xy) / m0;
  vec2 d = st - m;
  float pull = uPress * exp(-length(d) * 2.4);
  vec2 swirl = vec2(-d.y, d.x) * pull * 1.6;

  // touch ripples — each is (x, y, strength) in the same normalised space
  float ripple = 0.0;
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec3 r = uRipples[i];
    if (r.z > 0.001) {
      vec2 rd = st - r.xy;
      float rl = length(rd);
      float wave = sin(rl * 26.0 - (1.0 - r.z) * 12.0) * exp(-rl * 5.0);
      ripple += wave * r.z;
      swirl += normalize(rd + 0.0001) * wave * r.z * 0.35;
    }
  }

  vec2 q = vec2(fbm(st * 1.6 + vec2(0.0, t)),
                fbm(st * 1.6 + vec2(5.2, 1.3) - t * 0.8));

  vec2 r2 = vec2(fbm(st * 1.9 + 3.5 * q + vec2(1.7, 9.2) + t * 1.2 + swirl),
                 fbm(st * 1.9 + 3.5 * q + vec2(8.3, 2.8) - t * 0.9 + swirl));

  float f = fbm(st * 1.4 + 3.2 * r2 + pull * 0.8) + ripple * 0.18;

  // light palette — cream / paper / bone / ink
  vec3 lBase = vec3(0.976, 0.972, 0.964);
  vec3 lMid  = vec3(0.929, 0.921, 0.909);
  vec3 lEdge = vec3(0.847, 0.839, 0.827);
  vec3 lVein = vec3(0.090, 0.090, 0.090);

  // dark palette — graphite / slate with a warm amber vein
  vec3 dBase = vec3(0.070, 0.068, 0.074);
  vec3 dMid  = vec3(0.113, 0.110, 0.121);
  vec3 dEdge = vec3(0.168, 0.163, 0.180);
  vec3 dVein = vec3(0.850, 0.640, 0.330);

  vec3 base = mix(lBase, dBase, uDark);
  vec3 mid  = mix(lMid,  dMid,  uDark);
  vec3 edge = mix(lEdge, dEdge, uDark);
  vec3 vein = mix(lVein, dVein, uDark);

  float band = smoothstep(-0.35, 0.55, f);
  vec3 col = mix(base, mid, smoothstep(0.15, 0.85, band));
  col = mix(col, edge, smoothstep(0.62, 1.0, band) * 0.85);

  float veinMask = smoothstep(0.015, 0.0, abs(f - 0.16));
  col = mix(col, vein, veinMask * mix(0.10, 0.22, uDark));
  col = mix(col, vein, pull * mix(0.05, 0.10, uDark));

  float vig = smoothstep(1.15, 0.25, length(uv - 0.5) * 1.4);
  col *= mix(mix(0.94, 1.0, vig), mix(0.80, 1.06, vig), uDark);

  gl_FragColor = vec4(col, 1.0);
}
`;

type TierSettings = {
  octaves: number;
  maxDpr: number;
  scale: number;
  fps: number;
};

const TIERS: Record<Exclude<DeviceTier, "low">, TierSettings> = {
  high: { octaves: 5, maxDpr: 1.5, scale: 0.75, fps: 60 },
  medium: { octaves: 3, maxDpr: 1, scale: 0.5, fps: 30 },
};

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function LiquidBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const tier = detectDeviceTier();
    if (tier === "low") return; // CSS gradient only — zero GPU cost

    const settings = TIERS[tier];

    const gl =
      (canvas.getContext("webgl", {
        antialias: false,
        alpha: true,
        depth: false,
        powerPreference: tier === "high" ? "default" : "low-power",
      }) as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, frag(settings.octaves));
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uPress = gl.getUniformLocation(prog, "uPress");
    const uDark = gl.getUniformLocation(prog, "uDark");
    const uRipples = gl.getUniformLocation(prog, "uRipples");

    const dpr = () =>
      Math.min(window.devicePixelRatio || 1, settings.maxDpr) * settings.scale;

    let w = 1;
    let h = 1;
    const resize = () => {
      const s = dpr();
      w = Math.max(1, Math.floor(window.innerWidth * s));
      h = Math.max(1, Math.floor(window.innerHeight * s));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    };
    window.addEventListener("resize", onResize);

    // --- pointer / touch state -------------------------------------------
    let tx = w / 2;
    let ty = h / 2;
    let mx = tx;
    let my = ty;
    let targetPress = 0;
    let press = 0;

    type Ripple = { x: number; y: number; born: number };
    const ripples: Ripple[] = [];
    const rippleData = new Float32Array(MAX_RIPPLES * 3);
    const RIPPLE_LIFE = 1600;

    const toCanvas = (cx: number, cy: number) => {
      const s = dpr();
      return { x: cx * s, y: (window.innerHeight - cy) * s };
    };

    const setTarget = (cx: number, cy: number) => {
      const p = toCanvas(cx, cy);
      tx = p.x;
      ty = p.y;
      targetPress = 1;
    };

    const addRipple = (cx: number, cy: number) => {
      const m0 = Math.min(w, h);
      const p = toCanvas(cx, cy);
      ripples.push({
        x: (p.x - w / 2) / m0,
        y: (p.y - h / 2) / m0,
        born: performance.now(),
      });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };

    const onPointerMove = (e: PointerEvent) => setTarget(e.clientX, e.clientY);
    const onPointerDown = (e: PointerEvent) => {
      setTarget(e.clientX, e.clientY);
      addRipple(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setTarget(t.clientX, t.clientY);
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        setTarget(t.clientX, t.clientY);
        addRipple(t.clientX, t.clientY);
      }
    };
    const onRelease = () => {
      targetPress = 0;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onRelease, { passive: true });
    window.addEventListener("pointerleave", onRelease);

    // --- theme ------------------------------------------------------------
    let targetDark = document.documentElement.classList.contains("dark") ? 1 : 0;
    let dark = targetDark;
    const themeObserver = new MutationObserver(() => {
      targetDark = document.documentElement.classList.contains("dark") ? 1 : 0;
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // --- loop -------------------------------------------------------------
    let raf = 0;
    let running = true;
    const start = performance.now();
    const frameBudget = 1000 / settings.fps;
    let last = 0;

    const render = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(render);
      if (now - last < frameBudget) return;
      last = now;

      const time = (now - start) / 1000;
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      press += (targetPress - press) * 0.05;
      dark += (targetDark - dark) * 0.08;

      rippleData.fill(0);
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]!;
        const life = 1 - (now - r.born) / RIPPLE_LIFE;
        if (life <= 0) {
          ripples.splice(i, 1);
          continue;
        }
        const slot = i * 3;
        rippleData[slot] = r.x;
        rippleData[slot + 1] = r.y;
        rippleData[slot + 2] = life * life;
      }

      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uPress, press);
      gl.uniform1f(uDark, dark);
      gl.uniform3fv(uRipples, rippleData);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(render);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onRelease);
      window.removeEventListener("pointerleave", onRelease);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div aria-hidden className="liquid-bg">
      <canvas ref={ref} className="liquid-canvas" />
      <span className="liquid-grain" />
    </div>
  );
}
