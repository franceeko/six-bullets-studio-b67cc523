import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";

const links = [
  { href: "#happy-town", label: "Project" },
  { href: "#sobre", label: "Studio" },
  { href: "#equipe", label: "Crew" },
  { href: "#contato", label: "Contact" },
];

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[60] border-b border-ink/10 bg-cream/80 backdrop-blur-md"
      >
        <nav className="mx-auto grid h-16 max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 md:grid-cols-[1fr_auto_1fr] lg:px-12">
          {/* overflow-hidden + fixed leading: the script glyphs used to spill
              out of the bar and jitter when the pointer swept past them. */}
          <a href="#top" className="flex min-w-0 items-baseline gap-2 overflow-hidden">
            <span
              className="inline-block max-w-full truncate py-1 text-3xl leading-[1.2] text-ink transition-colors hover:text-wine"
              style={{ fontFamily: "var(--font-script)" }}
            >
              six bullets
            </span>

            <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-ink/65 lg:inline">
              / 6B
            </span>
          </a>

          <ul className="hidden items-center justify-center gap-9 font-mono text-[11px] uppercase tracking-[0.24em] text-ink/65 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all hover:text-ink hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-2 md:gap-3">
            <ThemeToggle />
            <a
              href="https://discord.gg/ZWZuJVmRMF"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 border border-ink/25 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-ink transition-colors hover:border-ink/60 hover:bg-ink/5 md:inline-flex"
            >
              Get in touch
              <ArrowUpRight className="size-3.5" />
            </a>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="flex size-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span className="h-0.5 w-6 bg-ink" />
              <span className="h-0.5 w-6 bg-ink" />
              <span className="h-0.5 w-4 self-center bg-ink" style={{ marginRight: 8 }} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </>
  );
}
