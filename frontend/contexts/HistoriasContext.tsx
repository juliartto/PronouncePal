"use client";

import { createContext, useContext, useState } from "react";
import { historiasMock } from "@/mocks/historias";
import type { Historia } from "@/types";

interface HistoriasContextValor {
  historias: Historia[];
}

const HistoriasContext = createContext<HistoriasContextValor | null>(null);

export function HistoriasProvider({ children }: { children: React.ReactNode }) {
  const [historias] = useState<Historia[]>(historiasMock);

  return <HistoriasContext.Provider value={{ historias }}>{children}</HistoriasContext.Provider>;
}

export function useHistorias() {
  const contexto = useContext(HistoriasContext);
  if (!contexto) throw new Error("useHistorias deve ser usado dentro de HistoriasProvider");
  return contexto;
}
