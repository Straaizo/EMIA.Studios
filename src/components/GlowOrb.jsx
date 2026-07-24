/**
 * Blob de luz difuminada usado como fondo decorativo en varias secciones.
 * `opacityMultiplier` ajusta la intensidad de ESTE orb puntual sin tocar
 * --glow-alpha global (que afectaría a todos los demás): 1 = normal, 0.6 =
 * 40% menos intenso, etc. Se aplica como estilo inline (opacity fija), así
 * que pisa el `opacity: var(--glow-alpha)` de la clase para esta instancia.
 */
export default function GlowOrb({ color = "#2dd9f5", className = "", opacityMultiplier }) {
  return (
    <div
      className={`glow-orb absolute rounded-full ${className}`}
      style={
        opacityMultiplier != null
          ? { background: color, opacity: `calc(var(--glow-alpha) * ${opacityMultiplier})` }
          : { background: color }
      }
      aria-hidden="true"
    />
  );
}
