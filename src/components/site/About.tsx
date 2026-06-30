import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const stats = [
  { value: "14", label: "Devs ativos" },
  { value: "03", label: "Projetos em produção" },
  { value: "∞", label: "Linhas de código" },
  { value: "24", label: "Ano de fundação" },
];

export function About() {
  return (
    <section id="sobre" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader number="001" kicker="Sobre o studio" title="Tiros que ecoam." />

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 space-y-6 text-lg md:text-xl text-bone/85 leading-relaxed font-display font-light"
          >
            <p>
              Somos a <em className="text-wine-glow not-italic">Six Bullets</em> — um coletivo de devs,
              artistas e compositores que trata cada jogo no Roblox como uma obra completa: do primeiro
              esboço de modelagem ao último beat da trilha sonora.
            </p>
            <p>
              Cada projeto nasce de uma sessão demorada de conversa, referência e ambição. Não fazemos
              jogos para encher catálogo. Fazemos para deixar marca.
            </p>
          </motion.div>

          <div className="md:col-span-5 grid grid-cols-2 gap-px bg-border/40">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-background p-6 md:p-8"
              >
                <div className="font-display text-5xl md:text-6xl text-bone wine-glow-text">{s.value}</div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
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
