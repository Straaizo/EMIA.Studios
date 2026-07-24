import { useRef } from "react";
import { CLIENTS } from "../data/clients";
import { TESTIMONIALS } from "../data/testimonials";
import ClientCard from "../components/ClientCard";
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
 * Testimonios [PC] grid · [MÓVIL] carrusel con swipe (ver
 * TestimonialsCarousel — decisión documentada ahí). El grid de clientes NO
 * se vuelve carrusel en mobile: son 2-6 items breves (logo/nombre + 1
 * línea), un grid de 1-2 columnas ya se lee bien sin necesitar swipe —
 * reservar el carrusel para donde realmente aporta (texto largo de a uno).
 */
export default function ClientsSection() {
  const clientsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const isMobile = useIsMobile();

  useScrollReveal(clientsRef, "[data-client-card]");
  useScrollReveal(testimonialsRef, "[data-testimonial-card]");

  return (
    <section id="clientes" className="relative bg-bg-soft py-20 sm:py-28 lg:py-32">
      <GlowOrb color="#39ff9d" className="-left-16 top-16 h-56 w-56 sm:left-[-6rem] sm:top-24 sm:h-96 sm:w-96" />
      <GlowOrb color="#2dd9f5" className="-right-16 top-16 h-56 w-56 sm:right-[-6rem] sm:top-24 sm:h-96 sm:w-96" />

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

        {/* Grid de clientes: 1 columna en mobile, 2 en tablet, 3 en PC —
            funciona igual de bien con 2, 3 o 6 items en CLIENTS. */}
        <div ref={clientsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENTS.map((client) => (
            <div key={client.name} data-client-card>
              <ClientCard client={client} />
            </div>
          ))}
        </div>

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
