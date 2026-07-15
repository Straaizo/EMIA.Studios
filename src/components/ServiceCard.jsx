import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import GlowOrb from "./GlowOrb";

// [MÓVIL] Posición del glow ambiental de cada card: alterna izquierda/derecha
// card a card (índice par = izquierda, impar = derecha), como un zigzag.
// Este efecto es exclusivo de mobile/tablet: en PC se oculta (ver `lg:hidden`
// más abajo), porque con las 4 cards visibles en una sola fila al mismo
// tiempo, 4 glows de colores distintos compiten entre sí y se ve recargado.
const GLOW_POSITIONS = ["-left-12 bottom-2", "-right-12 bottom-2"];

/**
 * Card de servicio con glassmorphism, tilt 3D siguiendo el mouse y glow
 * del color de acento asignado.
 */
export default function ServiceCard({ icon: Icon, title, description, accent, index = 0 }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springConfig);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      data-service-card
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group relative h-full"
    >
      {/* [MÓVIL] Glow ambiental persistente por card (no solo al hover):
          desborda la card a propósito. Oculto en PC con `lg:hidden` — ver
          nota en GLOW_POSITIONS. */}
      <GlowOrb
        color={accent}
        className={`-z-10 h-48 w-48 lg:hidden ${GLOW_POSITIONS[index % GLOW_POSITIONS.length]}`}
      />

      {/* h-full + flex-col: todas las cards de una fila quedan con la misma
          altura (la más alta manda), sin importar cuánto texto tenga cada
          una — el grid ya estira los items por defecto, esto hace que la
          card visible (`.glass`) también ocupe ese alto completo. */}
      <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl p-8">
        {/* [PC] Glow que solo aparece al pasar el mouse (hover real, por eso
            va únicamente en desktop) — reemplaza al glow persistente de mobile. */}
        <div
          className="pointer-events-none absolute -inset-24 hidden opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30 lg:block"
          style={{ background: accent }}
          aria-hidden="true"
        />

        <div
          className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border"
          style={{ background: `${accent}1a`, color: accent }}
        >
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="relative font-display text-xl font-semibold text-text">
          {title}
        </h3>
        <p className="relative mt-3 text-base leading-relaxed text-text-muted">
          {description}
        </p>

        <div
          className="absolute inset-x-0 bottom-0 h-px opacity-60"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}
