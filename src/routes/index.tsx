import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";
import { Games } from "@/components/site/Games";
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
          "Six Bullets (6B) é um studio independente no Roblox construindo mundos com atmosfera, mecânicas profundas e identidade própria.",
      },
      { property: "og:title", content: "Six Bullets — Roblox Studio" },
      {
        property: "og:description",
        content: "Studio de jogos no Roblox. Atmosfera, profundidade e ambição.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative bg-background text-bone">
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Games />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
