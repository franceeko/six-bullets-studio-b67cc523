import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import happyTown from "@/assets/happy-town-banner.png.asset.json";

const meta = [
  { k: "Status", v: "In production" },
  { k: "Genre", v: "Psychological horror" },
  { k: "Platform", v: "Roblox" },
  { k: "Studio", v: "Six Bullets" },
];

export function HappyTown() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <section id="happy-town" className="section-bridge relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55 md:text-xs">
            <span className="inline-block size-1.5 rounded-full bg-wine" />
            002 — Current project
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/40">
            WIP
          </span>
        </div>

        <h2 className="mb-8 max-w-3xl font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.95] tracking-[-0.03em] text-ink md:mb-10">
          Happy Town
        </h2>



        {/* Key art */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-ink/15 bg-ink"
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


        {/* Spec rail */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/12 pt-6 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k}>
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink/40">
                {m.k}
              </div>
              <div className="mt-1.5 text-sm text-ink md:text-base">{m.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="https://discord.gg/ZWZuJVmRMF"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-ink/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-ink transition-colors hover:border-ink/60 hover:bg-ink/5"
          >
            Follow the development
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            A quiet town that stops making sense. Built slow, on purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
