import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlowButton from "../components/GlowButton";
import GlowOrb from "../components/GlowOrb";

/**
 * Sección de CTA final (#contacto), justo antes del footer.
 * Título + párrafo + botón centrados, con dos glows de esquina detrás.
 */
export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    // Padding vertical: [MÓVIL] py-20 · tablet: sm:py-28 · [PC] lg:py-32
    <section id="contacto" ref={ref} className="relative bg-bg py-20 sm:py-28 lg:py-32">
      {/* Glows: [MÓVIL] h-56/w-56 pegados a los bordes (left-4/right-4) ·
          [PC] a partir de sm: crecen a h-96/w-96 y se abren a los cuartos
          (left-1/4 / right-1/4). */}
      <GlowOrb color="#2dd9f5" className="left-4 top-1/2 h-56 w-56 -translate-y-1/2 sm:left-1/4 sm:h-96 sm:w-96" />
      <GlowOrb color="#ff3dcb" className="right-4 top-1/2 h-56 w-56 -translate-y-1/2 sm:right-1/4 sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        {/* Título: [MÓVIL] text-3xl · tablet: sm:text-5xl · [PC] lg:text-6xl */}
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
          Contanos qué estás construyendo. Te respondemos en menos de 24 horas
          con una propuesta concreta.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 flex justify-center"
        >
          <GlowButton href="mailto:hola@emiastudios.com">
            Agendar una llamada
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}
