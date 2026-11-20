"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import EtiquetaNivel from "@/components/historias/EtiquetaNivel";
import PainelPratica from "@/components/historias/PainelPratica";
import Alerta from "@/components/ui/Alerta";
import Botao from "@/components/ui/Botao";
import { IconeAltoFalante, IconeMicrofone, IconeVoltar } from "@/components/ui/Icones";
import { useHistorias } from "@/contexts/HistoriasContext";
import { historiasService } from "@/services/historias";
import type { Historia } from "@/types";

export default function ConteudoHistoria() {
  const id = Number(useSearchParams().get("id"));
  const { buscarPorId, carregandoHistorias, erroHistorias } = useHistorias();
  const [lendo, setLendo] = useState(false);
  const [praticando, setPraticando] = useState(false);
  const [resultadoBusca, setResultadoBusca] = useState<{
    idBuscado: number;
    historia: Historia | null;
    erro: string | null;
  } | null>(null);

  const historiaDoContexto = buscarPorId(id);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (carregandoHistorias || historiaDoContexto || !Number.isFinite(id) || id <= 0) return;

    let ativo = true;
    historiasService
      .buscarPorId(id)
      .then((encontrada) => {
        if (ativo) setResultadoBusca({ idBuscado: id, historia: encontrada, erro: null });
      })
      .catch((erro) => {
        if (ativo) {
          setResultadoBusca({
            idBuscado: id,
            historia: null,
            erro: erro instanceof Error ? erro.message : "História não encontrada.",
          });
        }
      });

    return () => {
      ativo = false;
    };
  }, [id, carregandoHistorias, historiaDoContexto]);

  const historia = historiaDoContexto ?? (resultadoBusca?.idBuscado === id ? resultadoBusca.historia : null);
  const buscandoIndividual =
    !carregandoHistorias && !historiaDoContexto && Number.isFinite(id) && id > 0 && resultadoBusca?.idBuscado !== id;
  const erroFinal = resultadoBusca?.idBuscado === id ? resultadoBusca.erro : erroHistorias;

  if ((carregandoHistorias || buscandoIndividual) && !historia) {
    return (
      <p className="rounded-lg bg-papel p-8 text-center font-giz text-2xl text-lousa">
        Carregando história...
      </p>
    );
  }

  if (!historia) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
        <Alerta tipo="erro">{erroFinal ?? "História não encontrada."}</Alerta>
        <Link href="/inicio" className="font-bold text-lousa underline">
          Voltar para as histórias
        </Link>
      </div>
    );
  }

  const textoCompleto = historia.frases.map((f) => f.texto).join(" ");

  function alternarLeitura() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (lendo) {
      window.speechSynthesis.cancel();
      setLendo(false);
      return;
    }

    window.speechSynthesis.cancel();
    const fala = new SpeechSynthesisUtterance(textoCompleto);
    fala.lang = "en-US";
    fala.rate = 0.9;
    fala.onend = () => setLendo(false);
    fala.onerror = () => setLendo(false);
    setLendo(true);
    window.speechSynthesis.speak(fala);
  }

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
          <Botao type="button" variante="secundario" onClick={alternarLeitura}>
            <IconeAltoFalante /> {lendo ? "Parar leitura" : "Ouvir leitura"}
          </Botao>
          <Botao
            type="button"
            variante="destaque"
            aria-expanded={praticando}
            onClick={() => setPraticando((atual) => !atual)}
          >
            <IconeMicrofone /> {praticando ? "Fechar prática" : "Praticar"}
          </Botao>
        </div>
      </article>

      {praticando && <PainelPratica key={historia.id} historia={historia} />}
    </>
  );
}
