import { useEffect, useState } from "react";

/**
 * Six-step rendering budget.
 * ultra    — strong desktop GPU: full shader, 60fps, high dpr
 * high     — normal desktop / flagship phone
 * balanced — mid-range phone or modest laptop
 * eco      — weak phone: cheap shader, 30fps, half resolution
 * minimal  — very weak device: tiny shader, 20fps, quarter resolution
 * static   — no shader at all (CSS gradient only)
 */
export type PerfTier = "ultra" | "high" | "balanced" | "eco" | "minimal" | "static";

export type PerfSettings = {
  /** fbm octaves in the fragment shader */
  octaves: number;
  /** device pixel ratio cap */
  maxDpr: number;
  /** internal resolution multiplier */
  scale: number;
  /** target framerate */
  fps: number;
  /** enables secondary decorations (ripples, veins, grain) */
  rich: boolean;
};

export const PERF_SETTINGS: Record<PerfTier, PerfSettings> = {
  ultra: { octaves: 6, maxDpr: 2, scale: 0.9, fps: 60, rich: true },
  high: { octaves: 5, maxDpr: 1.5, scale: 0.75, fps: 60, rich: true },
  balanced: { octaves: 4, maxDpr: 1.25, scale: 0.6, fps: 45, rich: true },
  eco: { octaves: 3, maxDpr: 1, scale: 0.5, fps: 30, rich: false },
  minimal: { octaves: 2, maxDpr: 1, scale: 0.34, fps: 20, rich: false },
  static: { octaves: 0, maxDpr: 1, scale: 0, fps: 0, rich: false },
};

/** Ordered from cheapest to most expensive — used when stepping down. */
export const TIER_ORDER: PerfTier[] = ["static", "minimal", "eco", "balanced", "high", "ultra"];

export function downgrade(tier: PerfTier): PerfTier {
  const i = TIER_ORDER.indexOf(tier);
  return TIER_ORDER[Math.max(0, i - 1)] ?? "static";
}

type NavigatorSignals = Navigator & {
  deviceMemory?: number;
  hardwareConcurrency?: number;
};

function gpuScore(): number {
  try {
    const c = document.createElement("canvas");
    const gl = c.getContext("webgl") as WebGLRenderingContext | null;
    if (!gl) return 0;
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const raw = dbg
      ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) ?? "")
      : String(gl.getParameter(gl.RENDERER) ?? "");
    const r = raw.toLowerCase();
    if (/swiftshader|software|llvmpipe|basic render/.test(r)) return 0;
    if (/rtx|radeon rx|apple m[1-9]|geforce (gtx|rtx)/.test(r)) return 3;
    if (/apple a1[3-9]|adreno (6|7)|mali-g7|iris|intel arc/.test(r)) return 2;
    return 1;
  } catch {
    return 1;
  }
}

export function detectPerfTier(): PerfTier {
  if (typeof window === "undefined") return "balanced";

  const nav = window.navigator as NavigatorSignals;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.innerWidth < 420;
  const gpu = gpuScore();

  if (reduced || gpu === 0) return "static";
  if (memory <= 2 || cores <= 2) return "minimal";
  if (coarse) {
    // Phones stay conservative on purpose: the shader is decoration, a lost
    // WebGL context (blank screen) is a bug the visitor actually notices.
    if (narrow || memory <= 3 || cores <= 4) return "minimal";
    return "eco";
  }

  if (cores <= 4 || memory <= 4) return "balanced";
  if (gpu >= 3 && cores >= 8) return "ultra";
  return "high";
}

/**
 * Detects the tier once on mount and keeps watching the real framerate.
 * If the page consistently misses its budget, the tier steps down a notch.
 */
export function usePerfProfile(): { tier: PerfTier; settings: PerfSettings } {
  const [tier, setTier] = useState<PerfTier>("balanced");

  useEffect(() => {
    let current = detectPerfTier();
    setTier(current);

    let frames = 0;
    let windowStart = performance.now();
    let strikes = 0;
    let raf = 0;
    let alive = true;

    const tick = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(tick);
      frames++;
      const elapsed = now - windowStart;
      if (elapsed < 2000) return;

      const fps = (frames * 1000) / elapsed;
      frames = 0;
      windowStart = now;

      const target = PERF_SETTINGS[current].fps;
      if (target > 0 && fps < target * 0.62) {
        strikes++;
        if (strikes >= 2) {
          const next = downgrade(current);
          if (next !== current) {
            current = next;
            setTier(next);
          }
          strikes = 0;
        }
      } else {
        strikes = 0;
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return { tier, settings: PERF_SETTINGS[tier] };
}
