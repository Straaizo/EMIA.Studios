/* Iconos SVG minimalistas — sin dependencia de librerías externas. */

export function CodeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M8 5 2.5 12 8 19M16 5l5.5 7-5.5 7M14 3l-4 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DeviceIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="6" y="2.5" width="12" height="19" rx="2.5" strokeLinejoin="round" />
      <path d="M11 18h2" strokeLinecap="round" />
    </svg>
  );
}

export function DatabaseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" strokeLinecap="round" />
      <path d="M4 11.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" strokeLinecap="round" />
    </svg>
  );
}

export function BrainIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M9 4.5a3 3 0 0 0-3 3v1a3 3 0 0 0-1.5 5.6A3.2 3.2 0 0 0 7 19a3 3 0 0 0 5-2.2V7.5A3 3 0 0 0 9 4.5Z"
        strokeLinejoin="round"
      />
      <path
        d="M15 4.5a3 3 0 0 1 3 3v1a3 3 0 0 1 1.5 5.6A3.2 3.2 0 0 1 17 19a3 3 0 0 1-5-2.2V7.5a3 3 0 0 1 3-3Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 12h16M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Íconos de la sección Proceso — misma familia visual que los de arriba
   (viewBox 24, strokeWidth 1.6, sin relleno, puntas redondeadas). */

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-5-5" strokeLinecap="round" />
    </svg>
  );
}

export function LayersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" strokeLinejoin="round" />
      <path d="M3 12l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 16l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TerminalIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="2.5" y="4" width="19" height="16" rx="2" strokeLinejoin="round" />
      <path d="M6.5 9l3.5 3-3.5 3M12 15h5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RocketIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path
        d="M12 2.5c3 2 4.5 5.5 4.5 9 0 2-.5 3.5-1 4.5l-3.5 3-3.5-3c-.5-1-1-2.5-1-4.5 0-3.5 1.5-7 4.5-9Z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2" />
      <path d="M8.5 15.5 6 18M15.5 15.5 18 18" strokeLinecap="round" />
    </svg>
  );
}
