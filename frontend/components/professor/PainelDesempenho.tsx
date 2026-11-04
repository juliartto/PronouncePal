"use client";

import { useMemo, useState } from "react";
import { NIVEIS } from "@/components/historias/cores";
import { classesInput } from "@/components/ui/Campo";
import EstadoVazio from "@/components/ui/EstadoVazio";
import { useHistorias } from "@/contexts/HistoriasContext";
import type { Nivel } from "@/types";
import CartaoTentativa from "./CartaoTentativa";

export default function PainelDesempenho() {
  const { tentativas } = useHistorias();
  const [alunoFiltro, setAlunoFiltro] = useState<string>("Todos");
  const [nivelFiltro, setNivelFiltro] = useState<Nivel | "Todos">("Todos");

  const alunosDisponiveis = useMemo(() => {
    const mapa = new Map<string, string>();
    tentativas.forEach((t) => {
      if (!mapa.has(t.alunoLogin)) {
        mapa.set(t.alunoLogin, t.alunoNome);
      }
    });
    return Array.from(mapa.entries()).map(([login, nome]) => ({ login, nome }));
  }, [tentativas]);

  const tentativasFiltradas = useMemo(
    () =>
      tentativas.filter(
        (t) =>
          (alunoFiltro === "Todos" || t.alunoLogin === alunoFiltro) &&
          (nivelFiltro === "Todos" || t.nivel === nivelFiltro),
      ),
    [tentativas, alunoFiltro, nivelFiltro],
  );

  const mediaTurma = useMemo(() => {
    if (tentativasFiltradas.length === 0) return 0;
    const soma = tentativasFiltradas.reduce((acc, t) => acc + t.notaGeral, 0);
    return Math.round(soma / tentativasFiltradas.length);
  }, [tentativasFiltradas]);

  const alunosUnicosCount = useMemo(
    () => new Set(tentativasFiltradas.map((t) => t.alunoLogin)).size,
    [tentativasFiltradas],
  );

  const palavrasMaisErradas = useMemo(() => {
    const contagem = new Map<string, number>();
    tentativasFiltradas.forEach((t) => {
      t.resultados.forEach((r) => {
        r.palavras.forEach((p) => {
          if (!p.correta) {
            const chave = p.palavra.toLowerCase();
            contagem.set(chave, (contagem.get(chave) ?? 0) + 1);
          }
        });
      });
    });
    return Array.from(contagem.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([palavra]) => palavra);
  }, [tentativasFiltradas]);

  const opcoesNivel: (Nivel | "Todos")[] = ["Todos", ...NIVEIS];

  return (
    <section aria-label="Desempenho dos alunos">
      {/* Resumo de métricas da turma */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border-2 border-madeira/30 bg-papel p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-texto-suave">Práticas registradas</p>
          <p className="mt-1 font-giz text-4xl text-lousa">{tentativasFiltradas.length}</p>
        </div>

        <div className="rounded-xl border-2 border-madeira/30 bg-papel p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-texto-suave">Nota média geral</p>
          <p className="mt-1 font-giz text-4xl text-lousa">{mediaTurma}/100</p>
        </div>

        <div className="rounded-xl border-2 border-madeira/30 bg-papel p-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-texto-suave">
            Alunos avaliados ({alunosUnicosCount}) · Palavras de atenção
          </p>
          {palavrasMaisErradas.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {palavrasMaisErradas.map((palavra) => (
                <span
                  key={palavra}
                  className="rounded bg-maca/15 px-2 py-0.5 text-xs font-bold text-maca underline decoration-maca"
                >
                  {palavra}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-texto-suave">Nenhum erro registrado</p>
          )}
        </div>
      </div>

      {/* Filtros rápidos */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="filtro-aluno" className="shrink-0 font-bold text-lousa">
            Aluno:
          </label>
          <select
            id="filtro-aluno"
            value={alunoFiltro}
            onChange={(e) => setAlunoFiltro(e.target.value)}
            className={`${classesInput()} sm:w-52`}
          >
            <option value="Todos">Todos os alunos</option>
            {alunosDisponiveis.map((aluno) => (
              <option key={aluno.login} value={aluno.login}>
                {aluno.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar tentativas por nível">
          {opcoesNivel.map((opcao) => (
            <button
              key={opcao}
              type="button"
              onClick={() => setNivelFiltro(opcao)}
              aria-pressed={nivelFiltro === opcao}
              className={`rounded-full border-2 px-4 py-1 font-bold transition ${
                nivelFiltro === opcao
                  ? "border-lousa bg-lousa text-giz"
                  : "border-lousa/30 bg-white text-lousa hover:border-lousa"
              }`}
            >
              {opcao}
            </button>
          ))}
        </div>
      </div>

      {/* Listagem de tentativas */}
      {tentativasFiltradas.length === 0 ? (
        <EstadoVazio>Nenhuma tentativa de prática encontrada com esse filtro.</EstadoVazio>
      ) : (
        <ul className="flex flex-col gap-4">
          {tentativasFiltradas.map((tentativa) => (
            <CartaoTentativa key={tentativa.id} tentativa={tentativa} />
          ))}
        </ul>
      )}
    </section>
  );
}

