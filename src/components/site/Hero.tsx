import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easings } from "@/lib/animations";
import happyTown from "@/assets/happy-town-banner.png.asset.json";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yChip = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotChip = useTransform(scrollYProgress, [0, 1], [-3, 6]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 md:pt-28"
    >
      {/* Animated diagonal light rays — the Bepp cream shimmer */}
      <div className="light-rays" aria-hidden />

      {/* Faint dotted paper texture */}
      <div className="absolute inset-0 paper-texture opacity-40 pointer-events-none" aria-hidden />

      {/* Soft wine glow — subtle, not the old blob party */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-40 size-[42rem] rounded-full bg-wine-soft/50 blur-3xl gpu-accel"
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easings.smooth }}
          className="flex justify-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cream/80 backdrop-blur border border-ink/10"
            style={{
              boxShadow: "0 1px 0 oklch(1 0 0 / 0.9) inset, 0 10px 30px -12px oklch(0 0 0 / 0.2)",
            }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full size-2 bg-sage" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/80">
              001 — Now cooking
            </span>
          </div>
        </motion.div>

        {/* Headline — Bepp style: huge mixed weight with inline chips */}
        <motion.h1
          style={{ y: yTitle }}
          className="font-display text-center leading-[0.88] tracking-[-0.03em] text-ink text-[clamp(3rem,10vw,10.5rem)] gpu-accel"
        >
          {/* Line 1 */}
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: easings.snappy }}
              className="inline-block italic font-normal gpu-accel"
            >
              We craft
            </motion.span>
          </span>

          {/* Line 2 — chip + text */}
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.1, ease: easings.snappy }}
              className="inline-flex items-center gap-3 md:gap-5 align-middle gpu-accel"
            >
              <motion.span
                style={{ y: yChip, rotate: rotChip }}
                whileHover={{ scale: 1.06, rotate: -4 }}
                whileTap={{ scale: 0.98 }}
                className="bepp-chip inline-block size-[0.85em] shrink-0 -translate-y-[0.05em]"
                aria-label="Happy Town"
              >
                <img
                  src={happyTown.url}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover gpu-accel"
                  style={{
                    borderRadius: "inherit",
                  }}
                />
              </motion.span>
              <span className="font-sans font-normal">psychological</span>
            </motion.span>
          </span>

          {/* Line 3 */}
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.2, ease: easings.snappy }}
              className="inline-block gpu-accel"
            >
              <span className="italic font-normal">horror</span>{" "}
              <span className="font-sans font-normal">on Roblox</span>
            </motion.span>
          </span>
        </motion.h1>

        {/* Subline + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: easings.smooth }}
          className="mt-14 md:mt-20 flex flex-col items-center gap-8"
        >
          <p className="max-w-lg text-center text-base md:text-lg text-ink/70 leading-relaxed">
            Six Bullets is a seven-person crew building{" "}
            <span className="marker-wine font-medium text-ink">Happy Town</span> — a slow-burn horror
            project where the town smiles first and asks questions never.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="#happy-town"
              className="group relative inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-ink text-cream font-mono text-[11px] uppercase tracking-[0.22em] rounded-full hover:bg-wine transition-all gpu-accel"
              style={{
                boxShadow: "0 8px 24px -8px oklch(0.16 0.02 20 / 0.35)",
              }}
            >
              Enter Happy Town
              <span className="inline-flex items-center justify-center size-9 rounded-full bg-cream text-ink group-hover:translate-x-1 transition-transform gpu-accel">
                →
              </span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href="#equipe"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-mono text-[11px] uppercase tracking-[0.22em] text-ink/80 hover:text-ink transition-colors gpu-accel"
            >
              Meet the crew ↓
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom mini-info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease: easings.smooth }}
        className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full mt-16 pb-10 flex items-end justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-ink/45"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-8 bg-ink/30" /> Scroll
        </span>
        <span className="hidden sm:inline">Six Bullets Studio · Est. 2024</span>
      </motion.div>
    </section>
  );
}
