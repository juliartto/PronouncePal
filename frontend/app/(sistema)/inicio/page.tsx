"use client";

import { useState } from "react";
import Livros from "@/components/decor/Livros";
import CartaoHistoria from "@/components/historias/CartaoHistoria";
import FiltroHistorias from "@/components/historias/FiltroHistorias";
import TituloPagina from "@/components/layout/TituloPagina";
import Alerta from "@/components/ui/Alerta";
import Botao from "@/components/ui/Botao";
import EstadoVazio from "@/components/ui/EstadoVazio";
import { useHistorias } from "@/contexts/HistoriasContext";
import type { Nivel } from "@/types";

export default function PaginaInicio() {
  const { historias, carregandoHistorias, erroHistorias, recarregarHistorias } = useHistorias();
  const [busca, setBusca] = useState("");
  const [nivel, setNivel] = useState<Nivel | "Todos">("Todos");

  const filtradas = historias.filter(
    (h) => (nivel === "Todos" || h.nivel === nivel) && h.titulo.toLowerCase().includes(busca.trim().toLowerCase()),
  );

  return (
    <>
      <div className="relative mt-6">
        <TituloPagina titulo="Histórias disponíveis" subtitulo="Escolha uma história para ouvir e praticar" />
        <Livros className="absolute -top-12 right-6 hidden w-24 sm:block" />
      </div>

      <FiltroHistorias busca={busca} nivel={nivel} onBuscaChange={setBusca} onNivelChange={setNivel} />

      {carregandoHistorias && historias.length === 0 ? (
        <p className="rounded-lg bg-papel p-8 text-center font-giz text-2xl text-lousa">
          Carregando histórias...
        </p>
      ) : erroHistorias ? (
        <div className="flex flex-col items-start gap-3">
          <Alerta tipo="erro">{erroHistorias}</Alerta>
          <Botao type="button" variante="secundario" onClick={recarregarHistorias}>
            Tentar novamente
          </Botao>
        </div>
      ) : filtradas.length === 0 ? (
        <EstadoVazio>Nenhuma história encontrada com esse filtro.</EstadoVazio>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((historia) => (
            <li key={historia.id}>
              <CartaoHistoria historia={historia} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
