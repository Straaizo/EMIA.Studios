import { QuoteIcon } from "./icons";

/**
 * Card de testimonio: comilla decorativa en el color de acento, cita,
 * y autor (nombre, cargo, empresa). `accent` varía card a card (ver
 * ClientsSection) para que el bloque completo se sienta parte de la
 * misma paleta neon que el resto del sitio, no un gris genérico.
 */
export default function TestimonialCard({ testimonial, accent }) {
  return (
    <div className="glass flex h-full flex-col rounded-2xl p-6 sm:p-7">
      <QuoteIcon className="h-8 w-8" style={{ color: accent }} />
      <p className="mt-4 flex-1 text-base leading-relaxed text-text-muted">
        {testimonial.quote}
      </p>
      <div className="mt-6 border-t border-border pt-4">
        <p className="font-display text-base font-semibold text-text">{testimonial.name}</p>
        <p className="text-sm text-text-faint">
          {testimonial.role} · {testimonial.company}
        </p>
      </div>
    </div>
  );
}
