import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { devs, type Dev } from "@/data/studio";

const colorMap: Record<Dev["color"], { bg: string; ring: string }> = {
  wine: { bg: "bg-wine-soft", ring: "ring-wine" },
  butter: { bg: "bg-butter", ring: "ring-ink" },
  sage: { bg: "bg-sage", ring: "ring-ink" },
  blush: { bg: "bg-blush", ring: "ring-wine" },
  sky: { bg: "bg-sky", ring: "ring-ink" },
};

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function Team() {
  return (
    <section id="equipe" className="relative py-32 md:py-40 bg-paper">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader
          number="003"
          kicker="Equipe"
          title="As balas no tambor."
          accent="blush"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {devs.map((d, i) => {
            const c = colorMap[d.color];
            const tilt = i % 3 === 0 ? -1.5 : i % 3 === 1 ? 0.5 : 1.8;
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 30, rotate: tilt - 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                whileHover={{
                  rotate: 0,
                  y: -6,
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300, damping: 18 },
                }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  delay: (i % 6) * 0.06,
                  duration: 0.7,
                  type: "spring",
                  bounce: 0.35,
                }}
                className="group relative bg-cream border-2 border-ink rounded-2xl p-5 md:p-6 shadow-[5px_5px_0_0_var(--ink)] hover:shadow-[8px_8px_0_0_var(--wine)] transition-shadow"
              >
                {/* corner number badge that spins on hover */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="absolute -top-3 -right-3 size-9 rounded-full bg-ink text-cream font-mono text-[10px] font-bold flex items-center justify-center border-2 border-cream"
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.div>

                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, -4, 0] }}
                    transition={{ duration: 0.6 }}
                    className={`relative shrink-0 size-16 md:size-20 rounded-2xl ${c.bg} border-2 border-ink flex items-center justify-center font-display text-2xl md:text-3xl text-ink`}
                  >
                    {initials(d.name)}
                  </motion.div>

                  <div className="min-w-0 flex-1 pt-1">
                    <div className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/70 mb-2 px-2 py-0.5 rounded-full bg-ink/5 border border-ink/10">
                      {d.tag}
                    </div>
                    <h3 className="font-display text-2xl md:text-[28px] text-ink leading-none tracking-tight">
                      {d.name}
                    </h3>
                    <p className="mt-2 text-xs md:text-sm text-ink/70 leading-relaxed">
                      {d.role}
                    </p>
                  </div>
                </div>

                {/* playful sticker */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/40">
                    6B · Crew
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="text-wine"
                  >
                    ✶
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
          ↑ Fotos reais dos devs em breve
        </p>
      </div>
    </section>
  );
}
