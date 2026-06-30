import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { HappyTown } from "@/components/site/HappyTown";
import { Team } from "@/components/site/Team";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { GrainOverlay } from "@/components/site/GrainOverlay";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Six Bullets — Roblox Studio" },
      {
        name: "description",
        content:
          "Six Bullets (6B) é um studio brasileiro independente no Roblox. Criadores de Happy Town, horror psicológico cooperativo.",
      },
      { property: "og:title", content: "Six Bullets — Roblox Studio" },
      {
        property: "og:description",
        content:
          "Studio brasileiro de jogos no Roblox. Atmosfera, alma e Happy Town a caminho.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative bg-cream text-ink">
      <GrainOverlay />
      <Nav />
      <main>
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
