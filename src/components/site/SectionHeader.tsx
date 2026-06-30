import { motion } from "framer-motion";

export function SectionHeader({
  number,
  kicker,
  title,
  accent = "wine",
}: {
  number: string;
  kicker: string;
  title: string;
  accent?: "wine" | "butter" | "sage" | "blush" | "sky";
}) {
  const dotMap: Record<string, string> = {
    wine: "bg-wine",
    butter: "bg-butter",
    sage: "bg-sage",
    blush: "bg-blush",
    sky: "bg-sky",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-end justify-between gap-6 mb-12 md:mb-20 pb-6 border-b-2 border-ink/15"
    >
      <div>
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-ink/60 mb-4 flex items-center gap-2">
          <span className={`inline-block size-2 rounded-full ${dotMap[accent]}`} />
          {number} — {kicker}
        </div>
        <h2 className="font-display font-light text-5xl md:text-7xl tracking-[-0.03em] text-ink">
          {title}
        </h2>
      </div>
    </motion.div>
  );
}
