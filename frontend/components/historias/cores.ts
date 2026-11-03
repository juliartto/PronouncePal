import type { Nivel } from "@/types";

export const NIVEIS: Nivel[] = ["Iniciante", "Básico", "Intermediário"];

export const coresNivel: Record<Nivel, { lombada: string; etiqueta: string }> = {
  Iniciante: { lombada: "bg-lapis", etiqueta: "bg-yellow-100 text-yellow-900" },
  Básico: { lombada: "bg-caneta", etiqueta: "bg-blue-100 text-blue-900" },
  Intermediário: { lombada: "bg-maca", etiqueta: "bg-red-100 text-red-900" },
};
