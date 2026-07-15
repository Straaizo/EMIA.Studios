import { motion } from "framer-motion";

/**
 * Botón CTA con glow neón al hover/focus.
 * variant "solid" para el CTA principal, "ghost" para secundarios.
 */
export default function GlowButton({
  children,
  onClick,
  href,
  variant = "solid",
  className = "",
}) {
  const base =
    "relative inline-flex min-h-12 items-center justify-center rounded-full px-8 font-display font-medium text-base tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan";

  // Colores fijos (no dependen del tema): este botón siempre vive sobre
  // fondos oscuros (hero) o el propio gradiente neón, que exige texto oscuro fijo.
  const styles =
    variant === "solid"
      ? "bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-magenta text-[#0a0a0f]"
      : "border border-white/15 text-white bg-white/5";

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      style={{
        boxShadow:
          variant === "solid"
            ? "0 0 0px rgba(45,217,245,0)"
            : undefined,
      }}
      onMouseEnter={(e) => {
        if (variant === "solid") {
          e.currentTarget.style.boxShadow =
            "0 0 28px rgba(45,217,245,0.55), 0 0 55px rgba(255,61,203,0.35)";
        } else {
          e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.15)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          variant === "solid" ? "0 0 0px rgba(45,217,245,0)" : "none";
      }}
    >
      {children}
    </Component>
  );
}
