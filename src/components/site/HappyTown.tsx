import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import happyTown from "@/assets/happy-town-banner.png.asset.json";

export function HappyTown() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-5%", "5%"]);

  return (
    <section id="happy-town" className="section-bridge relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70 md:text-xs">
            <span className="inline-block size-1.5 rounded-full bg-wine" />
            002 — Current project
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/60">
            In production
          </span>
        </div>

        <h2 className="mb-8 max-w-3xl font-display text-[clamp(2.4rem,7vw,6rem)] uppercase leading-[0.9] tracking-[-0.035em] text-ink md:mb-10">
          Happy Town
        </h2>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="edge-ticks relative overflow-hidden rounded-2xl border-2 border-ink/25 bg-ink"
        >
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9]">
            <motion.img
              src={happyTown.url}
              alt="Happy Town key art"
              loading="lazy"
              decoding="async"
              style={{ y }}
              className="absolute inset-0 size-full scale-105 object-contain sm:scale-110 sm:object-cover"
            />
          </div>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="https://discord.gg/ZWZuJVmRMF"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-ink/35 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink transition-colors hover:border-ink hover:bg-ink/5"
          >
            Follow the development
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <p className="max-w-sm text-sm leading-relaxed text-ink/70">
            A quiet town that stops making sense.
          </p>
        </div>
      </div>
    </section>
  );
}
