import type { Nivel } from "@/types";
import { coresNivel } from "./cores";

export default function EtiquetaNivel({ nivel }: { nivel: Nivel }) {
  return <span className={`rounded-full px-3 py-0.5 text-sm font-bold ${coresNivel[nivel].etiqueta}`}>{nivel}</span>;
}
