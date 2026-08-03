import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Reserved height while the section is unmounted. */
  minHeight?: number;
  /** How far outside the viewport the section stays mounted. */
  margin?: string;
  /** Keep mounted forever after the first reveal (for text-heavy sections). */
  once?: boolean;
  id?: string;
  className?: string;
};

/**
 * Mounts its children only while they are near the viewport.
 * When the visitor scrolls far away the subtree is unmounted, so its
 * animations, videos and shaders stop costing anything. Returning to the
 * section remounts it and replays the entrance animation immediately.
 */
export function SectionStage({
  children,
  minHeight = 720,
  margin = "600px 0px 600px 0px",
  once = false,
  id,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [reserved, setReserved] = useState(minHeight);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    // On touch devices we never unmount: fast scrolling + remount is what
    // leaves phones staring at a blank screen. Desktop keeps the unloading.
    const touch =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const keep = once || touch;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setActive(true);
          if (keep) io.disconnect();
        } else if (!keep) {
          // Remember the rendered height so the scroll position never jumps.
          const h = el.getBoundingClientRect().height;
          if (h > 0) setReserved(h);
          setActive(false);
        }
      },
      { rootMargin: margin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin, once]);


  return (
    <div
      ref={ref}
      id={id}
      className={className}
      style={active ? undefined : { minHeight: reserved }}
      data-stage={active ? "on" : "off"}
    >
      {active ? children : null}
    </div>
  );
}
