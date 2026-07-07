import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor — a small ink dot + a lagging ring.
 * Uses mix-blend-mode: difference so it reads on any surface.
 * Hidden on touch devices. Grows on interactive hover targets.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        dot.current?.style.setProperty("transform", `translate3d(${x - 4}px, ${y - 4}px, 0)`);
        ring.current?.style.setProperty("transform", `translate3d(${x - 18}px, ${y - 18}px, 0)`);
        raf = 0;
      });
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive =
        t.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']");
      setHover(!!interactive);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] size-2 rounded-full bg-cream mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] rounded-full border border-cream mix-blend-difference transition-[width,height,opacity,border-color] duration-150"
        style={{
          width: hover ? 44 : 36,
          height: hover ? 44 : 36,
          opacity: hover ? 0.9 : 0.55,
          willChange: "transform",
        }}
      />
    </>
  );
}
