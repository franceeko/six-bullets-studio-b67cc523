import { motion } from "framer-motion";

const text = "HAPPY TOWN";

export function HappyTown() {
  return (
    <section
      id="happy-town"
      className="relative py-32 md:py-40 bg-ink text-cream overflow-hidden"
    >
      {/* fog drift */}
      <motion.div
        aria-hidden
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 bottom-0 h-2/3 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.42 0.16 18 / 0.6), transparent 60%)",
        }}
      />
      {/* faint moon */}
      <div
        aria-hidden
        className="absolute top-20 right-12 size-32 rounded-full bg-butter/30 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute top-24 right-20 size-16 rounded-full bg-butter/70"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-wine-soft mb-4 flex items-center gap-2"
        >
          <span className="inline-block size-2 rounded-full bg-wine-soft animate-pulse" />
          002 — Em desenvolvimento
        </motion.div>

        {/* Title forming over a town silhouette */}
        <div className="relative">
          <h2 className="font-display italic font-light leading-[0.85] tracking-[-0.04em] text-[clamp(3.5rem,16vw,14rem)]">
            {text.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0, rotate: -10 }}
                whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.06,
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
                style={{ color: i === 5 ? "var(--wine)" : "var(--cream)" }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </h2>

          {/* Town skyline SVG behind/under text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative mt-4"
          >
            <Skyline />
          </motion.div>
        </div>

        <div className="mt-16 grid md:grid-cols-12 gap-10 md:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 text-lg md:text-2xl font-display font-light leading-relaxed text-cream/85"
          >
            Horror psicológico cooperativo. Uma cidade pacata, ruas vazias, sorrisos
            estranhos — e algo bem por baixo de tudo isso que não quer ser encontrado.
          </motion.p>

          <div className="md:col-span-5 space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-wine-soft mb-3">
              Inspirações
            </div>
            {[
              "Silent Hill",
              "The Mimic",
              "The Mystery of Duvall Drive",
            ].map((ref, i) => (
              <motion.div
                key={ref}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex items-center gap-3 border-b border-cream/15 pb-3"
              >
                <span className="font-mono text-[10px] text-wine-soft">
                  0{i + 1}
                </span>
                <span className="font-display text-xl md:text-2xl text-cream">{ref}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skyline() {
  // Stylized small-town silhouette with flickering windows
  return (
    <svg
      viewBox="0 0 1200 220"
      className="w-full h-auto"
      aria-hidden
    >
      <defs>
        <linearGradient id="ground" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--wine-deep)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--wine-deep)" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* far hills */}
      <path
        d="M0 180 Q200 130 400 160 T800 150 T1200 170 V220 H0 Z"
        fill="var(--wine-deep)"
        opacity="0.5"
      />

      {/* church */}
      <g fill="var(--ink)" stroke="var(--cream)" strokeWidth="1.5">
        <polygon points="120,120 145,80 170,120" />
        <rect x="135" y="120" width="20" height="60" />
        <line x1="145" y1="60" x2="145" y2="80" />
        <line x1="140" y1="68" x2="150" y2="68" />
      </g>

      {/* houses row */}
      <g stroke="var(--cream)" strokeWidth="1.2" fill="var(--ink)">
        {[
          { x: 200, w: 70, h: 70, roof: 25 },
          { x: 285, w: 90, h: 90, roof: 30 },
          { x: 390, w: 60, h: 60, roof: 20 },
          { x: 465, w: 80, h: 80, roof: 28 },
          { x: 560, w: 70, h: 70, roof: 24 },
        ].map((h, i) => (
          <g key={i}>
            <polygon
              points={`${h.x},${180 - h.h} ${h.x + h.w / 2},${180 - h.h - h.roof} ${h.x + h.w},${180 - h.h}`}
            />
            <rect x={h.x} y={180 - h.h} width={h.w} height={h.h} />
            <rect
              className="flicker"
              x={h.x + 10}
              y={180 - h.h + 15}
              width="14"
              height="14"
              fill="var(--butter)"
              stroke="none"
              style={{ animationDelay: `${i * 0.7}s` }}
            />
            <rect
              x={h.x + h.w - 24}
              y={180 - h.h + 15}
              width="14"
              height="14"
              fill="var(--wine)"
              opacity="0.7"
              stroke="none"
            />
            <rect
              x={h.x + h.w / 2 - 7}
              y={180 - 28}
              width="14"
              height="28"
              fill="var(--wine-deep)"
              stroke="none"
            />
          </g>
        ))}
      </g>

      {/* big factory */}
      <g fill="var(--ink)" stroke="var(--cream)" strokeWidth="1.2">
        <rect x="650" y="100" width="180" height="80" />
        <rect x="680" y="70" width="20" height="40" />
        <rect x="720" y="60" width="20" height="50" />
        <rect
          className="flicker"
          x="665"
          y="120"
          width="12"
          height="12"
          fill="var(--butter)"
          stroke="none"
        />
        <rect
          x="690"
          y="120"
          width="12"
          height="12"
          fill="var(--butter)"
          stroke="none"
          opacity="0.5"
        />
        <rect
          x="715"
          y="120"
          width="12"
          height="12"
          fill="var(--butter)"
          stroke="none"
        />
        <rect
          x="740"
          y="120"
          width="12"
          height="12"
          fill="var(--wine)"
          stroke="none"
          opacity="0.6"
        />
        <rect
          x="765"
          y="120"
          width="12"
          height="12"
          fill="var(--butter)"
          stroke="none"
          opacity="0.4"
        />
        <rect
          x="790"
          y="120"
          width="12"
          height="12"
          fill="var(--butter)"
          stroke="none"
        />
      </g>

      {/* water tower */}
      <g fill="var(--ink)" stroke="var(--cream)" strokeWidth="1.2">
        <line x1="870" y1="180" x2="880" y2="120" />
        <line x1="910" y1="180" x2="900" y2="120" />
        <ellipse cx="890" cy="115" rx="22" ry="10" />
        <rect x="868" y="105" width="44" height="20" />
        <polygon points="868,105 890,90 912,105" />
      </g>

      {/* more houses */}
      <g stroke="var(--cream)" strokeWidth="1.2" fill="var(--ink)">
        {[
          { x: 950, w: 70, h: 70, roof: 22 },
          { x: 1035, w: 60, h: 60, roof: 18 },
          { x: 1110, w: 80, h: 80, roof: 26 },
        ].map((h, i) => (
          <g key={i}>
            <polygon
              points={`${h.x},${180 - h.h} ${h.x + h.w / 2},${180 - h.h - h.roof} ${h.x + h.w},${180 - h.h}`}
            />
            <rect x={h.x} y={180 - h.h} width={h.w} height={h.h} />
            <rect
              className="flicker"
              x={h.x + 12}
              y={180 - h.h + 18}
              width="12"
              height="12"
              fill="var(--butter)"
              stroke="none"
              style={{ animationDelay: `${i * 1.1}s` }}
            />
          </g>
        ))}
      </g>

      {/* trees */}
      <g fill="var(--wine-deep)">
        <circle cx="80" cy="170" r="14" />
        <circle cx="630" cy="170" r="12" />
        <circle cx="935" cy="172" r="13" />
      </g>

      {/* ground */}
      <rect x="0" y="178" width="1200" height="42" fill="url(#ground)" />
    </svg>
  );
}
