"use client";

import { useEffect, useRef, useState } from "react";
import Alerta from "@/components/ui/Alerta";
import Botao from "@/components/ui/Botao";
import { IconeAltoFalante, IconeMicrofone } from "@/components/ui/Icones";
import { useAuth } from "@/contexts/AuthContext";
import { historiasService } from "@/services/historias";
import type { Frase, ResultadoFrase } from "@/types";
import { converterParaWav16kHzMono } from "@/utils/audioWav";

interface ItemFrasePraticaProps {
  historiaId: number;
  numero: number;
  frase: Frase;
  resultado?: ResultadoFrase;
  onAvaliar: (resultado: ResultadoFrase) => void;
}

export default function ItemFrasePratica({
  historiaId,
  numero,
  frase,
  resultado,
  onAvaliar,
}: ItemFrasePraticaProps) {
  const { token } = useAuth();
  const [gravando, setGravando] = useState(false);
  const [avaliando, setAvaliando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const desmontadoRef = useRef(false);

  useEffect(() => {
    desmontadoRef.current = false;
    return () => {
      desmontadoRef.current = true;
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  function ouvirFrase() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const fala = new SpeechSynthesisUtterance(frase.texto);
    fala.lang = "en-US";
    fala.rate = 0.9;
    window.speechSynthesis.speak(fala);
  }

  function pararGravacao() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  }

  async function iniciarGravacao() {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setErro("Seu navegador não suporta gravação de áudio pelo microfone.");
      return;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setErro(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const pedacos: BlobPart[] = [];
      const gravador = new MediaRecorder(stream);
      mediaRecorderRef.current = gravador;

      gravador.ondataavailable = (evento) => {
        if (evento.data.size > 0) {
          pedacos.push(evento.data);
        }
      };

      gravador.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;

        if (desmontadoRef.current) return;

        setGravando(false);
        setAvaliando(true);

        try {
          const blobBruto = new Blob(pedacos, { type: gravador.mimeType || "audio/webm" });
          const arquivoWav = await converterParaWav16kHzMono(blobBruto);
          const avaliacao = await historiasService.avaliarPronuncia(historiaId, frase.id, arquivoWav, token);
          if (!desmontadoRef.current) {
            onAvaliar(avaliacao);
          }
        } catch (err) {
          if (!desmontadoRef.current) {
            setErro(err instanceof Error ? err.message : "Erro ao avaliar a pronúncia.");
          }
        } finally {
          if (!desmontadoRef.current) {
            setAvaliando(false);
          }
        }
      };

      gravador.start();
      setGravando(true);
    } catch {
      setErro("Não foi possível acessar o microfone. Verifique a permissão de áudio no navegador.");
    }
  }

  function alternarGravacao() {
    if (gravando) {
      pararGravacao();
    } else {
      void iniciarGravacao();
    }
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

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Botao type="button" variante="secundario" onClick={ouvirFrase} disabled={gravando || avaliando}>
          <IconeAltoFalante /> Ouvir frase
        </Botao>

        <Botao
          type="button"
          variante={gravando ? "perigo" : "destaque"}
          carregando={avaliando}
          onClick={alternarGravacao}
        >
          <IconeMicrofone />
          {avaliando
            ? "Avaliando pronúncia..."
            : gravando
              ? "Parar e avaliar"
              : resultado
                ? "Tentar novamente"
                : "Gravar pronúncia"}
        </Botao>

        {gravando && (
          <span className="inline-flex items-center gap-2 text-sm font-bold text-maca" role="status">
            <span className="h-3 w-3 animate-ping rounded-full bg-maca" />
            Gravando... clique para parar
          </span>
        )}
      </div>

      {erro && (
        <div className="mt-3">
          <Alerta tipo="erro">{erro}</Alerta>
        </div>
      )}

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
