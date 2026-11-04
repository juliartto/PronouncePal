"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { NIVEIS } from "@/components/historias/cores";
import EtiquetaNivel from "@/components/historias/EtiquetaNivel";
import Alerta from "@/components/ui/Alerta";
import Botao from "@/components/ui/Botao";
import Campo, { classesInput } from "@/components/ui/Campo";
import { useAuth } from "@/contexts/AuthContext";
import { useHistorias } from "@/contexts/HistoriasContext";
import type { Historia, Nivel } from "@/types";

function extrairFrases(texto: string): string[] {
  return texto
    .split(/(?<=[.!?])\s+|\n+/)
    .map((trecho) => trecho.trim())
    .filter(Boolean);
}

interface ErrosFormulario {
  titulo?: string;
  texto?: string;
  praticar?: string;
}

export default function FormularioNovaHistoria() {
  const { usuario } = useAuth();
  const { adicionarHistoria } = useHistorias();

  const [titulo, setTitulo] = useState("");
  const [nivel, setNivel] = useState<Nivel>("Iniciante");
  const [texto, setTexto] = useState("");
  const [desmarcadas, setDesmarcadas] = useState<Record<number, boolean>>({});
  const [erros, setErros] = useState<ErrosFormulario>({});
  const [enviando, setEnviando] = useState(false);
  const [historiaCriada, setHistoriaCriada] = useState<Historia | null>(null);

  const frasesDetectadas = useMemo(
    () =>
      extrairFrases(texto).map((fraseTexto, indice) => ({
        texto: fraseTexto,
        praticar: !desmarcadas[indice],
      })),
    [texto, desmarcadas],
  );

  const totalParaPraticar = frasesDetectadas.filter((f) => f.praticar).length;

  function alternarFrase(indice: number) {
    setDesmarcadas((atual) => ({ ...atual, [indice]: !atual[indice] }));
    setErros((atual) => ({ ...atual, praticar: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHistoriaCriada(null);

    const novosErros: ErrosFormulario = {};
    if (!titulo.trim()) {
      novosErros.titulo = "Informe o título da história.";
    }
    if (frasesDetectadas.length === 0) {
      novosErros.texto = "Digite o texto da história em inglês (ao menos uma frase).";
    } else if (totalParaPraticar === 0) {
      novosErros.praticar = "Selecione pelo menos uma frase para os alunos praticarem.";
    }

    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const criada = adicionarHistoria({
      titulo,
      nivel,
      autor: usuario?.nome ?? "Professor(a)",
      frases: frasesDetectadas,
    });

    setTitulo("");
    setNivel("Iniciante");
    setTexto("");
    setDesmarcadas({});
    setErros({});
    setEnviando(false);
    setHistoriaCriada(criada);
  }

  return (
    <section className="rounded-xl border-2 border-madeira/30 bg-papel p-6 shadow-md">
      <div className="mb-6 border-b border-linha pb-4">
        <h2 className="font-giz text-3xl text-lousa">Cadastrar nova história</h2>
        <p className="text-sm text-texto-suave">
          Escreva ou cole uma história em inglês. O sistema divide o texto em frases automaticamente para você escolher
          quais serão praticadas.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        {historiaCriada && (
          <Alerta tipo="sucesso">
            História <strong>&ldquo;{historiaCriada.titulo}&rdquo;</strong> publicada no catálogo com sucesso!{" "}
            <Link href={`/historia?id=${historiaCriada.id}`} className="underline hover:text-lousa">
              Abrir história
            </Link>
          </Alerta>
        )}

        {erros.praticar && <Alerta tipo="erro">{erros.praticar}</Alerta>}

        <Campo id="titulo-historia" rotulo="Título da história" erro={erros.titulo}>
          <input
            id="titulo-historia"
            type="text"
            placeholder="Ex.: The Friendly Robot"
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
              setErros((atual) => ({ ...atual, titulo: undefined }));
            }}
            aria-invalid={!!erros.titulo}
            className={classesInput(!!erros.titulo)}
          />
        </Campo>

        <Campo id="nivel-historia" rotulo="Nível de dificuldade">
          <div id="nivel-historia" className="flex flex-wrap items-center gap-2" role="group" aria-label="Nível de dificuldade">
            {NIVEIS.map((opcao) => (
              <button
                key={opcao}
                type="button"
                onClick={() => setNivel(opcao)}
                aria-pressed={nivel === opcao}
                className={`rounded-full border-2 px-4 py-1.5 font-bold transition ${
                  nivel === opcao
                    ? "border-lousa bg-lousa text-giz"
                    : "border-lousa/30 bg-white text-lousa hover:border-lousa"
                }`}
              >
                {opcao}
              </button>
            ))}
            <span className="ml-2 text-xs text-texto-suave">
              Etiqueta no cartão: <EtiquetaNivel nivel={nivel} />
            </span>
          </div>
        </Campo>

        <Campo id="texto-historia" rotulo="Texto da história em inglês" erro={erros.texto}>
          <textarea
            id="texto-historia"
            rows={5}
            placeholder="Ex.: Once upon a time, there was a friendly robot. He lived in a big school. Every morning, he helped the children read their books."
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
              setErros((atual) => ({ ...atual, texto: undefined }));
            }}
            aria-invalid={!!erros.texto}
            className={classesInput(!!erros.texto)}
          />
        </Campo>

        {frasesDetectadas.length > 0 && (
          <div className="rounded-xl border-2 border-linha bg-fundo p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-giz text-2xl text-lousa">Frases detectadas</h3>
              <span className="rounded-full bg-lousa/10 px-3 py-1 text-xs font-bold text-lousa">
                {totalParaPraticar} de {frasesDetectadas.length} frases selecionadas para prática
              </span>
            </div>

            <p className="mb-3 text-xs text-texto-suave">
              Marque as frases que os alunos deverão gravar em voz alta. Frases desmarcadas continuam visíveis na
              história apenas para leitura.
            </p>

            <ul className="flex flex-col gap-2">
              {frasesDetectadas.map((frase, indice) => (
                <li key={`${indice}-${frase.texto}`}>
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border-2 p-3 transition ${
                      frase.praticar
                        ? "border-lousa/40 bg-white"
                        : "border-linha bg-papel/60 text-texto-suave opacity-75"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={frase.praticar}
                      onChange={() => alternarFrase(indice)}
                      className="mt-1 h-4 w-4 accent-lousa"
                    />
                    <div className="flex-1">
                      <span className="text-base font-semibold">{frase.texto}</span>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        frase.praticar ? "bg-sucesso/15 text-sucesso" : "bg-linha/50 text-texto-suave"
                      }`}
                    >
                      {frase.praticar ? "Praticar" : "Só leitura"}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Botao type="submit" variante="primario" carregando={enviando}>
            {enviando ? "Publicando história..." : "Publicar história"}
          </Botao>
        </div>
      </form>
    </section>
  );
}

