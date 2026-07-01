import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { devs, type Dev } from "@/data/studio";

const ringMap: Record<Dev["color"], string> = {
  wine: "shadow-[0_0_0_2px_var(--wine)]",
  butter: "shadow-[0_0_0_2px_var(--butter)]",
  sage: "shadow-[0_0_0_2px_var(--sage)]",
  blush: "shadow-[0_0_0_2px_var(--blush)]",
  sky: "shadow-[0_0_0_2px_var(--sky)]",
};

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

export function Team() {
  return (
    <section id="equipe" className="relative py-32 md:py-44 bg-paper overflow-hidden">
      {/* subtle rays behind team too */}
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: (i % 8) * 0.05,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover="hover"
              className="group relative bg-cream rounded-[22px] p-5 md:p-6 border border-ink/10 overflow-hidden cursor-default"
              style={{
                boxShadow:
                  "0 1px 0 oklch(1 0 0 / 0.9) inset, 0 20px 40px -20px oklch(0 0 0 / 0.25), 0 4px 10px -4px oklch(0 0 0 / 0.1)",
              }}
            >
              {/* Sweep highlight on hover */}
              <motion.div
                aria-hidden
                variants={{
                  hover: { x: "120%", opacity: 1 },
                }}
                initial={{ x: "-120%", opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute inset-y-0 -left-1/2 w-1/2 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(115deg, transparent, oklch(1 0 0 / 0.55), transparent)",
                }}
              />

              {/* Index badge */}
              <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.24em] text-ink/40">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Avatar */}
              <div className="relative flex flex-col items-start">
                <motion.div
                  variants={{
                    hover: { rotate: -3, scale: 1.05, y: -4 },
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className={`relative size-24 md:size-28 rounded-full overflow-hidden ${ringMap[d.color]} ring-offset-2 ring-offset-cream mb-5`}
                >
                  {d.avatar ? (
                    <>
                      <motion.img
                        src={d.avatar}
                        alt={d.name}
                        variants={{ hover: { scale: 1.12 } }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                      />
                      {/* subtle vignette */}
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(0_0_0/0.25))]" />
                    </>
                  ) : (
                    <div
                      className={`w-full h-full ${bgMap[d.color]} flex items-center justify-center font-display italic text-4xl text-ink`}
                    >
                      {initials(d.name)}
                    </div>
                  )}
                </motion.div>

                {/* Rotating accent dot */}
                <motion.div
                  aria-hidden
                  variants={{ hover: { rotate: 180 } }}
                  transition={{ duration: 0.6 }}
                  className="absolute top-16 left-20 md:top-20 md:left-24 size-6 rounded-full bg-ink text-cream flex items-center justify-center text-[10px] font-mono"
                >
                  ✦
                </motion.div>
              </div>

              {/* Name — sliding reveal */}
              <div className="overflow-hidden">
                <motion.h3
                  variants={{ hover: { y: -2 } }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="font-display italic font-normal text-3xl md:text-[34px] text-ink leading-none tracking-tight"
                >
                  {d.name}
                </motion.h3>
              </div>

              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] px-2 py-0.5 rounded-full bg-ink text-cream">
                  {d.tag}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/50">
                  6B · 00{(i % 9) + 1}
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
