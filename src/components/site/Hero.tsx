import { motion } from "framer-motion";

const title = "SIX BULLETS";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">
      {/* radial wine glow */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, oklch(0.44 0.14 18 / 0.45), transparent 70%)",
        }}
      />
      {/* dashed scaffolding */}
      <div aria-hidden className="absolute inset-x-0 top-24 h-px bg-border/40" />
      <div aria-hidden className="absolute inset-x-0 bottom-32 h-px bg-border/40" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-wine-glow mb-8 flex items-center gap-3"
        >
          <span className="inline-block size-1.5 rounded-full bg-wine-glow animate-pulse" />
          000 — Roblox Studio · est. 2024
        </motion.div>

        <h1 className="font-display font-light leading-[0.85] tracking-[-0.04em] text-bone wine-glow-text">
          <span className="block text-[clamp(3.5rem,14vw,13rem)]">
            {title.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
                style={{ fontStyle: ch === "B" ? "italic" : "normal" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
        >
          <p className="max-w-md text-base md:text-lg text-muted-foreground leading-relaxed">
            Um studio independente no Roblox construído por uma equipe obcecada por
            atmosfera, mecânicas profundas e mundos que ficam com você.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#jogos"
              className="group relative inline-flex items-center gap-3 px-6 py-3 bg-wine text-bone font-mono text-xs uppercase tracking-[0.2em] rounded-sm hover:bg-wine-glow transition-colors"
            >
              Conheça os jogos
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-3 px-6 py-3 border border-bone/30 text-bone font-mono text-xs uppercase tracking-[0.2em] rounded-sm hover:border-bone/80 transition-colors"
            >
              Discord
            </a>
          </div>
        </motion.div>
      </div>

      <div className="mt-24" />
      <Bottom />
    </section>
  );
}

function Bottom() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full pb-10 flex items-end justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
      <span>↓ Scroll</span>
      <span>São Paulo · BR</span>
    </div>
  );
}
