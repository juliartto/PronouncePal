"use client";

import { useState } from "react";
import Alerta from "@/components/ui/Alerta";
import Botao from "@/components/ui/Botao";
import EstadoVazio from "@/components/ui/EstadoVazio";
import { useAuth } from "@/contexts/AuthContext";
import { useHistorias } from "@/contexts/HistoriasContext";
import type { Historia, ResultadoFrase } from "@/types";
import ItemFrasePratica from "./ItemFrasePratica";

interface PainelPraticaProps {
  historia: Historia;
}

export default function PainelPratica({ historia }: PainelPraticaProps) {
  const { usuario } = useAuth();
  const { registrarTentativa } = useHistorias();

  const frasesParaPraticar = historia.frases.filter((f) => f.praticar);
  const [resultadosPorFrase, setResultadosPorFrase] = useState<Record<number, ResultadoFrase>>({});
  const [notaRegistrada, setNotaRegistrada] = useState<number | null>(null);

  const resultadosLista = frasesParaPraticar
    .map((f) => resultadosPorFrase[f.id])
    .filter((r): r is ResultadoFrase => Boolean(r));

  const mediaAtual =
    resultadosLista.length > 0
      ? Math.round(resultadosLista.reduce((soma, r) => soma + r.nota, 0) / resultadosLista.length)
      : 0;

  function atualizarResultadoFrase(resultado: ResultadoFrase) {
    setResultadosPorFrase((atual) => ({ ...atual, [resultado.fraseId]: resultado }));
    setNotaRegistrada(null);
  }

  function concluirPratica() {
    if (resultadosLista.length === 0) return;

    const tentativa = registrarTentativa({
      alunoLogin: usuario?.usuario ?? "aluno",
      alunoNome: usuario?.nome ?? "Aluno",
      historiaId: historia.id,
      historiaTitulo: historia.titulo,
      nivel: historia.nivel,
      notaGeral: mediaAtual,
      resultados: resultadosLista,
    });

    setNotaRegistrada(tentativa.notaGeral);
  }

  return (
    <section className="mt-8 rounded-xl border-2 border-madeira/30 bg-papel p-6 shadow-md" aria-label="Prática de pronúncia">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-linha pb-4">
        <div>
          <h2 className="font-giz text-3xl text-lousa">Prática de pronúncia</h2>
          <p className="text-sm text-texto-suave">
            Ouça cada frase, grave sua leitura e confira o retorno da IA ({resultadosLista.length} de{" "}
            {frasesParaPraticar.length} praticadas).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <span className="inline-flex items-center gap-1 text-sucesso">
            <span className="h-2.5 w-2.5 rounded-full bg-sucesso" /> Correta
          </span>
          <span className="inline-flex items-center gap-1 text-maca">
            <span className="h-2.5 w-2.5 rounded-full bg-maca" /> Precisa praticar
          </span>
        </div>
      </div>

      {frasesParaPraticar.length === 0 ? (
        <EstadoVazio>Nenhuma frase foi selecionada para prática nesta história.</EstadoVazio>
      ) : (
        <>
          <ol className="flex flex-col gap-4">
            {frasesParaPraticar.map((frase, indice) => (
              <ItemFrasePratica
                key={frase.id}
                numero={indice + 1}
                frase={frase}
                resultado={resultadosPorFrase[frase.id]}
                onAvaliar={atualizarResultadoFrase}
              />
            ))}
          </ol>

          {resultadosLista.length > 0 && (
            <div className="mt-6 flex flex-col gap-4 border-t border-linha pt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-giz text-2xl text-lousa">
                  Média alcançada: <span className="font-sans font-bold">{mediaAtual}/100</span>
                </p>

                <Botao type="button" variante="primario" onClick={concluirPratica} disabled={notaRegistrada !== null}>
                  {notaRegistrada !== null ? "Prática salva" : "Salvar resultado da prática"}
                </Botao>
              </div>

              {notaRegistrada !== null && (
                <Alerta tipo="sucesso">
                  Prática registrada com sucesso! Sua nota geral nesta história foi <strong>{notaRegistrada}/100</strong>.
                </Alerta>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}

