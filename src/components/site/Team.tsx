import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { devs, type Dev, type DevColor } from "@/data/studio";

const vibeMap: Record<DevColor, string> = {
  wine: "vibe-wine",
  butter: "vibe-butter",
  sage: "vibe-sage",
  blush: "vibe-blush",
  sky: "vibe-sky",
  plum: "vibe-plum",
  teal: "vibe-teal",
  coral: "vibe-coral",
  moss: "vibe-moss",
  amber: "vibe-amber",
  lilac: "vibe-lilac",
};

const dotMap: Record<DevColor, string> = {
  wine: "bg-wine",
  butter: "bg-butter",
  sage: "bg-sage",
  blush: "bg-blush",
  sky: "bg-sky",
  plum: "bg-plum",
  teal: "bg-teal",
  coral: "bg-coral",
  moss: "bg-moss",
  amber: "bg-amber",
  lilac: "bg-lilac",
};

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function Avatar({ dev }: { dev: Dev }) {
  const [failed, setFailed] = useState(false);

  if (!dev.avatar || failed) {
    return (
      <div className="w-full h-full flex items-center justify-center font-display italic text-5xl text-ink/70">
        {initials(dev.name)}
      </div>
    );
  }

  if (dev.video) {
    return (
      <motion.video
        src={dev.avatar}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
        variants={{ hover: { scale: 1.1 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full object-cover gpu"
      />
    );
  }

  return (
    <motion.img
      src={dev.avatar}
      alt={dev.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      variants={{ hover: { scale: 1.1 } }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full object-cover gpu"
    />
  );
}

function TeamCard({ dev, index }: { dev: Dev; index: number }) {
  const lean = index % 2 ? 2.5 : -2.5;

  return (
    <motion.article
      initial={{ opacity: 0, y: 42, rotate: lean * 0.6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ delay: (index % 6) * 0.05, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      variants={{ hover: { y: -12 } }}
      whileHover="hover"
      whileTap={{ scale: 0.985 }}
      style={{
        boxShadow:
          "0 1px 0 oklch(1 0 0 / 0.6) inset, 0 0 0 1px oklch(0 0 0 / 0.12), 0 30px 60px -40px oklch(0 0 0 / 0.55)",
      }}
      className={`group relative ${vibeMap[dev.color]} edge-ticks rounded-[28px] p-7 md:p-9 overflow-hidden cursor-default gpu`}
    >
      {/* Light sweep */}
      <motion.span
        aria-hidden
        variants={{ hover: { x: "140%", opacity: 1 } }}
        initial={{ x: "-140%", opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-cream/60 to-transparent"
      />

      {/* Index */}
      <motion.div
        variants={{ hover: { rotate: 90 } }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
        className="absolute top-5 right-6 font-mono text-[10px] tracking-[0.24em] text-ink/65"
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* Accent dot */}
      <motion.span
        aria-hidden
        variants={{ hover: { scale: 1.8, opacity: 1 } }}
        transition={{ type: "spring", stiffness: 220, damping: 14 }}
        className={`absolute top-6 left-6 size-2 rounded-full ${dotMap[dev.color]} opacity-70`}
      />

      {/* Avatar */}
      <motion.div
        variants={{ hover: { y: -8, rotate: lean } }}
        transition={{ type: "spring", stiffness: 240, damping: 15 }}
        className="relative mx-auto mt-8 mb-6 size-36 md:size-44 rounded-full overflow-hidden bg-cream gpu"
        style={{
          boxShadow: "0 0 0 1px oklch(0 0 0 / 0.12), 0 22px 40px -22px oklch(0 0 0 / 0.45)",
        }}
      >
        <Avatar dev={dev} />
      </motion.div>

      <h3 className="font-display italic font-normal text-4xl md:text-5xl text-ink leading-[0.95] tracking-tight text-center">
        {dev.name}
      </h3>

      <div className="mt-4 flex items-center justify-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] px-3 py-1 rounded-full bg-ink text-cream">
          {dev.tag}
        </span>
      </div>

      <p className="mt-4 text-sm md:text-[15px] text-ink/70 leading-relaxed text-center min-h-[3em]">
        {dev.role}
      </p>
    </motion.article>
  );
}

export function Team() {
  return (
    <section id="equipe" className="section-bridge relative py-28 md:py-40 overflow-hidden">
      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-12">
        <SectionHeader
          number="003"
          kicker="The crew"
          title="Fourteen hands. One trigger."
          accent="blush"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 md:gap-9">
          {devs.map((d, i) => (
            <TeamCard key={d.name} dev={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
