import { useEffect, useRef, useState } from "react";

import { detectPerfTier, PERF_SETTINGS, downgrade, type PerfTier } from "@/hooks/usePerfProfile";

/**
 * Liquid background — a real water surface.
 *
 * Instead of the old fbm blob field (which read as gelatin), this builds a
 * height field from crossing directional waves, derives a surface normal from
 * it and shades it: soft shadows in the troughs, thin caustic lines where the
 * light focuses, and a specular glint on the crests. Pointer/touch adds
 * expanding rings that disperse and die out.
 *
 * Falls back to the CSS gradient painted by `.liquid-bg` when WebGL is
 * unavailable or the device is too weak to afford a shader.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const MAX_RIPPLES = 5;

/** Directional wave bank: dir.xy, frequency, speed, amplitude. */
const WAVES: Array<[number, number, number, number, number]> = [
  [1.0, 0.28, 3.0, 1.05, 1.0],
  [-0.62, 1.0, 4.35, -0.82, 0.72],
  [0.86, -0.9, 6.1, 1.4, 0.46],
  [-1.0, -0.42, 8.4, -1.15, 0.3],
  [0.35, 1.0, 12.2, 1.75, 0.17],
  [-0.9, 0.62, 17.5, -1.35, 0.1],
  [1.0, 0.9, 24.0, 2.1, 0.06],
  [0.2, -1.0, 33.0, -1.9, 0.035],
];

const waveBank = (count: number) =>
  WAVES.slice(0, Math.max(2, Math.min(WAVES.length, count)))
    .map(([dx, dy, f, s, a]) => {
      const len = Math.hypot(dx, dy) || 1;
      return `  h += ${a.toFixed(3)} * sin(dot(p, vec2(${(dx / len).toFixed(4)}, ${(
        dy / len
      ).toFixed(4)})) * ${f.toFixed(3)} + t * ${s.toFixed(3)});`;
    })
    .join("\n");

