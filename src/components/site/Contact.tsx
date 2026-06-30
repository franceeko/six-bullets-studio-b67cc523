import { motion } from "framer-motion";

const socials = [
  { label: "Discord", href: "#", color: "bg-wine-soft" },
  { label: "X / Twitter", href: "#", color: "bg-butter" },
  { label: "YouTube", href: "#", color: "bg-blush" },
  { label: "Roblox Group", href: "#", color: "bg-sage" },
];

export function Contact() {
  return (
    <section
      id="contato"
      className="relative py-32 md:py-44 overflow-hidden paper-texture border-t-2 border-ink"
    >
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -right-32 size-96 rounded-full bg-wine-soft/60 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-32 -left-32 size-96 rounded-full bg-butter/60 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-wine mb-8 flex items-center justify-center gap-2">
          <span className="inline-block size-2 rounded-full bg-wine animate-pulse" />
          004 — Contato
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display font-light text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] text-ink leading-[0.9]"
        >
          Vem trocar <em className="text-wine">ideia.</em>
        </motion.h2>
        <p className="mt-8 max-w-xl mx-auto text-base md:text-lg text-ink/70">
          Discord aberto pra jogar, conversar, dar ideia ou só ficar de boa
          enquanto a gente cozinha o Happy Town.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
              whileHover={{ rotate: 0, scale: 1.06, y: -3 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", bounce: 0.4 }}
              className={`group inline-flex items-center gap-3 px-6 py-3 ${s.color} text-ink font-mono text-xs uppercase tracking-[0.2em] rounded-full border-2 border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--wine)] transition-shadow`}
            >
              {s.label}
              <span className="transition-transform group-hover:translate-x-1">↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
