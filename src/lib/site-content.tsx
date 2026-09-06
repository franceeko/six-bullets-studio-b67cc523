import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { devs as defaultDevs, type Dev } from "@/data/studio";

/**
 * Editable site content.
 *
 * Defaults live in code (`src/data/studio.ts` + the constants below). The
 * secret hub writes an override object into localStorage; this provider
 * merges the two and exposes the result to every component. Exporting the
 * override as JSON is how an edit becomes permanent for all visitors: the
 * file is handed back to the repo as the new defaults.
 */

export type PaletteTokens = {
  cream: string;
  paper: string;
  ink: string;
  wine: string;
};

export type Stat = { value: string; label: string; tone: "solid" | "outline" };

export type SiteContent = {
  hero: { line1: string; line2: string; kicker: string; cta: string };
  about: { number: string; kicker: string; title: string; lead: string; sub: string; stats: Stat[] };
  happyTown: { kicker: string; status: string; title: string; note: string; cta: string };
  team: { number: string; kicker: string; title: string };
  contact: { kicker: string; title: string; note: string };
  devs: Dev[];
  palette: { light: PaletteTokens; dark: PaletteTokens };
};

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    line1: "SIX",
    line2: "BULLETS",
    kicker: "Roblox horror studio",
    cta: "Happy Town",
  },
  about: {
    number: "001",
    kicker: "Studio",
    title: "Small crew. Sharp aim.",
    lead: "Six Bullets — a Roblox studio.",
    sub: "One project. In-house from design to sound.",
    stats: [
      { value: "13", label: "Crew", tone: "solid" },
      { value: "01", label: "Project", tone: "outline" },
      { value: "—", label: "CCU", tone: "outline" },
      { value: "—", label: "Visits", tone: "solid" },
    ],
  },
  happyTown: {
    kicker: "002 — Current project",
    status: "In production",
    title: "Happy Town",
    note: "A quiet town that stops making sense.",
    cta: "Follow the development",
  },
  team: { number: "003", kicker: "The crew", title: "Thirteen hands. One trigger." },
  contact: { kicker: "004 — Say hi", title: "Come whisper.", note: "Discord's open." },
  devs: defaultDevs,
  palette: {
    light: { cream: "#f1f1f1", paper: "#e2e2e2", ink: "#111111", wine: "#2a2a2a" },
    dark: { cream: "#0c0b0a", paper: "#1c1a17", ink: "#f6f4f1", wine: "#e8b04b" },
  },
};

const STORAGE_KEY = "6b:content:v2";

type Ctx = {
  content: SiteContent;
  /** Replace the whole content object (hub only). */
  setContent: (next: SiteContent) => void;
  reset: () => void;
  /** true when the palette override should be applied to the page. */
  paletteEnabled: boolean;
  setPaletteEnabled: (v: boolean) => void;
};

const SiteContentContext = createContext<Ctx>({
  content: DEFAULT_CONTENT,
  setContent: () => {},
  reset: () => {},
  paletteEnabled: false,
  setPaletteEnabled: () => {},
});

function merge(base: SiteContent, patch: Partial<SiteContent> | null): SiteContent {
  if (!patch) return base;
  return {
    hero: { ...base.hero, ...patch.hero },
    about: { ...base.about, ...patch.about, stats: patch.about?.stats ?? base.about.stats },
    happyTown: { ...base.happyTown, ...patch.happyTown },
    team: { ...base.team, ...patch.team },
    contact: { ...base.contact, ...patch.contact },
    devs: patch.devs ?? base.devs,
    palette: {
      light: { ...base.palette.light, ...patch.palette?.light },
      dark: { ...base.palette.dark, ...patch.palette?.dark },
    },
  };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(DEFAULT_CONTENT);
  const [paletteEnabled, setPaletteEnabledState] = useState(false);

  // Load overrides after hydration so server and client render the same HTML.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { content?: Partial<SiteContent>; palette?: boolean };
      setContentState(merge(DEFAULT_CONTENT, parsed.content ?? null));
      setPaletteEnabledState(Boolean(parsed.palette));
    } catch {
      /* corrupted storage must never break the site */
    }
  }, []);

  const persist = useCallback((next: SiteContent, palette: boolean) => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ content: next, palette }),
      );
    } catch {
      /* quota exceeded — the session still works, just not saved */
    }
  }, []);

  const setContent = useCallback(
    (next: SiteContent) => {
      setContentState(next);
      persist(next, paletteEnabled);
    },
    [persist, paletteEnabled],
  );

  const setPaletteEnabled = useCallback(
    (v: boolean) => {
      setPaletteEnabledState(v);
      persist(content, v);
    },
    [content, persist],
  );

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setContentState(DEFAULT_CONTENT);
    setPaletteEnabledState(false);
  }, []);

  // Apply the palette override as inline custom properties on <html>, picking
  // the light or dark set from the current theme class.
  useEffect(() => {
    const root = document.documentElement;
    const keys: (keyof PaletteTokens)[] = ["cream", "paper", "ink", "wine"];

    const clear = () => keys.forEach((k) => root.style.removeProperty(`--${k}`));

    const apply = () => {
      if (!paletteEnabled) {
        clear();
        return;
      }
      const set = root.classList.contains("dark") ? content.palette.dark : content.palette.light;
      keys.forEach((k) => root.style.setProperty(`--${k}`, set[k]));
    };

    apply();
    const obs = new MutationObserver(apply);
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => {
      obs.disconnect();
      clear();
    };
  }, [content.palette, paletteEnabled]);

  const value = useMemo(
    () => ({ content, setContent, reset, paletteEnabled, setPaletteEnabled }),
    [content, setContent, reset, paletteEnabled, setPaletteEnabled],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
