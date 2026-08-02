import { motion } from "framer-motion";
import happyTown from "@/assets/happy-town-banner.png.asset.json";

export function HappyTown() {
  return (
    <section
      id="happy-town"
      className="section-bridge relative py-28 md:py-40 overflow-hidden"
    >
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.32em] text-ink/60 mb-3 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-wine animate-pulse" />
              002 — Current project
            </div>
            <h2 className="font-display italic font-normal text-6xl md:text-8xl tracking-[-0.03em] text-ink leading-[0.9]">
              Happy Town
            </h2>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
            Psychological horror · Roblox
          </span>
        </motion.div>

        {/* Cinema frame */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* outer rule */}
          <div className="relative rounded-[26px] border border-ink/20 p-3 md:p-4 bg-cream/40 backdrop-blur-[2px]">
            <div className="edge-ticks relative overflow-hidden rounded-[18px] border-2 border-ink bg-ink gpu">
              <div className="relative aspect-[16/10] md:aspect-[2.39/1] overflow-hidden">
                <motion.img
                  src={happyTown.url}
                  alt="Happy Town key art"
                  loading="lazy"
                  decoding="async"
                  initial={{ scale: 1.06 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover gpu"
                />

                {/* letterbox bars */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[6%] bg-ink" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[6%] bg-ink" />

                {/* status chip */}
                <div className="absolute top-[9%] left-5 md:left-8 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink/85 text-cream border border-cream/20">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cream opacity-75 animate-ping" />
                    <span className="relative inline-flex rounded-full size-1.5 bg-cream" />
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.28em]">
                    In production
                  </span>
                </div>

                {/* corner crosses */}
                {[
                  "top-[9%] left-5 md:left-8",
                  "top-[9%] right-5 md:right-8",
                  "bottom-[9%] left-5 md:left-8",
                  "bottom-[9%] right-5 md:right-8",
                ]
                  .slice(1)
                  .map((pos) => (
                    <span
                      key={pos}
                      aria-hidden
                      className={`pointer-events-none absolute ${pos} size-3 border border-cream/50`}
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* caption rail */}
          <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
            <span>Six Bullets Studio</span>
            <span className="hidden sm:inline">Silent-hill slow burn</span>
            <span>WIP</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
