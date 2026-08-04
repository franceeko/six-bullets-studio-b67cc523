export function Footer() {
  return (
    <footer className="border-t border-ink/10 py-10 bg-cream">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/70">
        <div className="flex items-center gap-3">
          <span
            className="text-2xl text-ink normal-case tracking-normal leading-none"
            style={{ fontFamily: "var(--font-script)" }}
          >
            six bullets
          </span>
          <span className="hidden md:inline">· © {new Date().getFullYear()}</span>
        </div>
        <div>All quiet on the outside.</div>
      </div>
    </footer>
  );
}
