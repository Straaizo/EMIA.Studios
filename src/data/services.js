import { CodeIcon, DeviceIcon, DatabaseIcon, BrainIcon } from "../components/icons";

/**
 * Servicios mostrados en #servicios. `bullets`: 3 entregables concretos por
 * servicio, para que la card no se quede solo en la descripción genérica.
 */
export const SERVICES = [
  {
    icon: CodeIcon,
    title: "Desarrollo Web a Medida",
    description:
      "Plataformas y productos web construidos desde cero, con arquitecturas escalables y foco en performance.",
    accent: "#2dd9f5",
    bullets: ["E-commerce y plataformas", "Dashboards internos", "APIs e integraciones"],
  },
  {
    icon: DeviceIcon,
    title: "Apps Móviles Nativas",
    description:
      "Aplicaciones iOS y Android con experiencia fluida, integradas a tus sistemas existentes.",
    accent: "#39ff9d",
    bullets: ["iOS y Android", "Notificaciones push", "Integración con sistemas existentes"],
  },
  {
    icon: DatabaseIcon,
    title: "Infraestructura de Datos",
    description:
      "Pipelines, bases de datos y arquitecturas cloud diseñadas para crecer con tu operación.",
    accent: "#ff8a3d",
    bullets: ["Pipelines de datos", "Bases de datos cloud", "Escalabilidad y backups"],
  },
  {
    icon: BrainIcon,
    title: "Inteligencia de Negocio y IA",
    description:
      "Dashboards, analítica avanzada y modelos de IA aplicados a decisiones reales de negocio.",
    accent: "#ff3dcb",
    bullets: ["Dashboards analíticos", "Modelos predictivos", "Automatización con IA"],
  },
];
