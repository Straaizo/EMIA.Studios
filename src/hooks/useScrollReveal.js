import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Anima con stagger los elementos que matchean `selector` dentro de
 * `containerRef` cuando entran en viewport. No-op si el usuario prefiere
 * menos movimiento.
 */
export function useScrollReveal(containerRef, selector, options = {}) {
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const targets = containerRef.current.querySelectorAll(selector);
      if (!targets.length) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y: 48, ...options.from },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          ...options.to,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            ...options.scrollTrigger,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, selector, reducedMotion]);
}
