import type { Nivel } from "@/types";

export const NIVEIS: Nivel[] = ["Iniciante", "Básico", "Intermediário"];

export const coresNivel: Record<Nivel, { lombada: string; etiqueta: string }> = {
  Iniciante: { lombada: "bg-lapis", etiqueta: "bg-lapis/30 text-tinta" },
  Básico: { lombada: "bg-lousa", etiqueta: "bg-lousa/15 text-lousa" },
  Intermediário: { lombada: "bg-maca", etiqueta: "bg-maca/15 text-maca" },
};
