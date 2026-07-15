import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

/**
 * Navbar fija, presente en todas las secciones.
 * [PC] (md: en adelante) links en línea + botón "Hablemos" siempre visibles.
 * [MÓVIL] (hasta md:) links y botón se ocultan; aparece un botón de
 * hamburguesa que despliega el panel `#mobile-menu`.
 * Mientras flota transparente sobre el hero (siempre oscuro) el nav fuerza
 * texto blanco; al hacer scroll adopta el fondo/tokens del tema activo.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // El color de texto/bordes sigue únicamente `scrolled`: mientras seguimos
  // sobre el hero (siempre oscuro), el nav debe verse blanco aunque el menú
  // móvil esté abierto — si dependiera de `menuOpen` también, abrir el menú
  // sobre el hero en tema claro mostraría texto oscuro casi ilegible.
  const textStrong = scrolled ? "text-text" : "text-white";
  const textMuted = scrolled ? "text-text-muted hover:text-text" : "text-white/70 hover:text-white";
  const border = scrolled ? "border-border" : "border-white/15";
  const chipBg = scrolled ? "bg-text/5 hover:bg-text/10" : "bg-white/5 hover:bg-white/10";

  // El fondo sí puede activarse solo por `menuOpen` (para que el panel
  // desplegable sea legible), pero usa el chrome oscuro fijo si aún no
  // hicimos scroll, no el `.glass` del tema.
  const headerBg = scrolled
    ? "glass"
    : menuOpen
      ? "border-b border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl"
      : "bg-transparent";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${headerBg}`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-10"
      >
        <a href="#top" className="flex items-center gap-2.5">
          <Logo />
          <span className={`font-display text-lg font-semibold tracking-tight transition-colors duration-300 ${textStrong}`}>
            EMIA <span className="text-gradient">Studios</span>
          </span>
        </a>

        {/* [PC] Links en línea, ocultos en móvil (hidden md:flex) */}
        <ul className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-base transition-colors duration-300 ${textMuted}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* [PC] Toggle de tema visible desde sm:, oculto en móvil angosto
              (vive también dentro del panel `#mobile-menu` para [MÓVIL]) */}
          <ThemeToggle className="hidden sm:flex" onDark={!scrolled} />

          {/* [PC] Botón "Hablemos" en línea, oculto en móvil */}
          <a
            href="#contacto"
            className={`hidden min-h-12 items-center rounded-full border px-5 text-base transition-colors duration-300 hover:border-neon-cyan/60 md:inline-flex ${border} ${chipBg} ${textStrong}`}
          >
            Hablemos
          </a>

          {/* [MÓVIL] Botón de hamburguesa, oculto en PC (md:hidden) */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-full border transition-colors duration-300 md:hidden ${border} ${textStrong}`}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-5 rounded-full bg-current"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-5 rounded-full bg-current"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-5 rounded-full bg-current"
            />
          </button>
        </div>
      </nav>

      {/* [MÓVIL] Panel desplegable del menú, oculto en PC (md:hidden más abajo) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`overflow-hidden border-t md:hidden ${border}`}
          >
            <ul className="flex flex-col px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-h-12 items-center text-base transition-colors duration-300 ${textMuted}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className={`mt-2 flex items-center justify-between gap-3 border-t pt-4 ${border}`}>
                <a
                  href="#contacto"
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-12 flex-1 items-center justify-center rounded-full border text-base ${border} ${chipBg} ${textStrong}`}
                >
                  Hablemos
                </a>
                <ThemeToggle onDark={!scrolled} />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
