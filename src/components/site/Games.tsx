import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { games } from "@/data/studio";

export function Games() {
  return (
    <section id="jogos" className="relative py-32 md:py-40 bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader number="002" kicker="Jogos / Projetos" title="O que estamos construindo." />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {games.map((g, i) => (
            <motion.a
              key={g.title}
              href={g.href}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative block overflow-hidden rounded-sm border border-border/60 bg-background"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={g.cover}
                  alt={g.title}
                  loading="lazy"
                  width={1280}
                  height={896}
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-wine/0 mix-blend-overlay transition-colors duration-500 group-hover:bg-wine/40" />

                <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] px-2 py-1 bg-background/80 backdrop-blur text-bone border border-border/60">
                  {g.status}
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-wine-glow mb-2">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-bone tracking-tight leading-none">
                    {g.title}
                  </h3>
                  <p className="mt-3 text-sm text-bone/70 leading-relaxed">{g.description}</p>
                  <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-bone inline-flex items-center gap-2 group-hover:text-wine-glow transition-colors">
                    Jogar no Roblox
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
