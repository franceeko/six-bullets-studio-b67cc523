import { motion } from "framer-motion";
import happyTown from "@/assets/happy-town-banner.png.asset.json";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 md:pt-28"
    >
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        {/* Availability pill */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-cream border border-ink/10 shadow-[0_10px_30px_-18px_oklch(0_0_0/0.28)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full size-2 bg-sage" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/80">
              001 — Now cooking
            </span>
          </div>
        </motion.div>

        {/* Headline — Bepp style: huge mixed weight with inline chips */}
        <motion.h1
          className="font-display text-center leading-[0.82] tracking-[-0.045em] text-ink text-[clamp(3.75rem,13.5vw,15rem)]"
        >
          {/* Line 1 */}
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block italic font-normal"
            >
              We craft
            </motion.span>
          </span>

          {/* Line 2 — chip + text */}
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3 md:gap-5 align-middle"
            >
              <motion.span
                whileHover={{ scale: 1.06, rotate: -4 }}
                className="bepp-chip inline-block size-[0.85em] shrink-0 -translate-y-[0.05em]"
                aria-label="Happy Town"
              >
                <img
                  src={happyTown.url}
                  alt=""
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                />

              </motion.span>
              <span className="font-sans font-normal">psychological</span>
            </motion.span>
          </span>

          {/* Line 3 */}
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              <span className="italic font-normal">horror</span>{" "}
              <span className="font-sans font-normal">on Roblox</span>
            </motion.span>
          </span>
        </motion.h1>

        {/* Subline + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 md:mt-20 flex flex-col items-center gap-8"
        >
          <p className="max-w-md text-center text-base md:text-lg text-ink/70 leading-relaxed">
            Now cooking <span className="marker-wine font-medium text-ink">Happy Town</span>.
          </p>


          <div className="flex flex-wrap items-center justify-center gap-3">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#happy-town"
              className="group relative inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-ink text-cream font-mono text-[11px] uppercase tracking-[0.22em] rounded-full hover:bg-wine transition-colors"
            >
              Enter Happy Town
              <span className="inline-flex items-center justify-center size-9 rounded-full bg-cream text-ink group-hover:translate-x-1 transition-transform">
                →
              </span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href="#equipe"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full font-mono text-[11px] uppercase tracking-[0.22em] text-ink/80 hover:text-ink transition-colors"
            >
              Meet the crew ↓
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Bottom mini-info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative max-w-[1400px] mx-auto px-6 lg:px-12 w-full mt-16 pb-10 flex items-end justify-between text-[10px] font-mono uppercase tracking-[0.3em] text-ink/45"
      >
        <span className="flex items-center gap-2">
          <span className="inline-block h-px w-8 bg-ink/30" /> Scroll
        </span>
        <span className="hidden sm:inline">Six Bullets Studio</span>
      </motion.div>
    </section>
  );
}
