import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle({ className = "", onDark = false }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // onDark: fuerza estilo claro-sobre-oscuro (usado en el navbar mientras
  // flota transparente sobre el hero, que siempre es oscuro). Sin onDark,
  // usa los tokens de tema normales.
  const colors = onDark
    ? "border-white/15 text-white hover:bg-white/5"
    : "border-border text-text hover:bg-text/5";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      aria-pressed={isDark}
      className={`relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${colors} ${className}`}
    >
      <motion.svg
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className="h-5 w-5"
      >
        {isDark ? (
          <path
            d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <>
            <circle cx="12" cy="12" r="4.2" />
            <path
              d="M12 2.5v2M12 19.5v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2.5 12h2M19.5 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
              strokeLinecap="round"
            />
          </>
        )}
      </motion.svg>
    </button>
  );
}
