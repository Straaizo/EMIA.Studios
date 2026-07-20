import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { SearchIcon, LayersIcon, TerminalIcon, RocketIcon } from "../components/icons";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sección "Proceso / Cómo ayudamos" (#proceso).
 * Timeline vertical: una línea SVG se va dibujando con el scroll (GSAP +
 * ScrollTrigger) detrás de 4 marcadores circulares, uno por paso. [PC] Cada
 * paso suma un ícono grande a la derecha del texto (oculto en móvil/tablet,
 * donde no sobra ancho): un solo ScrollTrigger scrubeado recorre los 4 en
 * orden estricto 01→02→03→04, encendiendo uno a la vez según la posición
 * del scroll (nunca dos a la vez, nunca fuera de orden).
 */
const STEPS = [
  {
    number: "01",
    title: "Descubrimiento",
    description: "Entendemos tu negocio, usuarios y objetivos técnicos antes de escribir una línea de código.",
    accent: "#2dd9f5",
    icon: SearchIcon,
  },
  {
    number: "02",
    title: "Diseño & Arquitectura",
    description: "Definimos la arquitectura del sistema y la experiencia de producto en conjunto con tu equipo.",
    accent: "#39ff9d",
    icon: LayersIcon,
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Construcción iterativa con entregas frecuentes, testing continuo y visibilidad total del avance.",
    accent: "#ff8a3d",
    icon: TerminalIcon,
  },
  {
    number: "04",
    title: "Lanzamiento & Soporte",
    description: "Desplegamos a producción y acompañamos la evolución del producto en el tiempo.",
    accent: "#ff3dcb",
    icon: RocketIcon,
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const stepRefs = useRef([]);
  const iconRefs = useRef([]);
  const stepsListRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current || !pathRef.current) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      stepRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
            },
          }
        );
      });

      // Un solo "foco" recorriendo los íconos en orden estricto 01→02→03→04,
      // atado 1:1 al scroll (scrub, no un loop automático de fondo): solo el
      // ícono del paso que corresponde a la posición actual del scroll está
      // "encendido"; los demás quedan tenues. Dos razones para este cambio
      // frente al latido anterior (que cada ícono encendía por su cuenta):
      // 1) con varios pasos visibles a la vez, 2-3 íconos latiendo juntos
      //    competían por la atención y se perdía la lectura 1-2-3-4;
      // 2) una animación que se repite sola indefinidamente en background,
      //    sin que el usuario la controle, va contra buenas prácticas de
      //    accesibilidad (WCAG 2.2.2, "Pause, Stop, Hide") — al atarla al
      //    scroll, se mueve (y retrocede) solo cuando el usuario scrollea.
      const icons = iconRefs.current;
      if (icons.some(Boolean) && stepsListRef.current) {
        ScrollTrigger.create({
          trigger: stepsListRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.4,
          onUpdate: (self) => {
            const active = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
            icons.forEach((icon, idx) => {
              if (!icon) return;
              const isActive = idx === active;
              gsap.to(icon, {
                scale: isActive ? 1.15 : 1,
                opacity: isActive ? 0.85 : 0.32,
                filter: `drop-shadow(0 0 ${isActive ? 26 : 8}px ${STEPS[idx].accent})`,
                duration: 0.45,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    // Padding vertical: [MÓVIL] py-20 · tablet: sm:py-28 · [PC] lg:py-32
    <section id="proceso" ref={sectionRef} className="relative bg-bg py-20 sm:py-28 lg:py-32">
      <div className="relative mx-auto max-w-5xl px-6 md:px-10">
        <div className="mb-14 max-w-2xl sm:mb-20">
          <span className="font-display text-xs uppercase tracking-[0.35em] text-neon-orange/80">
            Cómo ayudamos
          </span>
          {/* Título: [MÓVIL] text-3xl · tablet: sm:text-4xl · [PC] lg:text-5xl */}
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl lg:text-5xl">
            Un proceso claro, de punta a punta
          </h2>
        </div>

        <div className="relative">
          {/*
            Línea que se dibuja al hacer scroll. left-2 [MÓVIL] / md:left-4 [PC]
            centran el trazo (ancho 16px, centro en x=8 del viewBox) exactamente
            con el centro de los marcadores: 32px de diámetro en [MÓVIL] (centro
            16px) y 48px en [PC] (centro 24px) — ver los mismos breakpoints en
            los marcadores <span> más abajo (h-8/w-8 → md:h-12/w-12).
          */}
          <svg
            className="absolute left-2 top-2 h-full w-4 md:left-4"
            width="16"
            viewBox="0 0 16 100"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 0 V100"
              stroke="var(--border)"
              strokeWidth="2"
            />
            <path
              ref={pathRef}
              d="M8 0 V100"
              stroke="url(#processGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="processGradient" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2dd9f5" />
                <stop offset="35%" stopColor="#39ff9d" />
                <stop offset="70%" stopColor="#ff8a3d" />
                <stop offset="100%" stopColor="#ff3dcb" />
              </linearGradient>
            </defs>
          </svg>

          <ol ref={stepsListRef} className="relative flex flex-col gap-10 sm:gap-16">
            {STEPS.map((step, i) => (
              <li
                key={step.number}
                ref={(el) => (stepRefs.current[i] = el)}
                className="relative pl-16 md:pl-24"
              >
                {/* Marcador: [MÓVIL] h-8/w-8 (32px) · [PC] md:h-12/w-12 (48px) */}
                <span
                  className="absolute left-0 top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 md:h-12 md:w-12"
                  style={{ borderColor: step.accent, boxShadow: `0 0 20px ${step.accent}55` }}
                >
                  <span
                    className="h-2 w-2 rounded-full md:h-2.5 md:w-2.5"
                    style={{ background: step.accent }}
                  />
                </span>

                <span
                  className="font-display text-sm font-medium tracking-wide"
                  style={{ color: step.accent }}
                >
                  {step.number}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-text">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-lg text-base text-text-muted">{step.description}</p>

                {/* [PC] Ícono grande en el espacio libre a la derecha del
                    texto (max-w-lg deja bastante aire en pantallas anchas).
                    Trazo fino en el color del paso. opacity-[0.35] es su
                    estado de reposo Y el fallback si prefers-reduced-motion
                    está activo (sin JS, todos quedan igual de tenues, sin
                    "foco" — no hay forma neutral de elegir uno sin scroll).
                    Con animación habilitada, el ScrollTrigger de más arriba
                    controla la opacidad/escala/glow real: solo el ícono del
                    paso activo según el scroll brilla fuerte, en secuencia
                    01→02→03→04. El ícono en sí es un componente función (sin
                    forwardRef), así que el ref para GSAP va en este <span>
                    contenedor — pasarle `ref` directo al ícono se perdería
                    en silencio. */}
                <span
                  ref={(el) => (iconRefs.current[i] = el)}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-1/2 hidden h-16 w-16 -translate-y-1/2 opacity-[0.35] lg:block xl:h-20 xl:w-20"
                  style={{ color: step.accent }}
                >
                  <step.icon className="h-full w-full" />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
