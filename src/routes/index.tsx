import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, type ReactNode } from "react";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { About } from "@/components/site/About";

const HappyTown = lazy(() =>
  import("@/components/site/HappyTown").then((m) => ({ default: m.HappyTown })),
);
const Team = lazy(() => import("@/components/site/Team").then((m) => ({ default: m.Team })));
const Contact = lazy(() =>
  import("@/components/site/Contact").then((m) => ({ default: m.Contact })),
);

function SectionFallback({ height = 720 }: { height?: number }) {
  return <div aria-hidden style={{ minHeight: height }} />;
}

function Deferred({ children, height }: { children: ReactNode; height?: number }) {
  return <Suspense fallback={<SectionFallback height={height} />}>{children}</Suspense>;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Six Bullets — Roblox Horror Studio" },
      {
        name: "description",
        content:
          "Six Bullets (6B) is a fourteen-person studio building Happy Town, a psychological horror project on Roblox.",
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
    <div className="relative text-ink">
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Deferred height={760}>
          <HappyTown />
        </Deferred>
        <Deferred height={1200}>
          <Team />
        </Deferred>
        <Deferred height={640}>
          <Contact />
        </Deferred>
      </main>
      <Footer />
    </div>
  );
}
