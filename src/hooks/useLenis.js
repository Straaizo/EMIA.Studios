import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sincroniza Lenis (smooth scroll) con el ticker de GSAP y ScrollTrigger.
 * Respeta prefers-reduced-motion desactivando el scroll suave.
 */
export function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Cada sección calcula sus propios ScrollTrigger en el mount inicial,
    // pero eso pasa ANTES de que las webfonts (carga async, display=swap)
    // terminen de entrar — si el swap cambia alturas de texto, las
    // posiciones de trigger calculadas de entrada quedan desactualizadas.
    // Un refresh cuando la página + fuentes están 100% listas corrige eso
    // sin tener que tocar cada sección individualmente.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener("load", refresh);
    };
  }, []);
}
