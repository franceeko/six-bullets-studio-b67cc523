import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { SectionHeader } from "./SectionHeader";
import { devs, type Dev } from "@/data/studio";

/**
 * The Crew.
 *
 * Desktop gets "The Altar": the crew stands in formation against a horizon
 * backdrop (moon + ridges + fog), each member in a lit niche.
 * Phones get a plain two-column grid — the altar's overlapping arch is
 * unreadable and expensive on small screens.
 */

/** Vertical offset pattern (px) — repeats across the row to build the arch. */
const ARCH = [0, -34, -62, -34, 0, -22, -48];

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

/** True on touch / coarse-pointer devices. Resolves after mount (SSR safe). */
function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (max-width: 767px)");
    const apply = () => setCoarse(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return coarse;
}

function DevMedia({ dev, className = "" }: { dev: Dev; className?: string }) {
  const [failed, setFailed] = useState(false);

  if (!dev.avatar || failed) {
    return (
      <div className="flex size-full items-center justify-center font-display text-4xl italic text-ink/45">
        {initials(dev.name)}
      </div>
    );
  }

  const shared = `size-full object-cover gpu transition-transform duration-700 group-hover:scale-[1.07] ${className}`;

  if (dev.video) {
    return (
      <video
        src={dev.avatar}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
        className={shared}
      />
    );
  }

  return (
    <img
      src={dev.avatar}
      alt={dev.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={shared}
    />
  );
}

function Niche({ dev, index }: { dev: Dev; index: number }) {
  const lift = ARCH[index % ARCH.length] ?? 0;

  return (
    <div className="altar-niche group relative" style={{ transform: `translateY(${lift}px)` }}>
      <motion.article
        initial={{ opacity: 0, y: 46 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: (index % 7) * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="altar-frame relative overflow-hidden">
          <DevMedia dev={dev} />
          <span aria-hidden className="altar-glow" />
          <span aria-hidden className="altar-sweep" />
          <span className="absolute right-2 top-2 font-mono text-[9px] tracking-[0.24em] text-ink/55">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-3 text-center">
          <h3 className="font-display text-2xl italic leading-none tracking-tight text-ink md:text-3xl">
            {dev.name}
          </h3>
          <p className="mt-1.5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.2em] text-ink/65">
            {dev.role}
          </p>
        </div>
      </motion.article>
    </div>
  );
}

/** Mobile: legible, cheap, no overlap. */
function CrewCard({ dev, index }: { dev: Dev; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 4) * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group crew-card relative overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <DevMedia dev={dev} />
        <span aria-hidden className="crew-card-glow" />
      </div>
      <div className="flex items-baseline justify-between gap-2 px-3 py-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-xl italic leading-none text-ink">{dev.name}</h3>
          <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.2em] text-ink/65">
            {dev.role}
          </p>
        </div>
        <span className="font-mono text-[9px] tracking-[0.24em] text-ink/45">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.article>
  );
}

export function Team() {
  const coarse = useCoarsePointer();

  return (
    <section id="equipe" className="section-bridge relative overflow-hidden py-28 md:py-40">
      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <SectionHeader
          number="003"
          kicker="The crew"
          title="Fourteen hands. One trigger."
          accent="blush"
        />

        {coarse ? (
          <div className="grid grid-cols-2 gap-4 pt-8">
            {devs.map((d, i) => (
              <CrewCard key={d.name} dev={d} index={i} />
            ))}
          </div>
        ) : (
          <div className="altar relative pb-16">
            <span aria-hidden className="altar-horizon">
              <span aria-hidden className="altar-moon" />
              <span aria-hidden className="altar-ridge altar-ridge-far" />
              <span aria-hidden className="altar-ridge altar-ridge-near" />
            </span>
            <span aria-hidden className="altar-fog" />
            <div className="relative grid grid-cols-2 gap-x-5 gap-y-12 pt-10 sm:grid-cols-3 md:gap-x-7 lg:grid-cols-5 lg:gap-x-8">
              {devs.map((d, i) => (
                <Niche key={d.name} dev={d} index={i} />
              ))}
            </div>
            <span aria-hidden className="altar-floor" />
          </div>
        )}
      </div>
    </section>
  );
}
