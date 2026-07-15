import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Título con animación de entrada letra por letra vía GSAP stagger.
 * Split manual (sin el plugin SplitText, que requiere licencia Club GreenSock).
 */
export default function AnimatedTitle({ text, as: Tag = "h1", className = "" }) {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  useLayoutEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const letters = containerRef.current.querySelectorAll(".letter");
      gsap.fromTo(
        letters,
        { yPercent: 120, opacity: 0, rotateZ: 6 },
        {
          yPercent: 0,
          opacity: 1,
          rotateZ: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.02,
          delay: 0.3,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <Tag ref={containerRef} className={className}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((letter, li) => (
            <span key={li} className="split-line inline-block">
              <span className="letter inline-block">{letter}</span>
            </span>
          ))}
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
