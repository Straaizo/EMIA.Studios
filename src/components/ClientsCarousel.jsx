import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ClientCaseCard from "./ClientCaseCard";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";

const AUTOPLAY_MS = 5500;
const PAN_THRESHOLD = 60;

/** Distancia circular más corta entre `index` y `active` (con wraparound). */
function getOffset(index, active, length) {
  let diff = index - active;
  if (diff > length / 2) diff -= length;
  else if (diff < -length / 2) diff += length;
  return diff;
}

/**
 * Carrusel "coverflow" de casos de cliente: una card activa al frente y en
 * grande, las vecinas asomando a los costados — más chicas y tenues — y
 * todo el conjunto flotando con un balanceo sutil. Usa la misma física de
 * resorte (no easings lineales) que el resto de las interacciones
 * "premium" del sitio (ver GlowButton, ServiceCard), para que esta sección
 * no se sienta un escalón por debajo del canvas 3D del hero en cuanto a
 * nivel de producción.
 *
 * [PC] la inclinación 3D (perspective + rotateY) de las cards vecinas
 * queda completa · [MÓVIL] se omite (rotateY fijo en 0, sin perspective):
 * esa combinación con `scale` fuerza al navegador a promover cada card a
 * su propia capa GPU con un contexto 3D, y en hardware de gama media/baja
 * eso empuja a rasterizar esa capa a una resolución menor para sostener el
 * framerate — se termina viendo borroso, como video de baja calidad. Nada
 * de `filter: blur()` tampoco (ni siquiera en las cards inactivas): es de
 * las propiedades más caras de compositar y era la principal responsable
 * de ese efecto; sin ella, la escala + opacidad reducidas ya diferencian
 * bien a las cards no activas. Mismo criterio de "degradar lo caro en
 * mobile" que ya aplicamos en HeroCanvas/NodeNetwork.
 *
 * Autoplay cada 5.5s con barra de progreso (estilo "stories"), pausado
 * mientras el usuario interactúa (hover, swipe/drag) y reanudado con un
 * respiro después. Respeta prefers-reduced-motion desactivando autoplay y
 * el balanceo flotante — mismo criterio (WCAG 2.2.2) que ya aplicamos en
 * ProcessSection para el foco animado de los pasos.
 */
export default function ClientsCarousel({ clients }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const resumeTimeout = useRef(null);
  const length = clients.length;

  function goTo(i) {
    setActiveIndex(((i % length) + length) % length);
    setTick((t) => t + 1);
  }

  function pauseThenResume() {
    setPaused(true);
    clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setPaused(false), 4000);
  }

  useEffect(() => () => clearTimeout(resumeTimeout.current), []);

  // Autoplay: se reprograma solo (no incrementa un contador a mano) cada
  // vez que `paused` pasa a false, así el próximo avance siempre espera un
  // ciclo completo desde que el usuario soltó la interacción, en vez de
  // heredar el tiempo que ya llevaba corriendo el intervalo anterior.
  useEffect(() => {
    if (reducedMotion || paused || length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % length);
      setTick((t) => t + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reducedMotion, length]);

  if (length === 0) return null;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Sombra de piso: sin esto, la card "flotante" se lee como si
          estuviera pegada al fondo en vez de suspendida sobre él. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-2 mx-auto h-16 w-[55%] rounded-full opacity-60 blur-2xl sm:bottom-0 sm:h-20"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.7), transparent 70%)" }}
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto aspect-[3/4] w-[78%] max-w-[300px] sm:aspect-[16/10] sm:w-[74%] sm:max-w-xl lg:max-w-2xl"
        style={{ perspective: isMobile ? undefined : 1400, touchAction: "pan-y" }}
        animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={reducedMotion ? undefined : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        onPanStart={() => setPaused(true)}
        onPanEnd={(_, info) => {
          if (info.offset.x < -PAN_THRESHOLD) goTo(activeIndex + 1);
          else if (info.offset.x > PAN_THRESHOLD) goTo(activeIndex - 1);
          pauseThenResume();
        }}
      >
        {clients.map((client, i) => {
          const offset = getOffset(i, activeIndex, length);
          const abs = Math.abs(offset);
          const isActive = offset === 0;

          return (
            <motion.div
              key={client.name}
              className="absolute inset-0"
              style={{
                zIndex: length - abs,
                pointerEvents: abs > 1 ? "none" : "auto",
                backfaceVisibility: "hidden",
              }}
              animate={{
                x: `${offset * 78}%`,
                scale: isActive ? 1 : abs === 1 ? 0.8 : 0.62,
                opacity: isActive ? 1 : abs === 1 ? 0.5 : 0,
                rotateY: isMobile || isActive ? 0 : offset > 0 ? -16 : 16,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
              onClick={() => {
                if (!isActive && abs === 1) {
                  goTo(i);
                  pauseThenResume();
                }
              }}
              data-client-card
            >
              <ClientCaseCard client={client} />
            </motion.div>
          );
        })}
      </motion.div>

      {length > 1 && (
        <>
          <button
            type="button"
            onClick={() => {
              goTo(activeIndex - 1);
              pauseThenResume();
            }}
            aria-label="Caso anterior"
            className="glass absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-text transition-colors hover:text-neon-cyan sm:flex sm:left-2 lg:left-8"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              goTo(activeIndex + 1);
              pauseThenResume();
            }}
            aria-label="Caso siguiente"
            className="glass absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-text transition-colors hover:text-neon-cyan sm:flex sm:right-2 lg:right-8"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Barras de progreso estilo "stories": la de la card activa se
          llena en sincronía con el autoplay; en pausa (hover/drag) o con
          reduced-motion queda como un indicador fijo, sin animar. */}
      <div className="relative z-20 mt-6 flex justify-center gap-2">
        {clients.map((client, i) => (
          <button
            key={client.name}
            type="button"
            onClick={() => {
              goTo(i);
              pauseThenResume();
            }}
            aria-label={`Ir al caso ${i + 1}`}
            aria-current={activeIndex === i}
            className="relative flex h-8 w-9 items-center justify-center sm:h-9"
          >
            <span className="relative h-1 w-8 overflow-hidden rounded-full bg-white/15 sm:w-9">
              {activeIndex === i && (
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-neon-cyan/40"
                  style={{ width: "100%" }}
                />
              )}
              {activeIndex === i && !paused && !reducedMotion && (
                <motion.span
                  key={tick}
                  className="absolute inset-y-0 left-0 rounded-full bg-neon-cyan"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
