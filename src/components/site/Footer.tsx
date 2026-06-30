export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center size-6 rounded-sm bg-wine text-bone text-[10px] font-bold">6B</span>
          <span>© {new Date().getFullYear()} Six Bullets Studio</span>
        </div>
        <div>Built with care · Roblox Studio</div>
      </div>
    </footer>
  );
}
