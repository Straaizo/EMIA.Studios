import { useEffect, useState } from "react";

/**
 * true mientras el elemento referenciado esté (parcialmente) visible en el
 * viewport. Se usa para pausar por completo el render loop del canvas 3D
 * del hero apenas el usuario hace scroll y deja de verlo: sin esto, WebGL
 * sigue dibujando 60 veces por segundo para siempre mientras la pestaña
 * esté abierta, aunque la sección ya no esté en pantalla — eso es carga de
 * GPU sostenida e innecesaria durante toda la sesión.
 */
export function useInViewport(ref) {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
