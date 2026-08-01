import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "6b-theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setThemeState(readInitialTheme());
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.dataset["theme"] = next;
    root.style.colorScheme = next;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage blocked — theme still applies for this session */
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

/** Inline script injected in the document head to avoid a flash of the wrong theme. */
export const THEME_INIT_SCRIPT = `(function(){try{var k=${JSON.stringify(
  THEME_STORAGE_KEY,
)};var s=localStorage.getItem(k);var m=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="dark"||s==="light"?s:(m?"dark":"light");var r=document.documentElement;if(t==="dark")r.classList.add("dark");r.dataset.theme=t;r.style.colorScheme=t;}catch(e){}})();`;
