import { TECH_STACK } from "./techStack";

/**
 * name -> Icon, reutilizando los mismos íconos del marquee de tecnologías
 * (src/data/techStack.js) para no duplicar imports de react-icons. Un
 * `techs` que no matchea ninguna key acá simplemente se muestra sin ícono
 * (ver ClientCaseCard) — sigue siendo válido para tags que no son un
 * lenguaje/framework puntual (ej. "Offline-first").
 */
export const TECH_ICON_MAP = Object.fromEntries(TECH_STACK.map((t) => [t.name, t.Icon]));
