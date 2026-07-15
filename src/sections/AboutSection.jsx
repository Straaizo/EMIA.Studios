import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

/**
 * Sección "Nosotros / Nuestra idea" (#nosotros).
 * Texto que se revela línea por línea al hacer scroll. A diferencia de
 * Servicios/CTA, esta sección va sin glows de color de fondo — es el
 * respiro "calmo" entre dos bloques más cargados de color. El único acento
 * es el subrayado en gradiente de "Reimaginando".
 * Mismo fondo (bg-bg) que el resto de las secciones para no generar una
 * costura de color al pasar de una a otra.
 */
const LINES = [
  "Creemos que la tecnología debería adaptarse a como trabajas,",
  "no al revés. Por eso diseñamos herramientas que desaparecen",
  "en el flujo de trabajo, en lugar de interrumpirlo.",
];

export default function AboutSection() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef, "[data-reveal-line]", {
    from: { y: 60, skewY: 3 },
    to: { skewY: 0, stagger: 0.18 },
  });

  return (
    // Padding: [MÓVIL] py-20 (simétrico) · tablet: sm:py-28 · [PC] arriba
    // baja a lg:pt-16 (ver mismo cambio, espejado, en ServicesSection) para
    // que ambas secciones queden más juntas en desktop; abajo se mantiene
    // lg:pb-32 para no comprimir el espacio antes de "Cómo ayudamos".
    <section id="nosotros" className="relative bg-bg py-20 sm:py-28 lg:pb-32 lg:pt-16">
      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <span className="font-display text-xs uppercase tracking-[0.35em] text-text-faint">
          Nuestra idea
        </span>

        {/* Título: [MÓVIL] text-2xl · tablet: sm:text-4xl · [PC] lg:text-5xl.
            Solo "Reimaginando" lleva el gradiente + una línea también en
            gradiente debajo, como acento puntual — el resto del título va
            en el color de texto normal de la sección. */}
        <h2 className="mx-auto mt-8 max-w-4xl font-display text-2xl font-medium leading-tight tracking-tight text-text sm:mt-10 sm:text-4xl lg:text-5xl">
          <span className="relative inline-block">
            <span className="text-gradient">Reimaginando</span>
            <span
              className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full sm:-bottom-1.5 sm:h-1"
              style={{ background: "linear-gradient(90deg, #2dd9f5, #4d6bff, #ff3dcb)" }}
              aria-hidden="true"
            />
          </span>{" "}
          tus herramientas de trabajo.
        </h2>

        {/* Párrafos: [MÓVIL] text-lg · tablet: sm:text-xl · [PC] lg:text-2xl */}
        <div ref={containerRef} className="mx-auto mt-8 max-w-3xl sm:mt-10">
          {LINES.map((line) => (
            <div key={line} className="split-line">
              <p data-reveal-line className="text-lg leading-relaxed text-text-muted sm:text-xl lg:text-2xl">
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
