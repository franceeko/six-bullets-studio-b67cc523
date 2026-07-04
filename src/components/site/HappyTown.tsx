import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import happyTown from "@/assets/happy-town-banner.png.asset.json";

export function HappyTown() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bannerY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const chromeY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["20%", "-20%"]);

  return (
    <section
      ref={ref}
      id="happy-town"
      className="section-lazy relative py-32 md:py-44 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-14"
        >
          <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.32em] text-ink/60 mb-3 flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-wine animate-pulse" />
            002 — Current project
          </div>
          <h2 className="font-display italic font-normal text-5xl md:text-7xl tracking-[-0.02em] text-ink">
            6B Studio — Happy Town.
          </h2>
        </motion.div>

        {/* Banner card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[28px] overflow-hidden shadow-[0_40px_80px_-30px_oklch(0_0_0/0.45)] gpu"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <motion.img
              src={happyTown.url}
              alt="Happy Town key art"
              loading="lazy"
              decoding="async"
              style={{
                y: bannerY,
                scale: 1.15,
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 62%, transparent 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 62%, transparent 100%)",
              }}
              className="absolute inset-0 w-full h-full object-cover gpu"
            />

            {/* Overlay chrome */}
            <motion.div
              style={{ y: chromeY }}
              className="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/90 backdrop-blur border border-ink/10"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-wine opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full size-1.5 bg-wine" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink">
                In production
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
