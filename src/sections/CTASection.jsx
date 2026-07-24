import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlowButton from "../components/GlowButton";
import GlowOrb from "../components/GlowOrb";

/**
 * Banner de CTA, justo antes de #contacto (ver ContactSection). Ya no es el
 * ancla de contacto en sí (antes tenía id="contacto" y un botón mailto) —
 * ahora es un empujón visual que hace scroll al formulario real, así que su
 * copy es más corto/directo para no repetir el mensaje de esa sección.
 */
export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    // Padding vertical: [MÓVIL] py-20 · tablet: sm:py-28 · [PC] lg:py-32
    <section ref={ref} className="relative bg-bg py-20 sm:py-28 lg:py-32">
      {/* Glows: [MÓVIL] h-56/w-56 pegados a los bordes (left-4/right-4) ·
          [PC] a partir de sm: crecen a h-96/w-96 y se abren a los cuartos
          (left-1/4 / right-1/4). El magenta va a ~60% de su intensidad
          normal (opacityMultiplier): a full competía demasiado con el
          título, que ya usa magenta en el gradiente de "tu flujo de trabajo". */}
      <GlowOrb color="#2dd9f5" className="left-4 top-1/2 h-56 w-56 -translate-y-1/2 sm:left-1/4 sm:h-96 sm:w-96" />
      <GlowOrb
        color="#ff3dcb"
        opacityMultiplier={0.6}
        className="right-4 top-1/2 h-56 w-56 -translate-y-1/2 sm:right-1/4 sm:h-96 sm:w-96"
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        {/* Título: [MÓVIL] text-3xl · tablet: sm:text-5xl · [PC] lg:text-6xl.
            Texto en blanco (text-text, que en el tema dark-only es #ecedf5);
            el gradiente queda solo en "tu flujo de trabajo". */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl font-semibold tracking-tight text-text sm:text-5xl lg:text-6xl"
        >
          ¿Listo para evolucionar{" "}
          <span className="text-gradient">tu flujo de trabajo</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg text-text-muted"
        >
          Sin vueltas: contanos tu idea y te armamos un plan concreto.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 flex justify-center"
        >
          <GlowButton href="#contacto">Agendar una llamada</GlowButton>
        </motion.div>
      </div>
    </section>
  );
}
