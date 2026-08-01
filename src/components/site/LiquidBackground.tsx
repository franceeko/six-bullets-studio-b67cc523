import { useEffect, useRef } from "react";

/**
 * Real liquid background — WebGL fragment shader with fbm + domain warping.
 * Reacts to pointer AND touch, runs on mobile (dpr clamped), pauses when the
 * tab is hidden, and degrades to a static CSS gradient when WebGL is missing.
 */

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform vec2  uMouse;
uniform float uPress;

// --- value noise ---------------------------------------------------------
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
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 st = (gl_FragCoord.xy - 0.5 * uRes.xy) / min(uRes.x, uRes.y);

  float t = uTime * 0.06;

  // pointer influence: a slow swirl centred on the cursor / finger
  vec2 m = (uMouse - 0.5 * uRes.xy) / min(uRes.x, uRes.y);
  vec2 d = st - m;
  float dist = length(d);
  float pull = uPress * exp(-dist * 2.4);
  vec2 swirl = vec2(-d.y, d.x) * pull * 1.6;

  // domain warping -> genuine liquid marbling
  vec2 q = vec2(fbm(st * 1.6 + vec2(0.0, t)),
                fbm(st * 1.6 + vec2(5.2, 1.3) - t * 0.8));

  vec2 r = vec2(fbm(st * 1.9 + 3.5 * q + vec2(1.7, 9.2) + t * 1.2 + swirl),
                fbm(st * 1.9 + 3.5 * q + vec2(8.3, 2.8) - t * 0.9 + swirl));

  float f = fbm(st * 1.4 + 3.2 * r + pull * 0.8);

  // ink-on-cream palette
  vec3 cream = vec3(0.976, 0.972, 0.964);
  vec3 paper = vec3(0.929, 0.921, 0.909);
  vec3 bone  = vec3(0.847, 0.839, 0.827);
  vec3 ink   = vec3(0.090, 0.090, 0.090);

  float band = smoothstep(-0.35, 0.55, f);
  vec3 col = mix(cream, paper, smoothstep(0.15, 0.85, band));
  col = mix(col, bone, smoothstep(0.62, 1.0, band) * 0.85);

  // thin ink veins where the marbling folds
  float vein = smoothstep(0.015, 0.0, abs(f - 0.16));
  col = mix(col, ink, vein * 0.10);

  // soft ink pooling around the pointer
  col = mix(col, ink, pull * 0.05);

  // vignette + faint top-light
  float vig = smoothstep(1.15, 0.25, length(uv - 0.5) * 1.4);
  col *= mix(0.94, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}


`;

export function LiquidBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl =
      (canvas.getContext("webgl", { antialias: false, alpha: true, depth: false }) as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
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

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = () => Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.5) * (coarse ? 0.6 : 0.75);

    let w = 0;
    let h = 0;
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
    window.addEventListener("resize", resize);

    let tx = w / 2;
    let ty = h / 2;
    let mx = tx;
    let my = ty;
    let tp = 0;
    let press = 0;

    const setTarget = (cx: number, cy: number) => {
      const s = dpr();
      tx = cx * s;
      ty = (window.innerHeight - cy) * s;
      tp = 1;
    };
    const onPointer = (e: PointerEvent) => setTarget(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setTarget(t.clientX, t.clientY);
    };
    const onLeave = () => {
      tp = 0;
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let running = true;
    const start = performance.now();

    const frame = () => {
      if (!running) return;
      const time = reduced ? 0 : (performance.now() - start) / 1000;
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      press += (tp - press) * 0.05;
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uPress, press);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced) raf = requestAnimationFrame(frame);
    };
    frame();

    const onVis = () => {
      if (document.hidden) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        frame();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div aria-hidden className="liquid-bg">
      <canvas ref={ref} className="liquid-canvas" />
      <span className="liquid-grain" />
    </div>
  );
}
