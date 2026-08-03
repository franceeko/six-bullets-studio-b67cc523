import { ArrowUpRight, X } from "lucide-react";

type Link = { href: string; label: string };

type Props = {
  open: boolean;
  onClose: () => void;
  links: Link[];
};

/** Fullscreen navigation overlay for touch / small screens. */
export function MobileMenu({ open, onClose, links }: Props) {
  return (
    <div
      className={`fixed inset-0 z-[70] md:hidden bg-cream/97 backdrop-blur-md transition-all duration-500 ${
        open ? "opacity-100 visible" : "pointer-events-none invisible opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="flex h-16 items-center justify-between px-6">
        <span
          className="text-3xl leading-none text-ink"
          style={{ fontFamily: "var(--font-script)" }}
        >
          six bullets
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex size-10 items-center justify-center rounded-full border border-ink/15 text-ink"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="flex h-[calc(100dvh-4rem)] flex-col justify-center gap-2 px-6 pb-24">
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={onClose}
            className="font-display text-5xl uppercase leading-[0.95] tracking-[-0.03em] text-ink transition-all duration-500"
            style={{
              transitionDelay: `${i * 80 + 100}ms`,
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {l.label}
          </a>
        ))}

        <a
          href="https://discord.gg/ZWZuJVmRMF"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="mt-10 inline-flex w-fit items-center gap-2 border border-ink/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.26em] text-ink transition-all duration-500 hover:bg-ink hover:text-cream"
          style={{
            transitionDelay: `${links.length * 80 + 100}ms`,
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
          }}
        >
          Join the Discord
          <ArrowUpRight className="size-4" />
        </a>
      </nav>
    </div>
  );
}
