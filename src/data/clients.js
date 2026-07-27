/**
 * Casos de cliente mostrados en el carrusel de "Confían en nosotros"
 * (#clientes). PLACEHOLDER: reemplazar por los clientes/proyectos reales.
 * - `image`: ruta a una foto real del proyecto en /public/ (ej.
 *   "/clients/acme-cover.jpg"). Si es `null`, la card usa un fondo generado
 *   en el color `accent` — pensado para verse intencional, no como una
 *   imagen rota mientras no hay foto real.
 * - `logo`: ruta a un logo en /public/clients/. Si es `null`, muestra el
 *   nombre del cliente en texto.
 * - `techs`: usar los nombres tal cual aparecen en TECH_STACK
 *   (src/data/techStack.js) para que la card muestre el ícono real; otros
 *   strings se muestran igual, solo que sin ícono.
 * - El carrusel funciona igual de bien con 2, 3 o más clientes en este array.
 */
export const CLIENTS = [
  {
    name: "Cliente 1",
    logo: null,
    image: null,
    accent: "#2dd9f5",
    category: "E-commerce",
    project:
      "Rediseñamos el checkout y construimos un motor de inventario propio en tiempo real, reduciendo los quiebres de stock a la mitad.",
    techs: ["React", "Node.js", "PostgreSQL"],
  },
  {
    name: "Cliente 2",
    logo: null,
    image: null,
    accent: "#39ff9d",
    category: "App móvil",
    project:
      "App de gestión interna para equipos de campo, con sincronización offline-first para iOS y Android.",
    techs: ["React", "AWS"],
  },
  {
    name: "Cliente 3",
    logo: null,
    image: null,
    accent: "#ff8a3d",
    category: "Datos & IA",
    project:
      "Dashboard de analítica en tiempo real para operaciones retail, con modelos predictivos de demanda.",
    techs: ["Python", "PostgreSQL", "Docker"],
  },
];
