import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import happyTown from "@/assets/happy-town-banner.png.asset.json";
import watcherPoster from "@/assets/smile-watcher-poster.jpg.asset.json";
import watcherSheet from "@/assets/smile-watcher-sheet.png.asset.json";
import watcherVideo from "@/assets/smile-watcher.mp4.asset.json";

const meta = [
  { k: "Status", v: "In production" },
  { k: "Genre", v: "Psychological horror" },
  { k: "Platform", v: "Roblox" },
  { k: "Studio", v: "Six Bullets" },
];

const watcherSpecs = [
  { k: "Entity", v: "Smile Watcher" },
  { k: "Chapter", v: "01" },
  { k: "Height", v: "2.30 m" },
  { k: "Threat", v: "High" },
];

export function HappyTown() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-6%", "6%"]);

  // Only load the video on pointer-fine devices with motion allowed.
  const [playVideo, setPlayVideo] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (!coarse) setPlayVideo(true);
  }, [reduced]);

  return (
    <section id="happy-town" className="section-bridge relative overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-12">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70 md:text-xs">
            <span className="inline-block size-1.5 rounded-full bg-wine" />
            002 — Current project
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/60">
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

        {/* Spec rail */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/25 pt-6 md:grid-cols-4">
          {meta.map((m) => (
            <div key={m.k}>
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink/60">
                {m.k}
              </div>
              <div className="mt-1.5 text-sm text-ink md:text-base">{m.v}</div>
            </div>
          ))}
        </div>

        {/* Smile Watcher — chapter 01 entity */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-24"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-wine md:text-xs">
              <span className="inline-block size-1.5 rounded-full bg-wine" />
              Chapter 01 — Entity
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/60">
              Smile Watcher
            </span>
          </div>

          <div className="edge-ticks relative overflow-hidden rounded-2xl border-2 border-ink/25 bg-[#0b0a0a]">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[2/1]">
              {playVideo ? (
                <video
                  src={watcherVideo.url}
                  poster={watcherPoster.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label="Smile Watcher reveal"
                  className="absolute inset-0 size-full object-contain"
                />
              ) : (
                <img
                  src={watcherPoster.url}
                  alt="Smile Watcher — Happy Town chapter 01 entity"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-contain"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[9px] uppercase tracking-[0.28em] text-[oklch(0.90_0.09_80)] sm:text-[10px]">
                {watcherSpecs.map((s) => (
                  <span key={s.k}>
                    <span className="opacity-60">{s.k} </span>
                    {s.v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <details className="group mt-4">
            <summary className="inline-flex cursor-pointer list-none items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink/70 transition-colors hover:text-ink">
              Reference sheet
              <span className="transition-transform group-open:rotate-90">›</span>
            </summary>
            <img
              src={watcherSheet.url}
              alt="Smile Watcher reference sheet"
              loading="lazy"
              decoding="async"
              className="mt-4 w-full rounded-xl border border-ink/25"
            />
          </details>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
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
            A quiet town that stops making sense. Built slow, on purpose.
          </p>
        </div>
      </div>
    </section>
  );
}
