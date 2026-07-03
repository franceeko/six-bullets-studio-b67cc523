import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { SectionHeader } from "./SectionHeader";
import { devs, type Dev } from "@/data/studio";

const vibeMap: Record<Dev["color"], string> = {
  wine: "vibe-wine",
  butter: "vibe-butter",
  sage: "vibe-sage",
  blush: "vibe-blush",
  sky: "vibe-sky",
};

const dotMap: Record<Dev["color"], string> = {
  wine: "bg-wine",
  butter: "bg-butter",
  sage: "bg-sage",
  blush: "bg-blush",
  sky: "bg-sky",
};

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function Avatar({ dev }: { dev: Dev }) {
  const [failed, setFailed] = useState(false);
  if (!dev.avatar || failed) {
    return (
      <div className="w-full h-full flex items-center justify-center font-display italic text-4xl text-ink/80">
        {initials(dev.name)}
      </div>
    );
  }
  return (
    <>
      <motion.img
        src={dev.avatar}
        alt={dev.name}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        variants={{ hover: { scale: 1.12 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full object-cover gpu"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,oklch(0_0_0/0.2))]" />
    </>
  );
}

function TeamCard({ dev, index }: { dev: Dev; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: (index % 8) * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover="hover"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative ${vibeMap[dev.color]} rounded-[22px] p-5 md:p-6 border border-ink/10 overflow-hidden cursor-default gpu`}
    >
      {/* Index */}
      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.24em] text-ink/40">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Floating accent dot */}
      <motion.span
        aria-hidden
        variants={{ hover: { scale: 1.4, opacity: 1 } }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`absolute top-5 left-5 size-2 rounded-full ${dotMap[dev.color]} opacity-70`}
      />

      {/* Avatar */}
      <motion.div
        variants={{ hover: { y: -6, rotate: index % 2 ? 3 : -3 } }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="relative size-24 md:size-28 rounded-full overflow-hidden border border-ink/10 mt-6 mb-5 bg-cream mx-auto gpu"
        style={{ transform: "translateZ(30px)" }}
      >
        <Avatar dev={dev} />
      </motion.div>

      <h3 className="font-display italic font-normal text-3xl md:text-[34px] text-ink leading-none tracking-tight text-center">
        {dev.name}
      </h3>

      <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] px-2 py-0.5 rounded-full bg-ink text-cream">
          {dev.tag}
        </span>
      </div>

      <p className="mt-3 text-[13px] md:text-sm text-ink/70 leading-relaxed text-center min-h-[3em]">
        {dev.role}
      </p>

      {/* Corner sweep on hover */}
      <motion.div
        aria-hidden
        variants={{ hover: { x: "120%", opacity: 1 } }}
        initial={{ x: "-40%", opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute -inset-y-4 -left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
    </motion.article>
  );
}

export function Team() {
  return (
    <section id="equipe" className="section-lazy relative py-32 md:py-44 bg-paper overflow-hidden">
      <div className="light-rays opacity-60" aria-hidden />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader
          number="003"
          kicker="The crew"
          title="Fourteen hands. One trigger."
          accent="blush"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {devs.map((d, i) => (
            <TeamCard key={d.name} dev={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
