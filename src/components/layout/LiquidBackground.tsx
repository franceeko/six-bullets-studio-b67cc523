import { useEffect, useRef } from "react";

import { detectPerfTier, PERF_SETTINGS, downgrade, type PerfTier } from "@/hooks/usePerfProfile";

/**
 * Liquid background — WebGL fragment shader (fbm + domain warping) with strong
 * pointer/touch reactivity, light+dark palettes and a six-step render budget.
 * Falls back to the CSS gradient painted by `.liquid-bg` when WebGL is
 * unavailable or the device is too weak to afford a shader.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const MAX_RIPPLES = 5;

const frag = (octaves: number, rich: boolean) => `
precision mediump float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uPress;
uniform float uVel;
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

  float t = uTime * 0.075;

  // pointer field — wide, strong pull plus a rotating swirl
  vec2 m = (uMouse - 0.5 * uRes.xy) / m0;
  vec2 d = st - m;
  float dist = length(d);
  float falloff = exp(-dist * 1.5);
  float pull = (0.55 + uPress * 0.9 + uVel * 1.4) * falloff;
  vec2 swirl = vec2(-d.y, d.x) * pull * 3.2;
  swirl += normalize(d + 0.0001) * pull * 0.9 * sin(uTime * 0.9 - dist * 6.0);

  // touch ripples — each is (x, y, strength) in the same normalised space
  float ripple = 0.0;
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec3 r = uRipples[i];
    if (r.z > 0.001) {
      vec2 rd = st - r.xy;
      float rl = length(rd);
      float wave = sin(rl * 22.0 - (1.0 - r.z) * 16.0) * exp(-rl * 3.4);
      ripple += wave * r.z;
      swirl += normalize(rd + 0.0001) * wave * r.z * 1.1;
    }
  }

  vec2 q = vec2(fbm(st * 1.5 + vec2(0.0, t) + swirl * 0.35),
                fbm(st * 1.5 + vec2(5.2, 1.3) - t * 0.8 + swirl * 0.35));

  vec2 r2 = vec2(fbm(st * 1.85 + 3.8 * q + vec2(1.7, 9.2) + t * 1.2 + swirl),
                 fbm(st * 1.85 + 3.8 * q + vec2(8.3, 2.8) - t * 0.9 + swirl));

  float f = fbm(st * 1.35 + 3.4 * r2 + pull * 1.2) + ripple * 0.3;

  // light palette — cream / paper / bone / ink
  vec3 lBase = vec3(0.976, 0.972, 0.964);
  vec3 lMid  = vec3(0.925, 0.918, 0.906);
  vec3 lEdge = vec3(0.836, 0.828, 0.816);
  vec3 lVein = vec3(0.090, 0.090, 0.090);

  // dark palette — graphite / slate with a warm amber vein
  vec3 dBase = vec3(0.068, 0.066, 0.072);
  vec3 dMid  = vec3(0.115, 0.112, 0.123);
  vec3 dEdge = vec3(0.172, 0.166, 0.184);
  vec3 dVein = vec3(0.870, 0.650, 0.330);

  vec3 base = mix(lBase, dBase, uDark);
  vec3 mid  = mix(lMid,  dMid,  uDark);
  vec3 edge = mix(lEdge, dEdge, uDark);
  vec3 vein = mix(lVein, dVein, uDark);

  float band = smoothstep(-0.4, 0.6, f);
  vec3 col = mix(base, mid, smoothstep(0.12, 0.88, band));
  col = mix(col, edge, smoothstep(0.58, 1.0, band) * 0.9);

  ${
    rich
      ? `
  float veinMask = smoothstep(0.02, 0.0, abs(f - 0.16));
  col = mix(col, vein, veinMask * mix(0.14, 0.28, uDark));
  float veinMask2 = smoothstep(0.012, 0.0, abs(f + 0.10));
  col = mix(col, vein, veinMask2 * mix(0.07, 0.16, uDark));
  `
      : ``
  }
  col = mix(col, vein, clamp(pull, 0.0, 1.0) * mix(0.07, 0.14, uDark));

  float vig = smoothstep(1.15, 0.25, length(uv - 0.5) * 1.4);
  col *= mix(mix(0.94, 1.0, vig), mix(0.80, 1.06, vig), uDark);

  gl_FragColor = vec4(col, 1.0);
}
`;

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

    let tier: PerfTier = detectPerfTier();
    if (tier === "static") return; // CSS gradient only — zero GPU cost

    let settings = PERF_SETTINGS[tier];

    const gl =
      (canvas.getContext("webgl", {
        antialias: false,
        alpha: true,
        depth: false,
        powerPreference: tier === "ultra" || tier === "high" ? "high-performance" : "low-power",
      }) as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, frag(settings.octaves, settings.rich));
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
    const uVel = gl.getUniformLocation(prog, "uVel");
    const uDark = gl.getUniformLocation(prog, "uDark");
    const uRipples = gl.getUniformLocation(prog, "uRipples");

    const dpr = () => Math.min(window.devicePixelRatio || 1, settings.maxDpr) * settings.scale;

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
    let vel = 0;
    let lastX = tx;
    let lastY = ty;

    type Ripple = { x: number; y: number; born: number };
    const ripples: Ripple[] = [];
    const rippleData = new Float32Array(MAX_RIPPLES * 3);
    const RIPPLE_LIFE = 1900;

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
    let frameBudget = 1000 / settings.fps;
    let last = 0;

    // runtime watchdog — step the tier down if we keep missing the budget
    let frames = 0;
    let windowStart = performance.now();
    let strikes = 0;

    const render = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(render);
      if (now - last < frameBudget) return;
      last = now;

      const time = (now - start) / 1000;

      // inertia — the fluid keeps chasing the pointer after it stops
      mx += (tx - mx) * 0.1;
      my += (ty - my) * 0.1;
      const m0 = Math.min(w, h);
      const dx = (mx - lastX) / m0;
      const dy = (my - lastY) / m0;
      lastX = mx;
      lastY = my;
      const speed = Math.min(1, Math.hypot(dx, dy) * 14);
      vel += (speed - vel) * 0.12;
      press += (targetPress - press) * 0.08;
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
      gl.uniform1f(uVel, vel);
      gl.uniform1f(uDark, dark);
      gl.uniform3fv(uRipples, rippleData);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // watchdog
      frames++;
      if (now - windowStart > 2500) {
        const fps = (frames * 1000) / (now - windowStart);
        frames = 0;
        windowStart = now;
        if (fps < settings.fps * 0.6) {
          strikes++;
          if (strikes >= 2) {
            const next = downgrade(tier);
            if (next !== tier) {
              tier = next;
              settings = PERF_SETTINGS[tier];
              frameBudget = settings.fps > 0 ? 1000 / settings.fps : 1000;
              resize();
            }
            strikes = 0;
          }
        } else {
          strikes = 0;
        }
      }
    };
    raf = requestAnimationFrame(render);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = 0;
        windowStart = performance.now();
        frames = 0;
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
