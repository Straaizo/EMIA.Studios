import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sección "Proceso / Cómo ayudamos" (#proceso).
 * Timeline vertical: una línea SVG se va dibujando con el scroll (GSAP +
 * ScrollTrigger) detrás de 4 marcadores circulares, uno por paso. Cada paso
 * también tiene un glow ambiental a un costado (alternando izquierda/
 * derecha) que aparece con scroll junto con su texto — ver `side` abajo.
 */
const STEPS = [
  {
    number: "01",
    title: "Descubrimiento",
    description: "Entendemos tu negocio, usuarios y objetivos técnicos antes de escribir una línea de código.",
    accent: "#2dd9f5",
    side: "left",
  },
  {
    number: "02",
    title: "Diseño & Arquitectura",
    description: "Definimos la arquitectura del sistema y la experiencia de producto en conjunto con tu equipo.",
    accent: "#39ff9d",
    side: "right",
  },
  {
    number: "03",
    title: "Desarrollo",
    description: "Construcción iterativa con entregas frecuentes, testing continuo y visibilidad total del avance.",
    accent: "#ff8a3d",
    side: "left",
  },
  {
    number: "04",
    title: "Lanzamiento & Soporte",
    description: "Desplegamos a producción y acompañamos la evolución del producto en el tiempo.",
    accent: "#ff3dcb",
    side: "right",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const stepRefs = useRef([]);
  const orbRefs = useRef([]);
  // [PC] "Banda" vertical exclusiva de cada paso (top/height en px, medidos
  // contra la posición real de cada <li>, no estimados). El glow de un paso
  // se clipea (overflow-hidden) a su propia banda, que llega hasta el punto
  // medio con el paso anterior/siguiente — así nunca se mete en el "rectángulo"
  // del paso vecino, aunque el blur sea grande.
  const [orbBands, setOrbBands] = useState([]);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    function measure() {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.getBoundingClientRect().height;

      const rects = stepRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: r.top - sectionTop, bottom: r.bottom - sectionTop };
      });

      setOrbBands(
        rects.map((r, i) => {
          if (!r) return { top: 0, height: 0 };
          const prev = rects[i - 1];
          const next = rects[i + 1];
          const bandTop = prev ? (prev.bottom + r.top) / 2 : 0;
          const bandBottom = next ? (r.bottom + next.top) / 2 : sectionHeight;
          return { top: bandTop, height: Math.max(0, bandBottom - bandTop) };
        })
      );
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

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

      stepRefs.current.forEach((el, i) => {
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

        // El glow lateral de este paso aparece junto con su texto (mismo
        // trigger). Solo se anima la opacidad del wrapper — el glow en sí
        // mantiene su opacidad de tema (--glow-alpha) vía la clase
        // .glow-orb del hijo, sin que GSAP la pise.
        const orb = orbRefs.current[i];
        if (orb) {
          gsap.fromTo(
            orb,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 78%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    // Padding vertical: [MÓVIL] py-20 · tablet: sm:py-28 · [PC] lg:py-32
    <section id="proceso" ref={sectionRef} className="relative bg-bg py-20 sm:py-28 lg:py-32">
      {/* [PC] Glow por paso, oculto en móvil/tablet (hidden lg:block): no
          hay espacio lateral ("gutter") suficiente hasta que el contenido
          deja de ocupar todo el ancho. Alternan lado según STEPS[i].side y
          aparecen con scroll junto a su texto (ver ScrollTrigger arriba).
          Cada uno va clipeado (overflow-hidden) a su propia banda vertical
          (orbBands[i]) para que no se mezcle visualmente con el paso de
          arriba/abajo — antes, al ser un blur grande sin límites, invadía
          el "rectángulo" del vecino y se veía disperso/desordenado. */}
      {STEPS.map((step, i) => {
        const band = orbBands[i] ?? { top: 0, height: 0 };
        // Máscara con fade arriba/abajo: contiene el glow dentro de su
        // banda (igual que overflow-hidden) pero sin el corte recto — se
        // apaga gradualmente en vez de terminar en un borde duro y visible.
        const fadeMask =
          "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)";
        return (
          <div
            key={step.number}
            className={`pointer-events-none absolute hidden overflow-hidden lg:block ${
              step.side === "left" ? "left-0" : "right-0"
            }`}
            style={{
              top: band.top,
              height: band.height,
              width: "16rem",
              maskImage: fadeMask,
              WebkitMaskImage: fadeMask,
            }}
          >
            <div
              ref={(el) => (orbRefs.current[i] = el)}
              className="absolute top-1/2 h-56 w-56 -translate-y-1/2 opacity-0"
              style={{ [step.side]: "-3.5rem" }}
            >
              <div className="glow-orb h-full w-full rounded-full" style={{ background: step.accent }} />
            </div>
          </div>
        );
      })}

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

          <ol className="relative flex flex-col gap-10 sm:gap-16">
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
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
