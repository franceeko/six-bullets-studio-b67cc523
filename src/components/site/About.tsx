import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const stats = [
  { value: "14", label: "Crew", color: "bg-butter" },
  { value: "01", label: "Project in cook", color: "bg-wine-soft" },
  { value: "∞", label: "Rewrites at 4am", color: "bg-sage" },
  { value: "24", label: "Est. year", color: "bg-blush" },
];

export function About() {
  return (
    <section id="sobre" className="relative py-32 md:py-44">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader number="001" kicker="Studio" title="Small crew, sharp aim." accent="butter" />

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 space-y-6 text-xl md:text-2xl text-ink/85 leading-relaxed font-display italic font-normal"
          >
            <p>
              <span className="marker-wine not-italic font-sans text-ink font-medium">Six Bullets</span> — a
              seven-person crew of devs, artists and one composer who kept sending demos at 3am until
              we let him in.
            </p>
            <p className="text-lg md:text-xl not-italic font-sans text-ink/70 leading-relaxed">
              We ship one game at a time. Right now every hand is on Happy Town: modeling streets, scoring
              silence, breaking the same script three different ways until one of them scares us back.
            </p>
          </motion.div>

          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`${s.color} rounded-2xl p-5 md:p-6 border border-ink/10`}
                style={{
                  boxShadow: "0 20px 40px -22px oklch(0 0 0 / 0.35), 0 1px 0 oklch(1 0 0 / 0.8) inset",
                }}
              >
                <div className="font-display italic text-6xl md:text-7xl text-ink leading-none">
                  {s.value}
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
