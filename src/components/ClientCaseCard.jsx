import { TECH_ICON_MAP } from "../data/techIcons";

/**
 * Card de "caso de cliente" para el carrusel de Confían en nosotros: foto
 * de fondo con el logo arriba y, superpuesto abajo con un velo oscuro para
 * legibilidad, qué construimos y con qué tecnologías.
 *
 * PLACEHOLDER de foto: mientras no hay fotos reales de proyectos, el fondo
 * es un patrón generado (glow radial + grilla) en el color `accent` del
 * cliente — mismo criterio que el fallback de logo: se ve intencional, no
 * como una imagen rota. En cuanto haya foto real, pasarla en `client.image`
 * y se usa automáticamente en su lugar (ver src/data/clients.js).
 */
export default function ClientCaseCard({ client }) {
  const { name, logo, image, accent, category, project, techs } = client;

  return (
    <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-border shadow-[0_25px_60px_-20px_rgba(0,0,0,0.7)]">
      <div className="relative h-full w-full overflow-hidden">
        {image ? (
          <img
            src={image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            style={{
              background: `radial-gradient(circle at 25% 18%, ${accent}4d, transparent 55%), radial-gradient(circle at 85% 88%, ${accent}26, transparent 50%), linear-gradient(160deg, #14141d, #0a0a0f 75%)`,
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Velo oscuro de abajo hacia arriba: legibilidad del texto sin
            tapar la "foto" por completo. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/55 to-transparent" />

        {/* Anillo + glow del acento del cliente, solo al hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${accent}80, 0 0 40px -8px ${accent}` }}
          aria-hidden="true"
        />

        <div className="glass absolute left-4 right-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5">
          {logo ? (
            <img src={logo} alt={name} className="h-5 max-w-[70%] object-contain" />
          ) : (
            <span className="truncate font-display text-sm font-semibold text-text/90">{name}</span>
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <span
            className="font-display text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: accent }}
          >
            {category}
          </span>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text/90 sm:line-clamp-3 sm:text-base">
            {project}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {techs.map((tech) => {
              const Icon = TECH_ICON_MAP[tech];
              return (
                <span
                  key={tech}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 text-xs text-text/80 backdrop-blur-sm"
                >
                  {Icon && <Icon className="h-3 w-3" aria-hidden="true" />}
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
