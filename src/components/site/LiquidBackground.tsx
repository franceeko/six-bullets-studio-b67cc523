import { useEffect, useRef } from "react";

/**
 * Fixed, cursor-reactive liquid backdrop.
 * Two blobs drift on their own; a third tracks the pointer with lag.
 * All rendered inside an SVG with a gooey filter for the liquid merge.
 */
export function LiquidBackground() {
  const trackRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      if (trackRef.current) {
        trackRef.current.setAttribute("cx", String(x));
        trackRef.current.setAttribute("cy", String(y));
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="42" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -12"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>

        <g filter="url(#goo)">
          {/* Slow drifting blobs */}
          <circle cx="18%" cy="22%" r="180" fill="oklch(0.86 0.05 20 / 0.55)">
            <animate
              attributeName="cx"
              values="18%;30%;14%;22%;18%"
              dur="26s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="22%;18%;30%;24%;22%"
              dur="30s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="80%" cy="72%" r="220" fill="oklch(0.82 0.11 70 / 0.5)">
            <animate
              attributeName="cx"
              values="80%;70%;86%;74%;80%"
              dur="34s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values="72%;80%;66%;76%;72%"
              dur="28s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="60%" cy="12%" r="140" fill="oklch(0.78 0.09 195 / 0.35)">
            <animate
              attributeName="cx"
              values="60%;52%;66%;58%;60%"
              dur="38s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Cursor-tracking blob */}
          <circle ref={trackRef} cx="50%" cy="50%" r="150" fill="oklch(0.38 0.18 20 / 0.28)" />
        </g>
      </svg>
    </div>
  );
}
