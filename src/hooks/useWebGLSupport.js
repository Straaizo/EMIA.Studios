import { useEffect, useState } from "react";

/**
 * Prueba sincrónicamente si el navegador puede crear un contexto WebGL
 * en este momento. Devuelve false tanto si WebGL no está soportado como
 * si la creación fue bloqueada (p. ej. demasiados contextos ya abiertos
 * en la pestaña), evitando así intentar montar el <Canvas> de R3F en un
 * estado que terminaría en una promesa rechazada sin capturar.
 */
function canCreateWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    const ok = !!gl;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return ok;
  } catch {
    return false;
  }
}

export function useWebGLSupport() {
  const [supported, setSupported] = useState(null);

  useEffect(() => {
    setSupported(canCreateWebGL());
  }, []);

  return supported;
}
