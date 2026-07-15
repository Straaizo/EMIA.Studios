import { useRef } from "react";
import ServiceCard from "../components/ServiceCard";
import GlowOrb from "../components/GlowOrb";
import { CodeIcon, DeviceIcon, DatabaseIcon, BrainIcon } from "../components/icons";
import { useScrollReveal } from "../hooks/useScrollReveal";

const SERVICES = [
  {
    icon: CodeIcon,
    title: "Desarrollo Web a Medida",
    description:
      "Plataformas y productos web construidos desde cero, con arquitecturas escalables y foco en performance.",
    accent: "#2dd9f5",
  },
  {
    icon: DeviceIcon,
    title: "Apps Móviles Nativas",
    description:
      "Aplicaciones iOS y Android con experiencia fluida, integradas a tus sistemas existentes.",
    accent: "#39ff9d",
  },
  {
    icon: DatabaseIcon,
    title: "Infraestructura de Datos",
    description:
      "Pipelines, bases de datos y arquitecturas cloud diseñadas para crecer con tu operación.",
    accent: "#ff8a3d",
  },
  {
    icon: BrainIcon,
    title: "Inteligencia de Negocio y IA",
    description:
      "Dashboards, analítica avanzada y modelos de IA aplicados a decisiones reales de negocio.",
    accent: "#ff3dcb",
  },
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  useScrollReveal(containerRef, "[data-service-card]");

  return (
    // Padding: [MÓVIL] py-20 (simétrico) · tablet: sm:py-28 · [PC] arriba se
    // mantiene lg:pt-32, pero abajo baja a lg:pb-16 — así esta sección y
    // "Nuestra idea" quedan más cerca entre sí en desktop y se leen como un
    // bloque continuo en vez de dos secciones separadas por un vacío grande.
    <section id="servicios" className="relative bg-bg py-20 sm:py-28 lg:pb-16 lg:pt-32">
      {/* Glows de la sección: mismo anclaje desde arriba (top-16/sm:top-24)
          en los dos, para que azul y magenta queden a la misma altura — el
          azul ya estaba bien así; el magenta antes se anclaba desde abajo
          (bottom-16/sm:bottom-24) y por eso quedaba más bajo, descuadrado.
          [MÓVIL] tamaño reducido (h-56/w-56) para no desbordar la pantalla ·
          [PC] a partir de sm: crecen a h-96/w-96. En PC son la ÚNICA fuente
          de color ambiental de esta sección (ver `lg:hidden` en ServiceCard
          para el glow por card). */}
      <GlowOrb color="#4d6bff" className="-left-16 top-16 h-56 w-56 sm:left-[-6rem] sm:top-24 sm:h-96 sm:w-96" />
      <GlowOrb color="#ff3dcb" className="-right-16 top-16 h-56 w-56 sm:right-[-6rem] sm:top-24 sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-12 max-w-2xl sm:mb-16">
          <span className="font-display text-xs uppercase tracking-[0.35em] text-neon-cyan/80">
            Servicios
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Todo lo que tu producto necesita
          </h2>
          <p className="mt-5 text-base text-text-muted sm:text-lg">
            Un equipo senior cubriendo cada capa: producto, ingeniería, datos
            e inteligencia artificial.
          </p>
        </div>

        {/* @container: el grid responde al ancho de su propio contenedor, no
            solo al viewport. [MÓVIL] 1 columna · @sm 2 columnas (tablet) ·
            @4xl 4 columnas ([PC], fila completa con las 4 cards). */}
        <div className="@container">
          <div ref={containerRef} className="grid gap-6 @sm:grid-cols-2 @4xl:grid-cols-4">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
