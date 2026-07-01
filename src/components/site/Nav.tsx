import { motion } from "framer-motion";
import { easings } from "@/lib/animations";

const links = [
  { href: "#happy-town", label: "Project" },
  { href: "#sobre", label: "Studio" },
  { href: "#equipe", label: "Crew" },
  { href: "#contato", label: "Contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: easings.snappy }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-cream/60 border-b border-ink/8 gpu-accel"
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2 group">
          <motion.span
            whileHover={{ rotate: [0, -8, 8, 0], scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.6, ease: easings.snappy }}
            className="inline-block font-[var(--font-script)] text-3xl md:text-4xl text-ink leading-none gpu-accel"
            style={{ fontFamily: "var(--font-script)" }}
          >
            six bullets
          </motion.span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/40 hidden md:inline">
            / 6B
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/70">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative hover:text-ink transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-wine after:transition-all hover:after:w-full gpu-accel"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <motion.a
          href="#contato"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.22em] rounded-full hover:bg-wine transition-all gpu-accel"
        >
          Discord
          <span className="inline-flex items-center justify-center size-7 rounded-full bg-cream text-ink group-hover:translate-x-0.5 transition-transform gpu-accel">
            ↗
          </span>
        </motion.a>
      </nav>
    </motion.header>
  );
}
