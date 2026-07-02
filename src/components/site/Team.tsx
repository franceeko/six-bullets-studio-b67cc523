import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { devs, type Dev } from "@/data/studio";

const bgMap: Record<Dev["color"], string> = {
  wine: "bg-wine-soft",
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
      <div
        className={`w-full h-full ${bgMap[dev.color]} flex items-center justify-center font-display italic text-4xl text-ink`}
      >
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
        variants={{ hover: { scale: 1.1 } }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full object-cover gpu"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,oklch(0_0_0/0.22))]" />
    </>
  );
}

export function Team() {
  return (
    <section id="equipe" className="relative py-32 md:py-44 bg-paper overflow-hidden">
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
            <motion.article
              key={d.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: (i % 8) * 0.04,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover="hover"
              className="group relative bg-cream rounded-[22px] p-5 md:p-6 border border-ink/10 overflow-hidden cursor-default gpu"
              style={{
                boxShadow:
                  "0 1px 0 oklch(1 0 0 / 0.9) inset, 0 20px 40px -20px oklch(0 0 0 / 0.25), 0 4px 10px -4px oklch(0 0 0 / 0.1)",
              }}
            >
              {/* Index badge */}
              <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.24em] text-ink/40">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Avatar — no color ring, unified look */}
              <motion.div
                variants={{ hover: { y: -4 } }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative size-24 md:size-28 rounded-full overflow-hidden border border-ink/10 mb-5 bg-paper gpu"
              >
                <Avatar dev={d} />
              </motion.div>

              <h3 className="font-display italic font-normal text-3xl md:text-[34px] text-ink leading-none tracking-tight">
                {d.name}
              </h3>

              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] px-2 py-0.5 rounded-full bg-ink text-cream">
                  {d.tag}
                </span>
              </div>

              <p className="mt-3 text-[13px] md:text-sm text-ink/70 leading-relaxed">
                {d.role}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
