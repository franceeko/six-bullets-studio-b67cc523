import { motion } from "framer-motion";
import happyTown from "@/assets/happy-town-banner.png.asset.json";

export function HappyTown() {
  return (
    <section
      id="happy-town"
      className="relative py-28 md:py-40 overflow-hidden bg-paper/70"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-14"
        >
          <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.32em] text-ink/60 mb-3 flex items-center gap-2">
            <span className="inline-block size-1.5 rounded-full bg-wine animate-pulse" />
            002 — Current project
          </div>
          <h2 className="font-display italic font-normal text-5xl md:text-7xl tracking-[-0.02em] text-ink">
            6B Studio — Happy Town.
          </h2>
        </motion.div>

        {/* Banner card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="edge-ticks relative overflow-hidden border-2 border-ink bg-ink gpu rounded-xl"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-[10px]">
            <img
              src={happyTown.url}
              alt="Happy Town key art"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />


            {/* Overlay chrome */}
            <div
              className="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink text-cream border border-cream/20"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cream opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full size-1.5 bg-cream" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em]">
                In production
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
