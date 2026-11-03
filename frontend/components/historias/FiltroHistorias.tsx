import { classesInput } from "@/components/ui/Campo";
import type { Nivel } from "@/types";
import { NIVEIS } from "./cores";

interface FiltroHistoriasProps {
  busca: string;
  nivel: Nivel | "Todos";
  onBuscaChange: (valor: string) => void;
  onNivelChange: (valor: Nivel | "Todos") => void;
}

export default function FiltroHistorias({ busca, nivel, onBuscaChange, onNivelChange }: FiltroHistoriasProps) {
  const opcoes: (Nivel | "Todos")[] = ["Todos", ...NIVEIS];

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="search"
        placeholder="Buscar pelo título..."
        aria-label="Buscar pelo título"
        value={busca}
        onChange={(e) => onBuscaChange(e.target.value)}
        className={`${classesInput()} sm:max-w-xs`}
      />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por nível">
        {opcoes.map((opcao) => (
          <button
            key={opcao}
            onClick={() => onNivelChange(opcao)}
            aria-pressed={nivel === opcao}
            className={`rounded-full border-2 px-4 py-1 font-bold transition ${
              nivel === opcao ? "border-lousa bg-lousa text-giz" : "border-lousa/30 bg-white text-lousa hover:border-lousa"
            }`}
          >
            {opcao}
          </button>
        ))}
      </div>
    </div>
  );
}
