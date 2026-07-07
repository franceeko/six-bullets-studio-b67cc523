import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { HappyTown } from "@/components/site/HappyTown";
import { Team } from "@/components/site/Team";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { GrainOverlay } from "@/components/site/GrainOverlay";
import { Cursor } from "@/components/site/Cursor";
import { LiquidBackground } from "@/components/site/LiquidBackground";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Six Bullets — Roblox Horror Studio" },
      {
        name: "description",
        content:
          "Six Bullets (6B) is a seven-person studio building Happy Town, a psychological horror project on Roblox.",
      },
      { property: "og:title", content: "Six Bullets — Roblox Horror Studio" },
      {
        property: "og:description",
        content:
          "Small crew, sharp aim. Now cooking Happy Town — a slow-burn horror on Roblox.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 50;
    let ty = 35;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--mx", `${tx}%`);
          el.style.setProperty("--my", `${ty}%`);
          raf = 0;
        });
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="relative cream-tex text-ink">
      <LiquidBackground />
      <GrainOverlay />
      <Cursor />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <HappyTown />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>

  );
}

