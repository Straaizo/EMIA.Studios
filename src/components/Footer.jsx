import Logo from "./Logo";

const LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

/**
 * Footer del sitio.
 * [MÓVIL] logo, navegación y contacto apilados en columna (flex-col) ·
 * [PC] logo a la izquierda y las dos columnas de links a la derecha, en
 * fila (md:flex-row).
 */
export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg py-14">
      {/* [MÓVIL] flex-col · [PC] md:flex-row */}
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 md:flex-row md:items-start md:justify-between md:px-10">
        <div className="max-w-xs">
          <a href="#top" className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-lg font-semibold text-text">
              EMIA <span className="text-gradient">Studios</span>
            </span>
          </a>
          <p className="mt-4 text-base text-text-muted">
            Estudio de desarrollo de software, web y tecnología.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:gap-16">
          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.25em] text-text-faint">
              Navegación
            </h4>
            <ul className="mt-4 flex flex-col gap-1">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-12 items-center text-base text-text-muted hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs uppercase tracking-[0.25em] text-text-faint">
              Contacto
            </h4>
            <ul className="mt-4 flex flex-col gap-1 text-base text-text-muted">
              <li>
                <a
                  href="mailto:hola@emiastudios.com"
                  className="flex min-h-12 items-center hover:text-text"
                >
                  hola@emiastudios.com
                </a>
              </li>
              <li className="flex min-h-12 items-center">Santiago, Chile</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-text-faint sm:flex-row">
          <span>© {new Date().getFullYear()} EMIA Studios. Todos los derechos reservados.</span>
          <span>Diseñado y desarrollado con obsesión por el detalle.</span>
        </div>
      </div>
    </footer>
  );
}
