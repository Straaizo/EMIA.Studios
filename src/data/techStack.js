import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiPython,
  SiPostgresql,
  SiDocker,
  SiTailwindcss,
} from "react-icons/si";
// Simple Icons no incluye el logo de AWS (Amazon lo hizo remover por su
// política de marca); Font Awesome sí lo tiene, así que ese uno sale de ahí.
import { FaAws } from "react-icons/fa6";

/**
 * Logos del marquee de "Tecnologías que dominamos" — de react-icons
 * (Simple Icons + ese caso puntual de Font Awesome), no dibujados a mano:
 * acá lo que importa es que cada marca se reconozca al instante, y eso ya
 * está resuelto y probado en esos paths oficiales.
 */
export const TECH_STACK = [
  { name: "React", Icon: SiReact },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Python", Icon: SiPython },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "AWS", Icon: FaAws },
  { name: "Docker", Icon: SiDocker },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
];
