import { useEffect, useState } from "react";

const WORD = "SIX BULLETS";

/**
 * Entry curtain. Covers the page while fonts and the first images settle,
 * reveals "SIX BULLETS" letter by letter, then lifts away.
 * Always resolves — a slow font or a broken image can never trap the visitor.
 */
export function Intro() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setLeaving(true);
      window.setTimeout(() => setGone(true), 800);
    };

    const minimum = new Promise<void>((r) => window.setTimeout(r, 1500));
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
    const safety = new Promise<void>((r) => window.setTimeout(r, 3200));

    void Promise.race([Promise.all([minimum, fonts]), safety]).then(finish);

    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (gone) document.documentElement.style.overflow = "";
  }, [gone]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      className={`intro-curtain ${leaving ? "intro-curtain-out" : ""}`}
      data-state={leaving ? "leaving" : "loading"}
    >
      <div className="intro-word">
        {WORD.split("").map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className="intro-letter"
            style={{ animationDelay: `${120 + i * 55}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>
      <span className="intro-rule" />
    </div>
  );
}
