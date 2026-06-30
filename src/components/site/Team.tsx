import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { devs } from "@/data/studio";

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function Team() {
  return (
    <section id="equipe" className="relative py-32 md:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <SectionHeader number="003" kicker="Equipe" title="As balas no tambor." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40 border border-border/40">
          {devs.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 6) * 0.06, duration: 0.6 }}
              className="group relative bg-background p-6 md:p-8 hover:bg-surface/80 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="relative shrink-0 size-14 md:size-16 rounded-sm bg-wine-deep border border-wine/40 flex items-center justify-center font-mono text-sm text-bone group-hover:bg-wine transition-colors">
                  {initials(d.name)}
                  <span className="absolute -bottom-1.5 -right-1.5 text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 bg-background border border-border/60 text-wine-glow rounded-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-wine-glow mb-1.5">
                    {d.tag}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-bone leading-none tracking-tight">
                    {d.name}
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {d.role}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-wine-glow transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
