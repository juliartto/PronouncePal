import type { Nivel } from "@/types";

export const NIVEIS: Nivel[] = ["Iniciante", "Básico", "Intermediário"];

export const coresNivel: Record<Nivel, { lombada: string; etiqueta: string }> = {
  Iniciante: { lombada: "bg-lapis", etiqueta: "bg-lapis/30 text-tinta" },
  Básico: { lombada: "bg-caneta", etiqueta: "bg-caneta/15 text-caneta" },
  Intermediário: { lombada: "bg-maca", etiqueta: "bg-maca/15 text-maca" },
};
