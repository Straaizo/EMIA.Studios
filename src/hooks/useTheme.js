import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "emia-theme";

function getInitialTheme() {
  return document.documentElement.getAttribute("data-theme") || "dark";
}

/**
 * Lee/escribe el tema aplicado por el script anti-FOUC de index.html
 * y lo persiste en localStorage.
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
