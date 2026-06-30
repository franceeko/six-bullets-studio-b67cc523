import { motion } from "framer-motion";

const socials = [
  { label: "Discord", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Roblox Group", href: "#" },
];

export function Contact() {
  return (
    <section id="contato" className="relative py-32 md:py-44 bg-surface/40 border-t border-border/40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 100%, oklch(0.44 0.14 18 / 0.45), transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-wine-glow mb-8">
          004 — Contato
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display font-light text-6xl md:text-8xl lg:text-9xl tracking-[-0.04em] text-bone wine-glow-text leading-[0.9]"
        >
          Entre no <em className="text-wine-glow">tambor.</em>
        </motion.h2>
        <p className="mt-8 max-w-xl mx-auto text-base md:text-lg text-bone/70">
          Discord aberto pra jogar, conversar e acompanhar tudo que rola no studio.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="group inline-flex items-center gap-3 px-6 py-3 border border-bone/20 hover:border-wine-glow text-bone font-mono text-xs uppercase tracking-[0.2em] rounded-sm transition-colors"
            >
              {s.label}
              <span className="text-wine-glow transition-transform group-hover:translate-x-1">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