/** exported so the GLSL can be compile-tested outside the browser harness */
export const frag = (waves: number, rich: boolean) => `
precision mediump float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uPress;
uniform float uVel;
uniform float uDark;
uniform float uScroll;

uniform vec3  uRipples[${MAX_RIPPLES}];

// ---- surface height -------------------------------------------------------
float waveField(vec2 p, float t) {
  float h = 0.0;
${waveBank(waves)}
  return h;
}

float surface(vec2 p, float t, vec2 m, float press, float vel) {
  // slow lateral drift keeps the sheet alive without the pointer;
  // uScroll keeps the field moving as the visitor goes down the page so the
  // lower sections never sit on a flat, dead patch of water.
  vec2 q = p + vec2(t * 0.012 + uScroll * 0.18, t * 0.006 + uScroll);

  // gentle swell around the pointer — a wide, soft bulge, never a yank
  vec2 d = q - m;
  float dist = length(d);
  float swell = exp(-dist * 2.2) * (0.080 + press * 0.128 + vel * 0.208);
  q -= normalize(d + 0.0001) * swell * 0.35;

  float h = waveField(q, t);

  // ripples: expanding rings that spread and fade
  for (int i = 0; i < ${MAX_RIPPLES}; i++) {
    vec3 r = uRipples[i];
    if (r.z > 0.001) {
      float age = 1.0 - r.z;
      float rl = length(q - r.xy);
      float front = rl - age * 0.85;
      h += 0.44 * r.z * sin(front * 26.0) * exp(-abs(front) * 9.0) * exp(-rl * 1.4);
    }
  }


  return h;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  float m0 = min(uRes.x, uRes.y);
  vec2 st = (gl_FragCoord.xy - 0.5 * uRes.xy) / m0;

  float t = uTime * 0.34;
  vec2 m = (uMouse - 0.5 * uRes.xy) / m0;

  float e = 1.6 / m0;
  float h  = surface(st, t, m, uPress, uVel);
  float hx = surface(st + vec2(e, 0.0), t, m, uPress, uVel);
  float hy = surface(st + vec2(0.0, e), t, m, uPress, uVel);

  // surface normal from the height gradient
  vec3 n = normalize(vec3(-(hx - h) / e, -(hy - h) / e, 12.0));

  vec3 lightDir = normalize(vec3(-0.45, 0.75, 0.62));
  float diff = clamp(dot(n, lightDir), 0.0, 1.0);
  float spec = pow(clamp(dot(reflect(-lightDir, n), vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 42.0);
  float fres = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.0);

  // caustics — light focusing through the surface, the detail that reads "water"
  float curve = (hx + hy - 2.0 * h) / (e * e);
  float caustic = pow(clamp(1.0 - abs(curve) * 0.0016, 0.0, 1.0), 22.0);
  ${
    rich
      ? `float caustic2 = pow(abs(sin(h * 3.1 + t * 0.6)), 26.0);
  caustic = caustic * 0.75 + caustic2 * 0.55;`
      : ``
  }

  float depth = smoothstep(-1.6, 1.9, h);

  // --- palettes -------------------------------------------------------------
  // light: white paper seen through shallow water, graphite shadows
  vec3 lDeep  = vec3(0.622, 0.622, 0.630);
  vec3 lShall = vec3(0.945, 0.943, 0.938);
  vec3 lLight = vec3(0.180, 0.180, 0.182);

  // dark: black water with hot gold light
  vec3 dDeep  = vec3(0.020, 0.019, 0.018);
  vec3 dShall = vec3(0.120, 0.108, 0.086);
  vec3 dLight = vec3(1.000, 0.780, 0.330);

  vec3 deep  = mix(lDeep,  dDeep,  uDark);
  vec3 shall = mix(lShall, dShall, uDark);
  vec3 glow  = mix(lLight, dLight, uDark);

  vec3 col = mix(deep, shall, depth);
  col = mix(col, shall, diff * mix(0.30, 0.22, uDark));

  // caustic lines: dark graphite streaks on paper, gold filaments in the dark
  col = mix(col, glow, caustic * mix(0.34, 0.62, uDark));

  // rim + specular
  col += glow * fres * mix(0.06, 0.18, uDark);
  col += glow * spec * mix(0.35, 0.95, uDark);

  float vig = smoothstep(1.20, 0.28, length(uv - 0.5) * 1.4);
  col *= mix(mix(0.88, 1.02, vig), mix(0.55, 1.12, vig), uDark);

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
  // Bumped when the GPU context is restored — remounts the whole GL setup
  // (shader, program, buffers, uniforms) instead of just showing the canvas.
  const [gen, setGen] = useState(0);

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

    // octaves double as the wave count for the water bank
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, frag(settings.octaves + 2, settings.rich));
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
    const uScroll = gl.getUniformLocation(prog, "uScroll");


    // Touch devices never go above dpr 1 — the extra pixels are the main
    // cause of GPU memory pressure (and lost contexts) on phones.
    const coarse =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const dprCap = coarse ? Math.min(1, settings.maxDpr) : settings.maxDpr;
    const dpr = () => Math.min(window.devicePixelRatio || 1, dprCap) * settings.scale;

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
    const RIPPLE_LIFE = 1600;
    let lastRipple = 0;

    const toCanvas = (cx: number, cy: number) => {
      const s = dpr();
      return { x: cx * s, y: (window.innerHeight - cy) * s };
    };

    const setTarget = (cx: number, cy: number) => {
      // Clamp to the viewport: a pointer that leaves the window (or a stray
      // event with a wild coordinate) used to park the swell far outside the
      // field, which froze the surface into a flat smear.
      if (!Number.isFinite(cx) || !Number.isFinite(cy)) return;
      const vx = Math.min(Math.max(cx, 0), window.innerWidth);
      const vy = Math.min(Math.max(cy, 0), window.innerHeight);
      const p = toCanvas(vx, vy);
      tx = p.x;
      ty = p.y;
      targetPress = 1;
    };

    /** Pointer gone (left the window / alt-tab): drift back to the middle. */
    const recenter = () => {
      tx = w / 2;
      ty = h / 2;
      targetPress = 0;
    };

    const addRipple = (cx: number, cy: number) => {
      // Rate-limited: hammering the screen must never queue extra work.
      const now = performance.now();
      if (now - lastRipple < 200) return;
      lastRipple = now;
      const m0 = Math.min(w, h);
      const vx = Math.min(Math.max(cx, 0), window.innerWidth);
      const vy = Math.min(Math.max(cy, 0), window.innerHeight);
      const p = toCanvas(vx, vy);
      ripples.push({
        x: (p.x - w / 2) / m0,
        y: (p.y - h / 2) / m0,
        born: now,
      });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    };

    // forward declarations — resume() is defined with the loop below
    let wake = () => {};

    const onPointerMove = (e: PointerEvent) => {
      wake();
      setTarget(e.clientX, e.clientY);
    };
    const onPointerDown = (e: PointerEvent) => {
      wake();
      setTarget(e.clientX, e.clientY);
      addRipple(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        wake();
        setTarget(t.clientX, t.clientY);
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) {
        wake();
        setTarget(t.clientX, t.clientY);
        addRipple(t.clientX, t.clientY);
      }
    };
    const onRelease = () => {
      targetPress = 0;
    };
    const onPointerOut = (e: PointerEvent) => {
      // relatedTarget null == the pointer actually left the window
      if (!e.relatedTarget) recenter();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onRelease, { passive: true });
    window.addEventListener("pointerleave", onRelease);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("mouseleave", recenter);

    // --- scroll ------------------------------------------------------------
    let targetScroll = 0;
    let scroll = 0;
    const onScroll = () => {
      targetScroll = (window.scrollY || 0) / Math.max(1, window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });


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
    let lost = false;

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

      // inertia — the water drifts slowly toward the pointer, no whiplash
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      const m0 = Math.min(w, h);
      const dx = (mx - lastX) / m0;
      const dy = (my - lastY) / m0;
      lastX = mx;
      lastY = my;
      const speed = Math.min(1, Math.hypot(dx, dy) * 8);
      vel += (speed - vel) * 0.07;
      press += (targetPress - press) * 0.05;

      dark += (targetDark - dark) * 0.08;
      scroll += (targetScroll - scroll) * 0.05;


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
      gl.uniform1f(uScroll, scroll * 0.35);

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
            // never fall below "eco": lower tiers look like broken pixels
            const next = downgrade(tier, "eco");

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

    const pause = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };
    const resume = () => {
      if (running || lost) return;
      running = true;
      last = 0;
      windowStart = performance.now();
      frames = 0;
      raf = requestAnimationFrame(render);
    };
    const onVisibility = () => (document.hidden ? pause() : resume());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", pause);
    window.addEventListener("blur", pause);
    window.addEventListener("focus", resume);
    window.addEventListener("pageshow", resume);

    // --- lost context (the classic mobile blank/grey screen) ---------------
    const onLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      pause();
      canvas.style.display = "none"; // fall back to the CSS gradient
    };
    const onRestored = () => {
      lost = false;
      canvas.style.display = "";
      // Rebuild happens on the next mount; keep the gradient until then.
    };
    canvas.addEventListener("webglcontextlost", onLost as EventListener, false);
    canvas.addEventListener("webglcontextrestored", onRestored, false);

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
      window.removeEventListener("pagehide", pause);
      window.removeEventListener("blur", pause);
      window.removeEventListener("focus", resume);
      window.removeEventListener("pageshow", resume);
      canvas.removeEventListener("webglcontextlost", onLost as EventListener);
      canvas.removeEventListener("webglcontextrestored", onRestored);
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
