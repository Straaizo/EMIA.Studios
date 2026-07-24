import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WhatsAppIcon } from "./icons";
import { WHATSAPP_LINK } from "../config/contact";
import { useIsMobile } from "../hooks/useIsMobile";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Botón flotante fijo, abajo a la derecha. Aparece recién después de pasar
 * el hero (no antes: ahí ya hay dos CTAs, un tercer botón flotante sería
 * ruido sobre el primer impacto visual de la página).
 * [MÓVIL] un poco más chico y sin tooltip (no existe hover en touch).
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          // z-40: por debajo del navbar/menú móvil (z-50) pero por encima
          // del resto del contenido, footer incluido en mobile.
          className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7"
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          {!isMobile && (
            <AnimatePresence>
              {hovered && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  className="glass absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 text-sm text-text"
                >
                  Escríbenos
                </motion.span>
              )}
            </AnimatePresence>
          )}

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribinos por WhatsApp"
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:h-16 sm:w-16"
            style={{ boxShadow: "0 0 24px rgba(37,211,102,0.45), 0 4px 20px rgba(0,0,0,0.35)" }}
          >
            <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
