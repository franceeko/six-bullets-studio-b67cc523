import { motion } from "framer-motion";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#jogos", label: "Jogos" },
  { href: "#equipe", label: "Equipe" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/40"
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display text-xl tracking-tight">
          <span className="inline-flex items-center justify-center size-8 rounded-sm bg-wine text-bone font-mono text-sm font-bold">6B</span>
          <span className="hidden sm:inline text-bone">Six Bullets</span>
        </a>
        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-bone transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
        <a
          href="#contato"
          className="font-mono text-xs uppercase tracking-[0.2em] px-4 py-2 border border-wine/60 text-bone hover:bg-wine/20 transition-colors rounded-sm"
        >
          Discord →
        </a>
      </nav>
    </motion.header>
  );
}
