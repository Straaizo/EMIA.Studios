import { Suspense, lazy, useRef } from "react";
import { motion } from "framer-motion";
import AnimatedTitle from "../components/AnimatedTitle";
import GlowButton from "../components/GlowButton";
import ScrollIndicator from "../components/ScrollIndicator";
import CanvasErrorBoundary from "../three/CanvasErrorBoundary";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useWebGLSupport } from "../hooks/useWebGLSupport";
import { useInViewport } from "../hooks/useInViewport";

/**
 * Sección Hero (#top), la primera de la página.
 * Fondo 3D de nodos conectados (React Three Fiber) + título animado letra
 * por letra + CTAs. El canvas 3D se carga perezosamente: no bloquea el
 * first paint del hero.
 */
const HeroCanvas = lazy(() => import("../three/HeroCanvas"));

export default function HeroSection() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const webglSupported = useWebGLSupport();
  // Con esto el render loop del 3D se detiene por completo apenas el hero
  // sale de pantalla (ver useInViewport) — evita que WebGL siga dibujando
  // en segundo plano el resto de la sesión y termine saturando el navegador.
  const heroVisible = useInViewport(sectionRef);

  return (
    // El hero es siempre oscuro (aloja el fondo 3D de neón): no participa del tema claro/oscuro.
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0f]"
    >
      <div className="absolute inset-0">
        {!reducedMotion && webglSupported === true && (
          <CanvasErrorBoundary>
            <Suspense fallback={null}>
              <HeroCanvas active={heroVisible} />
            </Suspense>
          </CanvasErrorBoundary>
        )}
      </div>

      {/* Ver .hero-veil en index.css: funde el canvas 3D hacia var(--bg) sin
          crear un borde duro perceptible, y se adapta al tema activo. */}
      <div className="hero-veil pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 font-display text-xs uppercase tracking-[0.35em] text-neon-cyan/80"
        >
          Software · Web · Tecnología
        </motion.p>

        {/* Título: [MÓVIL] tamaño fluido con clamp() — escala con el ancho
            de pantalla para que ninguna palabra se desborde en teléfonos
            angostos · tablet: sm:text-6xl · [PC] lg:text-7xl */}
        <AnimatedTitle
          text="Transformamos ideas en soluciones digitales"
          className="max-w-4xl font-display text-[clamp(1.9rem,8.5vw,3rem)] font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mt-8 max-w-xl text-lg text-white/60"
        >
          Diseñamos, construimos y escalamos productos digitales con
          ingeniería de nivel senior — de la idea al despliegue en producción.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-5"
        >
          <GlowButton href="#contacto">Iniciar un proyecto</GlowButton>
          <GlowButton href="#servicios" variant="ghost">
            Ver servicios
          </GlowButton>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
