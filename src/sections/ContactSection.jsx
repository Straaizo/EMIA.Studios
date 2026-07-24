import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlowOrb from "../components/GlowOrb";
import ContactForm from "../components/ContactForm";

/**
 * Sección de contacto real (#contacto), antes del footer. Todos los CTAs de
 * la página ("Iniciar un proyecto", "Hablemos", "Agendar una llamada")
 * apuntan acá — antes este ancla vivía en el banner de CTA final, que ahora
 * es solo el banner (ver CTASection) y no contiene un formulario de verdad.
 */
export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    // Padding vertical: [MÓVIL] py-20 · tablet: sm:py-28 · [PC] lg:py-32
    <section id="contacto" ref={ref} className="relative bg-bg py-20 sm:py-28 lg:py-32">
      <GlowOrb color="#2dd9f5" className="-left-16 top-16 h-56 w-56 sm:left-[-6rem] sm:top-24 sm:h-96 sm:w-96" />
      <GlowOrb color="#39ff9d" className="-right-16 top-16 h-56 w-56 sm:right-[-6rem] sm:top-24 sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-2xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="font-display text-xs uppercase tracking-[0.35em] text-neon-cyan/80">
            Contacto
          </span>
          {/* Título: [MÓVIL] text-3xl · tablet: sm:text-4xl · [PC] lg:text-5xl */}
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Hablemos de tu proyecto
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-text-muted sm:text-lg">
            Contanos qué estás construyendo. Te respondemos en menos de 24 horas
            con una propuesta concreta.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
