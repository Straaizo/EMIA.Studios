/**
 * Blob de luz difuminada usado como fondo decorativo en varias secciones.
 */
export default function GlowOrb({ color = "#2dd9f5", className = "" }) {
  return (
    <div
      className={`glow-orb absolute rounded-full ${className}`}
      style={{ background: color }}
      aria-hidden="true"
    />
  );
}
