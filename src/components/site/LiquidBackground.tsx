import { useEffect, useRef } from "react";

/** Ultra-light liquid backdrop: no SVG filters, no blur filters, no endless JS loop. */
export function LiquidBackground() {
  const cursorBlob = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (cursorBlob.current) {
          cursorBlob.current.style.setProperty("--x", `${x}px`);
          cursorBlob.current.style.setProperty("--y", `${y}px`);
        }
        raf = 0;
      });
    };

    cursorBlob.current?.style.setProperty("--x", `${x}px`);
    cursorBlob.current?.style.setProperty("--y", `${y}px`);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="liquid-bg">
      <span className="liquid-blob liquid-blob-a" />
      <span className="liquid-blob liquid-blob-b" />
      <span ref={cursorBlob} className="liquid-blob liquid-cursor" />
    </div>
  );
}
