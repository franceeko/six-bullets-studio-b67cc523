import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import happyTown from "@/assets/happy-town-banner.png.asset.json";

export function HappyTown() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bannerY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);
  const bannerScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1.02, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.7, 0.35, 0.65]);

  return (
    <section
      ref={ref}
      id="happy-town"
      className="relative py-32 md:py-44 bg-cream overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between mb-10 md:mb-14"
        >
          <div>
            <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.32em] text-ink/60 mb-3 flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-wine animate-pulse" />
              002 — Current project
            </div>
            <h2 className="font-display italic font-normal text-5xl md:text-7xl tracking-[-0.02em] text-ink">
              The town that smiles.
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/50">
            <span>Status · In production</span>
            <span>Genre · Co-op horror</span>
          </div>
        </motion.div>

        {/* Cinematic banner card with parallax */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[28px] overflow-hidden border border-ink/15 shadow-[0_40px_80px_-30px_oklch(0_0_0/0.55)]"
        >
          <div className="relative aspect-[16/9] md:aspect-[21/9] bg-ink">
            <motion.img
              src={happyTown.url}
              alt="Happy Town — key art"
              style={{ y: bannerY, scale: bannerScale }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Vignette + flicker */}
            <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 pointer-events-none"
              aria-hidden
              // radial vignette
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(0_0_0/0.55)_100%)]" />
            </motion.div>

            {/* Drifting fog strips */}
            <motion.div
              aria-hidden
              animate={{ x: ["-15%", "20%", "-15%"] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-white/25 via-white/8 to-transparent blur-2xl"
            />
            <motion.div
              aria-hidden
              animate={{ x: ["10%", "-25%", "10%"] }}
              transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 inset-x-0 h-1/3 bg-gradient-to-b from-white/15 to-transparent blur-3xl opacity-70"
            />

            {/* Overlay chrome */}
            <div className="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream/90 backdrop-blur border border-ink/10">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-wine opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full size-1.5 bg-wine" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-ink">
                REC · Devlog 001
              </span>
            </div>

            <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7 font-mono text-[10px] uppercase tracking-[0.24em] text-cream/85">
              6B · HT-001
            </div>
          </div>
        </motion.div>

        {/* Body */}
        <div className="mt-14 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <p className="font-display italic text-2xl md:text-4xl leading-[1.15] text-ink">
              A small town. Empty streets. Neighbours who greet you by name — and remember
              things you never told them.
            </p>
            <p className="mt-6 text-ink/70 leading-relaxed max-w-xl">
              Happy Town is a cooperative psychological horror experience. Less jumpscare,
              more the-lights-just-flickered-and-nobody-else-noticed. Built inside Roblox,
              scored and modeled in-house.
            </p>
          </motion.div>

          <div className="md:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-4">
              References woven in
            </div>
            <div className="space-y-3">
              {[
                { n: "01", ref: "Silent Hill", tag: "Fog logic" },
                { n: "02", ref: "The Mimic", tag: "Roblox horror" },
                { n: "03", ref: "The Mystery of Duvall Drive", tag: "Suburban dread" },
              ].map((r, i) => (
                <motion.div
                  key={r.ref}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 6 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-center justify-between gap-4 border-b border-ink/15 pb-3 group cursor-default"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-wine">{r.n}</span>
                    <span className="font-display italic text-xl md:text-2xl text-ink group-hover:text-wine transition-colors">
                      {r.ref}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-ink/45">
                    {r.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
