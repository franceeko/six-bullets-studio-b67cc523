import { motion } from "framer-motion";
import { useState } from "react";

import { SectionHeader } from "./SectionHeader";
import { devs, type Dev } from "@/data/studio";

/**
 * The Altar — the crew stands in formation instead of sitting in a grid.
 * Each member owns a lit niche; the arch pattern staggers heights so the
 * lineup reads like a group pose. Every niche takes an image or a short
 * video, so R6 rig renders can drop straight into the same slots later.
 */

/** Vertical offset pattern (px) — repeats across the row to build the arch. */
const ARCH = [0, -34, -62, -34, 0, -22, -48];

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function NicheMedia({ dev }: { dev: Dev }) {
  const [failed, setFailed] = useState(false);

  if (!dev.avatar || failed) {
    return (
      <div className="flex size-full items-center justify-center font-display text-5xl italic text-ink/45">
        {initials(dev.name)}
      </div>
    );
  }

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
        className="size-full object-cover gpu transition-transform duration-700 group-hover:scale-[1.07]"
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
      className="size-full object-cover gpu transition-transform duration-700 group-hover:scale-[1.07]"
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
          <NicheMedia dev={dev} />
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

export function Team() {
  return (
    <section id="equipe" className="section-bridge relative overflow-hidden py-28 md:py-40">
      <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
        <SectionHeader
          number="003"
          kicker="The crew"
          title="Fourteen hands. One trigger."
          accent="blush"
        />

        <div className="altar relative pb-16">
          <span aria-hidden className="altar-fog" />
          <div className="relative grid grid-cols-2 gap-x-5 gap-y-12 pt-10 sm:grid-cols-3 md:gap-x-7 lg:grid-cols-5 lg:gap-x-8">
            {devs.map((d, i) => (
              <Niche key={d.name} dev={d} index={i} />
            ))}
          </div>
          <span aria-hidden className="altar-floor" />
        </div>
      </div>
    </section>
  );
}
