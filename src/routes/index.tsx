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
  return (
    <div className="relative cream-tex text-ink">
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
