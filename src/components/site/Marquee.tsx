export function Marquee() {
  const items = [
    { t: "SIX BULLETS", c: "text-ink" },
    { t: "✶", c: "text-wine" },
    { t: "6B", c: "text-wine italic" },
    { t: "✶", c: "text-butter" },
    { t: "ROBLOX STUDIO", c: "text-ink" },
    { t: "✶", c: "text-sage" },
    { t: "FEITO NO BRASIL", c: "text-wine italic" },
    { t: "✶", c: "text-blush" },
  ];
  return (
    <div className="relative overflow-hidden border-y-2 border-ink py-4 bg-butter">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-3xl md:text-5xl">
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} className={`${it.c}`}>
            {it.t}
          </span>
        ))}
      </div>
    </div>
  );
}
