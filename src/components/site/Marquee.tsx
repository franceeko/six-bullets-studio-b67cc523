export function Marquee() {
  const items = [
    { t: "SIX BULLETS", c: "text-ink" },
    { t: "✶", c: "text-wine" },
    { t: "HAPPY TOWN", c: "text-wine italic" },
    { t: "✶", c: "text-ink" },
    { t: "ROBLOX HORROR", c: "text-ink" },
    { t: "✶", c: "text-wine" },
    { t: "COOKING SOMETHING WEIRD", c: "text-ink italic" },
    { t: "✶", c: "text-wine" },
  ];
  return (
    <div className="relative overflow-hidden border-y border-ink/20 py-5 md:py-6 bg-cream/60 backdrop-blur-[2px]">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-display italic text-4xl md:text-6xl">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className={`${it.c}`}>
            {it.t}
          </span>
        ))}
      </div>
    </div>
  );
}
