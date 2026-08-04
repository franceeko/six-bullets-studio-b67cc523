import { motion } from "framer-motion";
import { ArrowUpRight, Crown } from "lucide-react";

import happyTown from "@/assets/happy-town-banner.png.asset.json";

const stats = [
  { value: "14", label: "People on the crew" },
  { value: "01", label: "Project in production" },
  { value: "Roblox", label: "Platform" },
];

const lines = ["Build.", "Unsettle.", "Haunt."];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 md:pt-32"
    >
      <div className="relative mx-auto flex w-full max-w-[1500px] flex-1 px-6 lg:px-12">
        <div className="edge-frame edge-ticks relative flex h-full flex-col justify-between rounded-sm p-5 sm:p-8 lg:p-10">
          {/* Top rail */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="fade-up flex items-center gap-3">
              <Crown className="size-4 shrink-0 text-wine" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/75 sm:text-xs">
                Roblox horror collective
              </span>
            </div>
            <span
              className="fade-up hidden font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60 sm:inline"
              style={{ animationDelay: "0.1s" }}
            >
              Six Bullets — 6B
            </span>
          </div>

          {/* Anchored title */}
          <div className="mt-16 md:mt-24">
            <h1 className="font-display uppercase leading-[0.86] tracking-[-0.035em] text-ink">
              {lines.map((line, i) => (
                <span key={line} className="block overflow-hidden py-[0.02em]">
                  <span
                    className="line-reveal flex items-center gap-4 text-[clamp(3.2rem,12vw,10rem)] md:gap-7"
                    style={{ animationDelay: `${0.12 + i * 0.13}s` }}
                  >
                    <span className={i === 1 ? "italic" : undefined}>{line}</span>
                    {i === 1 && (
                      <span className="hidden size-[0.6em] shrink-0 overflow-hidden rounded-[0.1em] border-2 border-wine/70 shadow-[0_0_0_4px_color-mix(in_oklab,var(--wine)_12%,transparent)] sm:inline-block">
                        <img
                          src={happyTown.url}
                          alt=""
                          loading="eager"
                          decoding="async"
                          className="size-full object-cover"
                        />
                      </span>
                    )}
                  </span>
                </span>
              ))}
            </h1>

            <div className="mt-8 flex flex-col gap-8 border-t border-ink/25 pt-6 md:flex-row md:items-end md:justify-between">
              <p
                className="fade-up max-w-md text-sm leading-relaxed text-ink/75 sm:text-base"
                style={{ animationDelay: "0.6s" }}
              >
                Fourteen people, one game. Now cooking{" "}
                <span className="font-medium text-ink">Happy Town</span> — a slow-burn
                psychological horror on Roblox.
              </p>

              <div
                className="fade-up flex flex-wrap items-center gap-4 sm:gap-6"
                style={{ animationDelay: "0.72s" }}
              >
                <a
                  href="#happy-town"
                  className="group inline-flex items-center gap-3 bg-ink px-6 py-4 font-mono text-[11px] uppercase tracking-[0.24em] text-cream transition-colors hover:bg-wine hover:text-cream"
                >
                  See the project
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#equipe"
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink/70 transition-colors hover:text-ink"
                >
                  Meet the crew ↓
                </a>
              </div>
            </div>
          </div>

          {/* Stats ruler */}
          <div
            className="fade-up mt-10 grid grid-cols-3 divide-x divide-ink/20 border-t border-ink/25 pt-5"
            style={{ animationDelay: "0.9s" }}
          >
            {stats.map((s, i) => (
              <div key={s.label} className={i === 0 ? "pr-4" : "px-4"}>
                <div className="text-xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.24em] text-ink/60 sm:text-[11px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="relative mx-auto mt-8 flex w-full max-w-[1500px] items-end justify-between px-6 pb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/55 lg:px-12"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-8 bg-ink/40" /> Scroll
        </span>
        <span className="hidden sm:inline">Six Bullets Studio</span>
      </motion.div>
    </section>
  );
}
