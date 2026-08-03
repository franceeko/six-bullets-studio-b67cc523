import { motion } from "framer-motion";
import { ArrowUpRight, Crown } from "lucide-react";

import happyTown from "@/assets/happy-town-banner.png.asset.json";

const stats = [
  { value: "14", label: "People on the crew" },
  { value: "01", label: "Project in production" },
  { value: "Roblox", label: "Platform" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 md:pt-28"
    >
      <div className="relative mx-auto w-full max-w-[1500px] px-6 lg:px-12">
        {/* Tagline */}
        <div className="fade-up mb-6 flex items-center gap-3 lg:mb-8">
          <Crown className="size-4 shrink-0 text-ink/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 sm:text-xs">
            Roblox horror collective
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display uppercase leading-[0.9] tracking-[-0.03em] text-ink">
          <span
            className="fade-up block text-[clamp(3rem,11vw,9rem)]"
            style={{ animationDelay: "0.15s" }}
          >
            Build.
          </span>
          <span
            className="fade-up flex items-center gap-3 text-[clamp(3rem,11vw,9rem)] md:gap-6"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="italic">Unsettle.</span>
            <span className="hidden size-[0.62em] shrink-0 overflow-hidden rounded-[0.14em] border border-ink/20 sm:inline-block">
              <img
                src={happyTown.url}
                alt=""
                loading="eager"
                decoding="async"
                className="size-full object-cover"
              />
            </span>
          </span>
          <span
            className="fade-up block text-[clamp(3rem,11vw,9rem)]"
            style={{ animationDelay: "0.45s" }}
          >
            Haunt.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="fade-up mt-7 max-w-md text-sm leading-relaxed text-ink/65 sm:text-base lg:mt-9"
          style={{ animationDelay: "0.6s" }}
        >
          Fourteen people, one game. Now cooking{" "}
          <span className="font-medium text-ink">Happy Town</span> — a slow-burn
          psychological horror on Roblox.
        </p>

        {/* CTA row */}
        <div
          className="fade-up mt-8 flex flex-wrap items-center gap-4 sm:gap-6 lg:mt-10"
          style={{ animationDelay: "0.75s" }}
        >
          <a
            href="#happy-town"
            className="group inline-flex items-center gap-3 bg-ink px-6 py-4 font-mono text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-wine"
          >
            See the project
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#equipe"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink/60 transition-colors hover:text-ink"
          >
            Meet the crew ↓
          </a>
        </div>

        {/* Stats */}
        <div
          className="fade-up mt-10 flex flex-wrap gap-8 sm:gap-12 lg:mt-16 lg:gap-16"
          style={{ animationDelay: "0.9s" }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45 sm:text-[11px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative mx-auto mt-14 flex w-full max-w-[1500px] items-end justify-between px-6 pb-10 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40 lg:px-12"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-8 bg-ink/30" /> Scroll
        </span>
        <span className="hidden sm:inline">Six Bullets Studio</span>
      </motion.div>
    </section>
  );
}
