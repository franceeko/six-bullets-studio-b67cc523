import { motion } from "framer-motion";

export function SectionHeader({ number, kicker, title }: { number: string; kicker: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-end justify-between gap-6 mb-12 md:mb-20 pb-6 border-b border-border/40"
    >
      <div>
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-wine-glow mb-4">
          {number} — {kicker}
        </div>
        <h2 className="font-display font-light text-5xl md:text-7xl tracking-[-0.03em] text-bone">
          {title}
        </h2>
      </div>
    </motion.div>
  );
}
