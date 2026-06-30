import { motion } from "framer-motion";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#happy-town", label: "Happy Town" },
  { href: "#equipe", label: "Equipe" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-cream/70 border-b border-ink/10"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-display text-xl tracking-tight text-ink group">
          <motion.span
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="inline-flex items-center justify-center size-9 rounded-full bg-wine text-cream font-mono text-sm font-bold"
          >
            6B
          </motion.span>
          <span className="hidden sm:inline italic">Six Bullets</span>
        </a>
        <ul className="hidden md:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative hover:text-wine transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-wine after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contato"
          className="font-mono text-[11px] uppercase tracking-[0.18em] px-4 py-2 bg-ink text-cream hover:bg-wine transition-colors rounded-full"
        >
          Discord ↗
        </a>
      </nav>
    </motion.header>
  );
}
