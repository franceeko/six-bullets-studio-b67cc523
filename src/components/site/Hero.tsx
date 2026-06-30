import { motion } from "framer-motion";

const title = "SIX BULLETS";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 paper-texture"
    >
      {/* floating colorful blobs */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -30, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 -left-10 size-64 rounded-full bg-butter/60 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-0 size-80 rounded-full bg-wine-soft/70 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/3 size-40 rounded-full bg-sage/50 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-wine mb-8 flex items-center gap-3"
        >
          <span className="inline-block size-1.5 rounded-full bg-wine animate-pulse" />
          000 — Roblox Studio · feito com carinho no Brasil 🇧🇷
        </motion.div>

        <h1 className="font-display font-light leading-[0.85] tracking-[-0.04em] text-ink">
          <span className="block text-[clamp(3.5rem,14vw,13rem)]">
            {title.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0, rotate: -8 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  delay: 0.1 + i * 0.05,
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ rotate: [0, -6, 6, 0], color: "var(--wine)" }}
                className="inline-block cursor-default origin-bottom"
                style={{ fontStyle: ch === "B" || ch === "X" ? "italic" : "normal" }}
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
          <p className="max-w-md text-base md:text-lg text-ink/75 leading-relaxed">
            Um studio brasileiro independente no Roblox. A gente faz jogo com{" "}
            <em className="text-wine not-italic font-semibold">atmosfera</em>, alma e
            aquela pitada de bagunça que só sai por aqui.
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.a
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              href="#happy-town"
              className="group relative inline-flex items-center gap-3 px-6 py-3 bg-ink text-cream font-mono text-xs uppercase tracking-[0.2em] rounded-full hover:bg-wine transition-colors"
            >
              Ver Happy Town
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.97 }}
              href="#contato"
              className="inline-flex items-center gap-3 px-6 py-3 border-2 border-ink text-ink font-mono text-xs uppercase tracking-[0.2em] rounded-full hover:bg-butter transition-colors"
            >
              Entrar no Discord
            </motion.a>
          </div>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full mt-24 pb-10 flex items-end justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-ink/50">
        <span>↓ Role pra ver</span>
        <span className="hidden sm:inline">São Paulo · BR</span>
      </div>
    </section>
  );
}
