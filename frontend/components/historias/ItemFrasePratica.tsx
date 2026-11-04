"use client";

import { useState } from "react";
import Botao from "@/components/ui/Botao";
import { IconeAltoFalante, IconeMicrofone } from "@/components/ui/Icones";
import { avaliarFraseMock } from "@/mocks/desempenho";
import type { Frase, ResultadoFrase } from "@/types";

interface ItemFrasePraticaProps {
  numero: number;
  frase: Frase;
  resultado?: ResultadoFrase;
  onAvaliar: (resultado: ResultadoFrase) => void;
}

export default function ItemFrasePratica({ numero, frase, resultado, onAvaliar }: ItemFrasePraticaProps) {
  const [gravando, setGravando] = useState(false);

  function ouvirFrase() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const fala = new SpeechSynthesisUtterance(frase.texto);
    fala.lang = "en-US";
    fala.rate = 0.9;
    window.speechSynthesis.speak(fala);
  }

  async function gravarPronuncia() {
    if ( typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setGravando(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    const avaliacao = avaliarFraseMock(frase);
    setGravando(false);
    onAvaliar(avaliacao);
  }

  const corNota =
    resultado && resultado.nota >= 80
      ? "border-sucesso/40 bg-sucesso/10 text-sucesso"
      : resultado && resultado.nota >= 65
        ? "border-lapis bg-lapis/25 text-aviso"
        : "border-maca/40 bg-maca/10 text-maca";

  return (
    <li className="rounded-xl border-2 border-linha bg-fundo p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex-1">
          <span className="font-giz text-lg text-lousa">Frase {numero}</span>
          <p className="mt-1 text-lg font-semibold text-tinta">{frase.texto}</p>
        </div>

        {resultado && (
          <span className={`rounded-full border px-3 py-1 text-sm font-bold ${corNota}`}>
            Nota: {resultado.nota}/100
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Botao type="button" variante="secundario" onClick={ouvirFrase}>
          <IconeAltoFalante /> Ouvir frase
        </Botao>
        <Botao type="button" variante="destaque" carregando={gravando} onClick={gravarPronuncia}>
          <IconeMicrofone />
          {gravando ? "Avaliando..." : resultado ? "Tentar novamente" : "Gravar pronúncia"}
        </Botao>
      </div>

      {resultado && (
        <div className="mt-4 border-t border-linha pt-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-texto-suave">
            Avaliação por palavra:
          </p>
          <div className="flex flex-wrap gap-2">
            {resultado.palavras.map((item, idx) => (
              <span
                key={`${item.palavra}-${idx}`}
                className={`rounded-md px-2.5 py-1 text-base font-semibold ${
                  item.correta
                    ? "border border-sucesso/30 bg-sucesso/15 text-sucesso"
                    : "border border-maca/40 bg-maca/15 font-bold text-maca underline decoration-maca decoration-2"
                }`}
              >
                {item.palavra}
              </span>
            ))}
          </div>

          <p className="mt-3 rounded-lg border-l-4 border-lapis bg-lapis/20 px-3 py-2 text-sm text-tinta">
            <strong className="text-lousa">Dica da IA:</strong> {resultado.dica}
          </p>
        </div>
      )}
    </li>
  );
}

