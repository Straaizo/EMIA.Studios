import { useRef } from "react";
import { CLIENTS } from "../data/clients";
import { TESTIMONIALS } from "../data/testimonials";
import ClientsCarousel from "../components/ClientsCarousel";
import TestimonialCard from "../components/TestimonialCard";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import GlowOrb from "../components/GlowOrb";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useIsMobile } from "../hooks/useIsMobile";

const ACCENTS = ["#2dd9f5", "#39ff9d", "#ff8a3d", "#ff3dcb"];

/**
 * "Confían en nosotros" (#clientes) — prueba social, justo después de
 * Servicios: es la sección de mayor prioridad visual después del hero (la
 * que convierte visitantes en leads), así que va antes que el stack técnico.
 *
 * Clientes: carrusel de casos (ver ClientsCarousel) — mismo componente en
 * mobile y desktop, solo cambia cuántas cards se alcanzan a ver a la vez.
 * Testimonios [PC] grid · [MÓVIL] carrusel con swipe (ver
 * TestimonialsCarousel — decisión documentada ahí).
 */
export default function ClientsSection() {
  const testimonialsRef = useRef(null);
  const isMobile = useIsMobile();

  useScrollReveal(testimonialsRef, "[data-testimonial-card]");

  return (
    <section id="clientes" className="relative overflow-hidden bg-bg-soft py-20 sm:py-28 lg:py-32">
      <GlowOrb color="#39ff9d" className="-left-16 top-16 h-56 w-56 sm:left-[-6rem] sm:top-24 sm:h-96 sm:w-96" />
      <GlowOrb color="#2dd9f5" className="-right-16 top-16 h-56 w-56 sm:right-[-6rem] sm:top-24 sm:h-96 sm:w-96" />

      {/* Esta sección cambia de tono (bg-bg-soft) justo donde arrancan sus
          glows: sin este velo, ese cambio de tono + el brillo de los glows
          juntos se leían como un bloque de color que empieza de golpe justo
          en el límite con "Servicios" (que no tiene glow cerca de su borde
          inferior, así que el contraste era asimétrico). Atenúa el tramo
          superior fundiéndolo hacia el mismo tono de la sección anterior. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-40"
        style={{ background: "linear-gradient(to bottom, var(--bg), transparent)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <span className="font-display text-xs uppercase tracking-[0.35em] text-neon-green/80">
            Confían en nosotros
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Equipos que ya construyeron con EMIA
          </h2>
          <p className="mt-5 text-base text-text-muted sm:text-lg">
            Proyectos reales, entregados de punta a punta.
          </p>
        </div>

        <ClientsCarousel clients={CLIENTS} />

        {/* Testimonios */}
        <div className="mt-16 sm:mt-20">
          <h3 className="text-center font-display text-xl font-semibold text-text sm:text-2xl">
            Lo que dicen de trabajar con nosotros
          </h3>

          {isMobile ? (
            <div className="mt-8">
              <TestimonialsCarousel testimonials={TESTIMONIALS} />
            </div>
          ) : (
            <div ref={testimonialsRef} className="mt-8 grid gap-6 md:grid-cols-3">
              {TESTIMONIALS.map((t, i) => (
                <div key={t.name + i} data-testimonial-card>
                  <TestimonialCard testimonial={t} accent={ACCENTS[i % ACCENTS.length]} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
