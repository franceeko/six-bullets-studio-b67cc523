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

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      }
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
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
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
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
        className="pointer-events-none fixed left-0 top-0 z-[80] rounded-full border border-cream mix-blend-difference transition-[width,height,opacity] duration-200"
        style={{
          width: hover ? 56 : 36,
          height: hover ? 56 : 36,
          marginLeft: hover ? -28 + 18 : 0,
          marginTop: hover ? -28 + 18 : 0,
          opacity: hover ? 0.9 : 0.55,
          willChange: "transform",
        }}
      />
    </>
  );
}
