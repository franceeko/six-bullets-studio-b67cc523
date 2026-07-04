import { motion } from "framer-motion";

const socials = [
  { label: "Discord", href: "https://discord.gg/ZWZuJVmRMF" },
  { label: "Roblox Group", href: "https://www.roblox.com/share/g/470296267" },
  { label: "X / Twitter", href: "#", soon: true },
  { label: "YouTube", href: "#", soon: true },
];

export function Contact() {
  return (
    <section
      id="contato"
      className="section-lazy relative py-32 md:py-48 overflow-hidden border-t border-ink/10"
    >
      <div className="light-rays" aria-hidden />

      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -right-32 size-[36rem] rounded-full bg-wine-soft/50 blur-3xl"
      />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.32em] text-ink/60 mb-8 flex items-center justify-center gap-2">
          <span className="inline-block size-1.5 rounded-full bg-wine animate-pulse" />
          004 — Say hi
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display font-normal text-6xl md:text-8xl lg:text-[10rem] tracking-[-0.03em] text-ink leading-[0.88]"
        >
          <span className="italic">Come</span> <span className="italic marker-wine">whisper.</span>
        </motion.h2>

        <p className="mt-8 max-w-md mx-auto text-base md:text-lg text-ink/70">
          Discord's open.
        </p>


        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.03 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 bg-cream text-ink font-mono text-[10px] uppercase tracking-[0.22em] rounded-full border border-ink/15"
              style={{
                boxShadow: "0 14px 30px -14px oklch(0 0 0 / 0.3), 0 1px 0 oklch(1 0 0 / 0.9) inset",
              }}
            >
              {s.label}
              <span className="inline-flex items-center justify-center size-8 rounded-full bg-ink text-cream group-hover:bg-wine transition-colors">
                ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
