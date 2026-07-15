/**
 * Placeholder del logo: red de nodos conectados en SVG.
 * Reemplazar por el archivo definitivo del usuario (ver src/assets/).
 */
export default function Logo({ className = "h-9 w-9" }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2dd9f5" />
          <stop offset="50%" stopColor="#4d6bff" />
          <stop offset="100%" stopColor="#ff3dcb" />
        </linearGradient>
      </defs>
      <g stroke="url(#logoGradient)" strokeWidth="1.4" opacity="0.9">
        <line x1="8" y1="10" x2="20" y2="6" />
        <line x1="20" y1="6" x2="32" y2="12" />
        <line x1="8" y1="10" x2="10" y2="26" />
        <line x1="32" y1="12" x2="30" y2="28" />
        <line x1="10" y1="26" x2="20" y2="34" />
        <line x1="30" y1="28" x2="20" y2="34" />
        <line x1="20" y1="6" x2="20" y2="20" />
        <line x1="10" y1="26" x2="20" y2="20" />
        <line x1="30" y1="28" x2="20" y2="20" />
      </g>
      <g fill="url(#logoGradient)">
        <circle cx="8" cy="10" r="2.6" />
        <circle cx="20" cy="6" r="2.6" />
        <circle cx="32" cy="12" r="2.6" />
        <circle cx="10" cy="26" r="2.6" />
        <circle cx="30" cy="28" r="2.6" />
        <circle cx="20" cy="34" r="2.6" />
        <circle cx="20" cy="20" r="3.2" />
      </g>
    </svg>
  );
}
