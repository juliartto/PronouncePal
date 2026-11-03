"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EtiquetaNivel from "@/components/historias/EtiquetaNivel";
import Botao from "@/components/ui/Botao";
import { IconeAltoFalante, IconeMicrofone, IconeVoltar } from "@/components/ui/Icones";
import { useHistorias } from "@/contexts/HistoriasContext";

export default function ConteudoHistoria() {
  const id = Number(useSearchParams().get("id"));
  const { historias } = useHistorias();

  const historia = historias.find((h) => h.id === id);

  if (!historia) {
    return (
      <div className="text-center">
        <p className="mb-4 font-giz text-2xl text-maca">História não encontrada.</p>
        <Link href="/inicio" className="font-bold text-lousa underline">
          Voltar para as histórias
        </Link>
      </div>
    );
  }

  const textoCompleto = historia.frases.map((f) => f.texto).join(" ");

  return (
    <>
      <Link href="/inicio" className="mb-4 inline-flex items-center gap-1 font-bold text-lousa hover:underline">
        <IconeVoltar className="h-4 w-4" /> Voltar
      </Link>

      <article className="folha-caderno rounded-xl py-8 pl-16 pr-6 shadow-md">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-giz text-4xl leading-[4rem] text-lousa">{historia.titulo}</h1>
          <EtiquetaNivel nivel={historia.nivel} />
        </div>
        <p className="text-sm leading-8 text-texto-suave">por {historia.autor}</p>

        {/* leading-8 mantém o texto alinhado com as linhas do caderno */}
        <p className="text-xl leading-8">{textoCompleto}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Botao variante="secundario">
            <IconeAltoFalante /> Ouvir leitura
          </Botao>
          <Botao variante="destaque">
            <IconeMicrofone /> Praticar
          </Botao>
        </div>
      </article>
    </>
  );
}
