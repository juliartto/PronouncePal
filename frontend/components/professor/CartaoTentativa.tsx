"use client";

import { useState } from "react";
import Link from "next/link";
import EtiquetaNivel from "@/components/historias/EtiquetaNivel";
import Botao from "@/components/ui/Botao";
import type { TentativaPratica } from "@/types";

interface CartaoTentativaProps {
  tentativa: TentativaPratica;
}

function classeNota(nota: number) {
  if (nota >= 80) return "border-sucesso/40 bg-sucesso/10 text-sucesso";
  if (nota >= 65) return "border-lapis bg-lapis/25 text-aviso";
  return "border-maca/40 bg-maca/10 text-maca";
}

export default function CartaoTentativa({ tentativa }: CartaoTentativaProps) {
  const [expandido, setExpandido] = useState(false);

  const palavrasComErro = tentativa.resultados
    .flatMap((r) => r.palavras)
    .filter((p) => !p.correta)
    .map((p) => p.palavra);

  return (
    <li className="rounded-xl border-2 border-madeira/30 bg-papel p-5 shadow-md">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-lousa px-2.5 py-0.5 font-giz text-xl text-giz">
              {tentativa.alunoNome}
            </span>
            <Link
              href={`/historia?id=${tentativa.historiaId}`}
              className="font-giz text-2xl text-lousa hover:underline"
            >
              {tentativa.historiaTitulo}
            </Link>
            <EtiquetaNivel nivel={tentativa.nivel} />
          </div>

          <p className="text-sm text-texto-suave">
            Realizada em {tentativa.data} · {tentativa.resultados.length} frases avaliadas
            {palavrasComErro.length > 0 && ` · ${palavrasComErro.length} palavra(s) para reforçar`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full border px-3.5 py-1 text-base font-bold ${classeNota(tentativa.notaGeral)}`}>
            Nota geral: {tentativa.notaGeral}/100
          </span>

          <Botao
            type="button"
            variante="secundario"
            aria-expanded={expandido}
            onClick={() => setExpandido((atual) => !atual)}
          >
            {expandido ? "Ocultar detalhes" : "Ver detalhes da avaliação"}
          </Botao>
        </div>
      </div>

      {expandido && (
        <div className="mt-5 border-t border-linha pt-4">
          <ol className="flex flex-col gap-3">
            {tentativa.resultados.map((res, idx) => (
              <li key={`${tentativa.id}-frase-${res.fraseId}-${idx}`} className="rounded-lg border border-linha bg-fundo p-4">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-giz text-lg text-lousa">Frase {idx + 1}</span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${classeNota(res.nota)}`}>
                    Nota: {res.nota}/100
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {res.palavras.map((item, pIdx) => (
                    <span
                      key={`${item.palavra}-${pIdx}`}
                      className={`rounded px-2 py-0.5 text-sm font-semibold ${
                        item.correta
                          ? "border border-sucesso/30 bg-sucesso/15 text-sucesso"
                          : "border border-maca/40 bg-maca/15 font-bold text-maca underline decoration-maca decoration-2"
                      }`}
                    >
                      {item.palavra}
                    </span>
                  ))}
                </div>

                <p className="mt-3 rounded border-l-4 border-lapis bg-lapis/20 px-3 py-1.5 text-xs text-tinta">
                  <strong className="text-lousa">Dica fonética:</strong> {res.dica}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </li>
  );
}

