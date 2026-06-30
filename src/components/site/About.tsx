import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const stats = [
  { value: "14", label: "Devs ativos", color: "bg-butter" },
  { value: "01", label: "Projeto em produção", color: "bg-wine-soft" },
  { value: "∞", label: "Linhas de código", color: "bg-sage" },
  { value: "24", label: "Ano de fundação", color: "bg-blush" },
];

export function About() {
  return (
    <section id="sobre" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader number="001" kicker="Sobre o studio" title="Quem é a 6B?" accent="butter" />

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 space-y-6 text-lg md:text-xl text-ink/80 leading-relaxed font-display font-light"
          >
            <p>
              Somos a <em className="text-wine not-italic font-medium">Six Bullets</em> — um
              grupo de devs, artistas e compositores que se juntou pra fazer jogo de Roblox do
              jeito que a gente sempre quis jogar.
            </p>
            <p>
              Atmosfera primeiro, hype depois. Cada projeto sai de horas de conversa no Discord,
              referência trocada na madrugada e aquela vontade de fazer algo que ninguém
              esqueça.
            </p>
          </motion.div>

          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
                whileHover={{ rotate: 0, scale: 1.04 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, type: "spring", bounce: 0.4 }}
                className={`${s.color} border-2 border-ink rounded-2xl p-5 md:p-6 shadow-[4px_4px_0_0_var(--ink)]`}
              >
                <div className="font-display text-5xl md:text-6xl text-ink leading-none">
                  {s.value}
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70">
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
