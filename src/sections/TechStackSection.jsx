import { TECH_STACK } from "../data/techStack";
import { useIsMobile } from "../hooks/useIsMobile";

const ACCENTS = ["#2dd9f5", "#39ff9d", "#ff8a3d", "#ff3dcb", "#4d6bff"];

/**
 * Franja delgada entre "Confían en nosotros" y "Nuestra idea": marquee
 * infinito de logos. El track se duplica una vez (mapeamos TECH_STACK dos
 * veces) y se desplaza -50% de su ancho total con CSS puro (@keyframes
 * marquee en index.css) — sin duplicar, el salto al reiniciar sería visible.
 * [MÓVIL] logos más chicos y animación más lenta (32s → 46s): al reducir el
 * tamaño, la misma velocidad angular se siente más rápida y menos legible.
 */
export default function TechStackSection() {
  const isMobile = useIsMobile();
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="relative overflow-hidden border-y border-border bg-bg-soft py-10 sm:py-12">
      <p className="mb-8 text-center font-display text-xs uppercase tracking-[0.35em] text-text-faint">
        Tecnologías que dominamos
      </p>

      {/* pointer-events sobre el track pausa TODO el marquee al pasar el
          mouse por cualquier parte de la franja (más predecible en touch/
          desktop que pausarlo solo por ítem). */}
      <div
        className="flex w-max animate-marquee gap-12 hover:[animation-play-state:paused] sm:gap-16"
        style={isMobile ? { animationDuration: "46s" } : undefined}
      >
        {items.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="group flex shrink-0 items-center gap-2.5"
            style={{ "--tech-accent": ACCENTS[i % ACCENTS.length] }}
          >
            <tech.Icon
              className="h-6 w-6 text-text-faint opacity-40 transition-all duration-300 group-hover:text-[var(--tech-accent)] group-hover:opacity-100 sm:h-8 sm:w-8"
              aria-hidden="true"
            />
            <span className="whitespace-nowrap font-display text-sm text-text-faint opacity-40 transition-opacity duration-300 group-hover:opacity-100 sm:text-base">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
