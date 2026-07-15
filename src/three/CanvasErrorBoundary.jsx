import { Component } from "react";

/**
 * Última línea de defensa: si algo dentro del <Canvas> de R3F lanza en
 * render (no cubre errores async como la pérdida de contexto WebGL, para
 * eso está useWebGLSupport + el listener en HeroCanvas), no tumba toda la
 * página — el hero simplemente queda con su fondo oscuro + velo, sin la
 * red de nodos.
 */
export default class CanvasErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("Hero 3D deshabilitado tras un error:", error);
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}
