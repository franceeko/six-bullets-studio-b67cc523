export function Marquee() {
  const items = ["SIX BULLETS", "6B", "ROBLOX STUDIO", "EST. 2024", "SIX BULLETS", "6B", "ROBLOX STUDIO", "EST. 2024"];
  return (
    <div className="relative overflow-hidden border-y border-border/40 py-5 bg-surface/40">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-display text-3xl md:text-5xl italic text-bone/80">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span className="text-wine-glow">✶</span>
          </span>
        ))}
      </div>
    </div>
  );
}
