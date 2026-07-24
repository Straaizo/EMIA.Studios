import { useEffect, useState } from "react";

const QUERY = "(max-width: 767px)";

/**
 * true por debajo de 768px (breakpoint `md` de Tailwind). Para casos donde
 * la diferencia entre mobile y desktop no es solo CSS (menos partículas en
 * el hero 3D, carrusel vs. grid, drag vs. hover) y hace falta la decisión
 * también en JS. Basado en matchMedia, no en resize + innerWidth: no
 * dispara en cada pixel de resize, solo cuando se cruza el breakpoint.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
