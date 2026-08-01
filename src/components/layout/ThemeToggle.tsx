import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light palette" : "Switch to dark palette"}
      title={isDark ? "Cream palette" : "Ink palette"}
      className="edge-frame relative inline-flex items-center justify-center size-9 rounded-full bg-cream/70 text-ink hover:bg-paper transition-colors overflow-hidden"
    >
      <motion.span
        key={theme}
        initial={{ y: 14, opacity: 0, rotate: -30 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex"
      >
        {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
      </motion.span>
    </button>
  );
}
