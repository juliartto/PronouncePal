"use client";

import { useState } from "react";
import Livros from "@/components/decor/Livros";
import CartaoHistoria from "@/components/historias/CartaoHistoria";
import FiltroHistorias from "@/components/historias/FiltroHistorias";
import TituloPagina from "@/components/layout/TituloPagina";
import EstadoVazio from "@/components/ui/EstadoVazio";
import { useHistorias } from "@/contexts/HistoriasContext";
import type { Nivel } from "@/types";

export default function PaginaInicio() {
  const { historias } = useHistorias();
  const [busca, setBusca] = useState("");
  const [nivel, setNivel] = useState<Nivel | "Todos">("Todos");

  const filtradas = historias.filter(
    (h) => (nivel === "Todos" || h.nivel === nivel) && h.titulo.toLowerCase().includes(busca.trim().toLowerCase()),
  );

  return (
    <>
      <div className="relative">
        <TituloPagina titulo="Histórias disponíveis" subtitulo="Escolha uma história para ouvir e praticar" />
        <Livros className="absolute -top-6 right-4 hidden w-28 sm:block" />
      </div>

      <FiltroHistorias busca={busca} nivel={nivel} onBuscaChange={setBusca} onNivelChange={setNivel} />

      {filtradas.length === 0 ? (
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
