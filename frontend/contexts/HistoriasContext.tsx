"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { historiasService } from "@/services/historias";
import { tentativasService } from "@/services/tentativas";
import type { Historia, NovaHistoriaInput, ResultadoFrase, TentativaPratica } from "@/types";

interface HistoriasContextValor {
  historias: Historia[];
  carregandoHistorias: boolean;
  erroHistorias: string | null;
  recarregarHistorias: () => Promise<void>;
  buscarPorId: (id: number) => Historia | undefined;
  adicionarHistoria: (dados: NovaHistoriaInput) => Promise<Historia>;
  tentativas: TentativaPratica[];
  carregandoTentativas: boolean;
  erroTentativas: string | null;
  carregarTentativas: () => Promise<void>;
  registrarTentativa: (dados: { historiaId: number; resultados: ResultadoFrase[] }) => Promise<TentativaPratica>;
}

const HistoriasContext = createContext<HistoriasContextValor | null>(null);

export function HistoriasProvider({ children }: { children: React.ReactNode }) {
  const { token, usuario } = useAuth();

  const [historias, setHistorias] = useState<Historia[]>([]);
  const [carregandoHistorias, setCarregandoHistorias] = useState(true);
  const [erroHistorias, setErroHistorias] = useState<string | null>(null);

  const [tentativas, setTentativas] = useState<TentativaPratica[]>([]);
  const [carregandoTentativas, setCarregandoTentativas] = useState(false);
  const [erroTentativas, setErroTentativas] = useState<string | null>(null);

  const recarregarHistorias = useCallback(async () => {
    setCarregandoHistorias(true);
    setErroHistorias(null);
    try {
      const lista = await historiasService.listar();
      setHistorias(lista);
    } catch (erro) {
      setErroHistorias(erro instanceof Error ? erro.message : "Erro ao carregar histórias.");
    } finally {
      setCarregandoHistorias(false);
    }
  }, []);

  useEffect(() => {
    let ativo = true;
    historiasService
      .listar()
      .then((lista) => {
        if (ativo) {
          setHistorias(lista);
          setErroHistorias(null);
        }
      })
      .catch((erro) => {
        if (ativo) setErroHistorias(erro instanceof Error ? erro.message : "Erro ao carregar histórias.");
      })
      .finally(() => {
        if (ativo) setCarregandoHistorias(false);
      });
    return () => {
      ativo = false;
    };
  }, []);

  const carregarTentativas = useCallback(async () => {
    if (!token) return;
    setCarregandoTentativas(true);
    setErroTentativas(null);
    try {
      const lista = await tentativasService.listar(token);
      setTentativas(lista);
    } catch (erro) {
      setErroTentativas(erro instanceof Error ? erro.message : "Erro ao carregar tentativas.");
    } finally {
      setCarregandoTentativas(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token || usuario?.papel !== "professor") return;
    let ativo = true;
    tentativasService
      .listar(token)
      .then((lista) => {
        if (ativo) {
          setTentativas(lista);
          setErroTentativas(null);
        }
      })
      .catch((erro) => {
        if (ativo) setErroTentativas(erro instanceof Error ? erro.message : "Erro ao carregar tentativas.");
      })
      .finally(() => {
        if (ativo) setCarregandoTentativas(false);
      });
    return () => {
      ativo = false;
    };
  }, [token, usuario?.papel]);

  function buscarPorId(id: number): Historia | undefined {
    return historias.find((h) => h.id === id);
  }

  async function adicionarHistoria(dados: NovaHistoriaInput): Promise<Historia> {
    const nova = await historiasService.criar(dados, token);
    setHistorias((atual) => [...atual, nova]);
    return nova;
  }

  async function registrarTentativa(dados: {
    historiaId: number;
    resultados: ResultadoFrase[];
  }): Promise<TentativaPratica> {
    const nova = await tentativasService.registrar(dados, token);
    setTentativas((atual) => [nova, ...atual]);
    return nova;
  }

  return (
    <HistoriasContext.Provider
      value={{
        historias,
        carregandoHistorias,
        erroHistorias,
        recarregarHistorias,
        buscarPorId,
        adicionarHistoria,
        tentativas,
        carregandoTentativas,
        erroTentativas,
        carregarTentativas,
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
