export function Footer() {
  return (
    <footer className="border-t-2 border-ink py-10 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/60">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center size-7 rounded-full bg-wine text-cream text-[10px] font-bold">
            6B
          </span>
          <span>© {new Date().getFullYear()} Six Bullets Studio · Brasil 🇧🇷</span>
        </div>
        <div>Feito com café, código e bagunça</div>
      </div>
    </footer>
  );
}
