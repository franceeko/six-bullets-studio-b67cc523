import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

/**
 * Letter of the hero title.
 *
 * The entry mask (`overflow-hidden`) is dropped once the reveal finishes —
 * otherwise the pointer drift pushes each glyph against its own clip box and
 * the title looks sliced.
 */
function Letter({
  char,
  index,
  depth,
  px,
  py,
  revealed,
}: {
  char: string;
  index: number;
  depth: number;
  px: ReturnType<typeof useSpring>;
  py: ReturnType<typeof useSpring>;
  revealed: boolean;
}) {
  const x = useTransform(px, (v: number) => v * depth);
  const y = useTransform(py, (v: number) => v * depth * 0.6);

  return (
    <span
      className={`inline-block align-bottom ${revealed ? "" : "overflow-hidden"}`}
      style={{ lineHeight: 0.82 }}
    >
      <motion.span
        style={revealed ? { x, y } : undefined}
        initial={{ y: "115%", rotate: 4 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{
          delay: 0.12 + index * 0.055,
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="inline-block will-change-transform"
      >
        {char}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // pointer depth — each letter drifts a little, deeper letters move more
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 40);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 26);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY]);

  let counter = 0;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <motion.div
        style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}
        className="mx-auto w-full max-w-[1600px] origin-center px-5 lg:px-10"
      >
        <h1 className="font-display uppercase leading-[0.82] tracking-[-0.045em] text-ink">
          {LINES.map((line, li) => (
            <span
              key={line}
              className={`flex w-full ${li === 1 ? "justify-between" : "justify-start"}`}
              style={{ fontSize: li === 0 ? "clamp(5rem,26vw,20rem)" : "clamp(3.4rem,18.2vw,14rem)" }}
            >
              {line.split("").map((char, ci) => {
                const i = counter++;
                const depth = 0.35 + ((i * 7) % 10) / 12;
                return (
                  <Letter key={`${line}-${ci}`} char={char} index={i} depth={depth} px={px} py={py} />
                );
              })}
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 flex flex-wrap items-center justify-between gap-5 border-t border-ink/25 pt-5"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-ink/75 sm:text-xs">
            Roblox horror studio
          </span>
          <a
            href="#happy-town"
            className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink transition-colors hover:text-wine sm:text-xs"
          >
            Happy Town
            <span className="inline-block h-px w-10 bg-ink/50 transition-all group-hover:w-16 group-hover:bg-wine" />
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#studio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute inset-x-0 bottom-7 mx-auto flex w-full max-w-[1600px] items-center gap-3 px-5 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 lg:px-10"
      >
        <ArrowDown className="size-3.5 animate-bounce" />
        Scroll
      </motion.a>
    </section>
  );
}
