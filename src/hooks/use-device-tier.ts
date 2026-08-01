import { useEffect, useState } from "react";

/**
 * Rendering budget for the current device.
 * - high:   desktop / recent phones — full shader, 60fps
 * - medium: mid-range phones — full shader, half framerate, dpr 1
 * - low:    weak or memory-starved devices (J2/J3 class) — no shader at all
 */
export type DeviceTier = "high" | "medium" | "low";

type NavigatorWithMemory = Navigator & {
  deviceMemory?: number;
  hardwareConcurrency?: number;
};

export function detectDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "medium";

  const nav = window.navigator as NavigatorWithMemory;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.innerWidth < 480;

  if (reduced) return "low";
  if (memory <= 2 || cores <= 2) return "low";
  if (coarse && (memory <= 4 || cores <= 4 || narrow)) return "medium";
  if (coarse) return "medium";
  if (cores <= 4 && memory <= 4) return "medium";
  return "high";
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("medium");

  useEffect(() => {
    setTier(detectDeviceTier());
  }, []);

  return tier;
}
