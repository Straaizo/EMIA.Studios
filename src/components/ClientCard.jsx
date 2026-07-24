/**
 * Card de un cliente en el grid de "Confían en nosotros". Sin logo (todavía
 * son placeholders), muestra el nombre en tipografía grande sobre un
 * gradiente sutil — pensado para verse igual de bien que con logo real,
 * no como un estado vacío/roto.
 */
export default function ClientCard({ client }) {
  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-2xl p-6">
      <div className="flex h-20 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-text/[0.06] to-transparent">
        {client.logo ? (
          <img src={client.logo} alt={client.name} className="max-h-10 max-w-[70%] object-contain" />
        ) : (
          <span className="font-display text-xl font-semibold tracking-tight text-text/80">
            {client.name}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-text-muted">{client.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {client.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2.5 py-1 text-xs text-text-faint"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
