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

/* Formulario de contacto: estados del botón de envío. */

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 12.5l5.5 5.5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AlertIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M12 3 2 20h20L12 3Z" strokeLinejoin="round" />
      <path d="M12 9.5v4.5M12 17h.01" strokeLinecap="round" />
    </svg>
  );
}

/* Botón flotante de WhatsApp — silueta simplificada del glifo oficial. */
export function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.02 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.43 1.27 4.87L2 22l5.28-1.24A9.96 9.96 0 0 0 12.02 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm0 18.2c-1.58 0-3.05-.44-4.3-1.2l-.31-.18-3.13.74.74-3.05-.2-.32a8.17 8.17 0 0 1-1.28-4.4c0-4.53 3.69-8.2 8.2-8.2 4.53 0 8.2 3.68 8.2 8.2 0 4.52-3.68 8.2-8.2 8.2Zm4.5-6.14c-.25-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.04 0 1.2.88 2.36 1 2.53.12.16 1.73 2.64 4.2 3.7.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.45-.59 1.66-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

/* Comilla decorativa de los testimonios. */
export function QuoteIcon(props) {
  return (
    <svg viewBox="0 0 32 24" fill="currentColor" {...props}>
      <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 3.6C9.6 5.2 7.2 8 7.2 12h6.4v12H0Zm17.6 0V14.4c0-8 4.8-13.2 12.8-14.4L32 3.6C27.2 5.2 24.8 8 24.8 12h6.4v12H17.6Z" />
    </svg>
  );
}
