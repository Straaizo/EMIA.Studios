import { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";

const ACCENTS = ["#2dd9f5", "#39ff9d", "#ff8a3d", "#ff3dcb"];

/**
 * [MÓVIL] Carrusel deslizable de testimonios: scroll-snap nativo en vez de
 * drag con Framer Motion — elegí esto porque scroll-snap hereda gratis el
 * momentum/inercia táctil del sistema operativo y funciona con teclado y
 * trackpad sin código extra; un drag custom necesitaría reimplementar todo
 * eso a mano para sentirse igual de nativo. El tradeoff es menos control
 * visual sobre el gesto en sí, pero para "deslizar entre tarjetas" no hace
 * falta más.
 */
export default function TestimonialsCarousel({ testimonials }) {
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(Number(visible.target.dataset.index));
      },
      { root: track, threshold: 0.6 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [testimonials]);

  function scrollToIndex(i) {
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <div
            key={t.name + i}
            ref={(el) => (cardRefs.current[i] = el)}
            data-index={i}
            className="w-[85%] shrink-0 snap-center"
          >
            <TestimonialCard testimonial={t} accent={ACCENTS[i % ACCENTS.length]} />
          </div>
        ))}
      </div>

      {/* Indicadores de posición (dots). El botón tiene área táctil de 44px+
          (p-3 alrededor de un punto de 8px); el punto en sí se mantiene
          chico a propósito, es un indicador visual, no el foco principal. */}
      <div className="mt-3 flex justify-center gap-1">
        {testimonials.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Ir al testimonio ${i + 1}`}
            aria-current={active === i}
            className="flex h-11 w-11 items-center justify-center"
          >
            <span
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-6 bg-neon-cyan" : "w-2 bg-text/20"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
