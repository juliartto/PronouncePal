"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { tentativasMock } from "@/mocks/desempenho";
import { historiasMock } from "@/mocks/historias";
import type { Historia, NovaHistoriaInput, TentativaPratica } from "@/types";

const CHAVE_HISTORIAS = "pronouncepal:historias";
const CHAVE_TENTATIVAS = "pronouncepal:tentativas";

const ouvintes = new Set<() => void>();

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

function salvarNoStorage(chave: string, valor: unknown) {
  localStorage.setItem(chave, JSON.stringify(valor));
  ouvintes.forEach((ouvinte) => ouvinte());
}

interface HistoriasContextValor {
  historias: Historia[];
  tentativas: TentativaPratica[];
  buscarPorId: (id: number) => Historia | undefined;
  adicionarHistoria: (dados: NovaHistoriaInput) => Historia;
  registrarTentativa: (tentativa: Omit<TentativaPratica, "id" | "data">) => TentativaPratica;
}

const HistoriasContext = createContext<HistoriasContextValor | null>(null);

export function HistoriasProvider({ children }: { children: React.ReactNode }) {
  const historiasSalvas = useSyncExternalStore(
    assinar,
    () => localStorage.getItem(CHAVE_HISTORIAS),
    () => null,
  );

  const tentativasSalvas = useSyncExternalStore(
    assinar,
    () => localStorage.getItem(CHAVE_TENTATIVAS),
    () => null,
  );

  const historias = useMemo<Historia[]>(
    () => (historiasSalvas ? JSON.parse(historiasSalvas) : historiasMock),
    [historiasSalvas],
  );

  const tentativas = useMemo<TentativaPratica[]>(
    () => (tentativasSalvas ? JSON.parse(tentativasSalvas) : tentativasMock),
    [tentativasSalvas],
  );

  function buscarPorId(id: number): Historia | undefined {
    return historias.find((h) => h.id === id);
  }

  function adicionarHistoria(dados: NovaHistoriaInput): Historia {
    const proximoId = historias.reduce((max, h) => Math.max(max, h.id), 0) + 1;
    const maiorFraseId = historias
      .flatMap((h) => h.frases)
      .reduce((max, f) => Math.max(max, f.id), 0);

    const nova: Historia = {
      id: proximoId,
      titulo: dados.titulo.trim(),
      nivel: dados.nivel,
      autor: dados.autor,
      frases: dados.frases.map((f, indice) => ({
        id: maiorFraseId + indice + 1,
        texto: f.texto.trim(),
        praticar: f.praticar,
      })),
    };

    salvarNoStorage(CHAVE_HISTORIAS, [...historias, nova]);
    return nova;
  }

  function registrarTentativa(tentativa: Omit<TentativaPratica, "id" | "data">): TentativaPratica {
    const nova: TentativaPratica = {
      ...tentativa,
      id: `t-${Date.now()}`,
      data: new Date().toLocaleDateString("pt-BR"),
    };

    salvarNoStorage(CHAVE_TENTATIVAS, [nova, ...tentativas]);
    return nova;
  }

  return (
    <HistoriasContext.Provider
      value={{
        historias,
        tentativas,
        buscarPorId,
        adicionarHistoria,
        registrarTentativa,
      }}
    >
      {children}
    </HistoriasContext.Provider>
  );
}

export function useHistorias() {
  const contexto = useContext(HistoriasContext);
  if (!contexto) throw new Error("useHistorias deve ser usado dentro de HistoriasProvider");
  return contexto;
}
