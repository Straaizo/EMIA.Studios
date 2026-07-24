import { Suspense, useCallback, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import NodeNetwork from "./NodeNetwork";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";

// Heurística de hardware débil ANTES de renderizar el primer frame: en vez
// de arrancar siempre "full" y esperar a que el PerformanceMonitor detecte
// FPS bajo durante unos segundos (ventana en la que un equipo viejo ya
// sufrió el jank), equipos con pocos núcleos o poca RAM arrancan directo en
// menor calidad. `deviceMemory` no existe en Safari/Firefox — ahí solo se
// evalúa `hardwareConcurrency`.
function getInitialQuality() {
  if (typeof navigator === "undefined") return { dpr: 1, lite: false };
  const cores = navigator.hardwareConcurrency ?? 8;
  const memory = navigator.deviceMemory; // undefined si el navegador no lo expone
  const weak = cores <= 4 || (memory !== undefined && memory <= 4);
  return weak ? { dpr: 0.75, lite: true } : { dpr: 1, lite: false };
}

/**
 * Canvas 3D del hero. Se monta perezosamente (lazy) desde HeroSection
 * y baja de calidad automáticamente si el frame rate cae.
 *
 * `active` (controlado por HeroSection vía useInViewport) apaga el render
 * loop por completo cuando la sección no está en pantalla: es la defensa
 * principal contra la carga sostenida de GPU que puede terminar saturando
 * el navegador en sesiones largas.
 */
export default function HeroCanvas({ active = true }) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [initialQuality] = useState(getInitialQuality);
  // "lite" es hardware débil (pocos núcleos/RAM) O viewport mobile (<768px):
  // menos partículas ahí de entrada, sin esperar a que el hardware se
  // detecte lento. La interacción por mouse tampoco tiene sentido en touch
  // (no hay hover real) — NodeNetwork la desactiva pero mantiene la
  // autorrotación, así se ve vivo igual sin el jitter de eventos de touch.
  const lite = initialQuality.lite || isMobile;
  // Arranca en 1 (no en el devicePixelRatio completo) o más bajo todavía en
  // hardware/viewport débil: en pantallas retina/2x+ un dpr de 1 ya
  // multiplica por 4 la cantidad de píxeles a dibujar por frame para un
  // fondo decorativo. PerformanceMonitor puede subirlo si sobra margen.
  const [dpr, setDpr] = useState(() => (lite ? Math.min(0.75, initialQuality.dpr) : initialQuality.dpr));
  const [lost, setLost] = useState(false);
  const declinedRef = useRef(false);

  // Solo bajamos de calidad una vez por sesión: sin re-subir, evitamos que
  // el monitor oscile (bajar → mejora el FPS → sube → vuelve a bajar…),
  // que genera jank adicional además del que intenta evitar.
  const handleDecline = useCallback(() => {
    if (declinedRef.current) return;
    declinedRef.current = true;
    setDpr(0.75);
  }, []);

  // Si el contexto WebGL se pierde (driver de GPU, pestaña en segundo
  // plano en mobile, u otra app agotando los contextos disponibles) no
  // reintentamos recrearlo: eso es lo que termina en "demasiados
  // contextos" y el navegador bloqueando la creación de más. Simplemente
  // dejamos de renderizar el 3D y queda el fondo oscuro + velo.
  const handleCreated = useCallback(({ gl }) => {
    gl.domElement.addEventListener(
      "webglcontextlost",
      (e) => {
        e.preventDefault();
        setLost(true);
      },
      { once: true }
    );

    // Solo en dev: al reemplazar este módulo por HMR, forzamos la
    // liberación determinística del contexto actual antes de que la
    // siguiente versión cree uno nuevo. Sin esto, en una sesión larga
    // editando archivos, los contextos viejos pueden tardar en liberarse
    // vía GC y terminar agotando el límite del navegador.
    if (import.meta.hot) {
      import.meta.hot.dispose(() => gl.forceContextLoss());
    }
  }, []);

  if (lost) return null;

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0, 9], fov: 50 }}
      // antialias:false y powerPreference:"default" (no "high-performance"):
      // es un fondo decorativo, no necesita forzar la GPU discreta de
      // equipos híbridos ni multisampling — reduce el costo por frame y el
      // riesgo de inestabilidad del contexto en GPUs integradas/antiguas.
      gl={{ antialias: false, alpha: true, powerPreference: "default" }}
      // "never" cuando el hero no está en pantalla: cero frames dibujados,
      // cero costo de GPU, hasta que vuelva a ser visible.
      frameloop={active ? "always" : "never"}
      onCreated={handleCreated}
      className="!absolute inset-0"
    >
      <PerformanceMonitor onDecline={handleDecline} />
      <ambientLight intensity={0.4} />
      <Suspense fallback={null}>
        <NodeNetwork reducedMotion={reducedMotion} lite={lite} interactive={!isMobile} />
      </Suspense>
    </Canvas>
  );
}
