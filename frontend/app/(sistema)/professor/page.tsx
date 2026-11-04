"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Regua from "@/components/decor/Regua";
import TituloPagina from "@/components/layout/TituloPagina";
import FormularioNovaHistoria from "@/components/professor/FormularioNovaHistoria";
import EstadoVazio from "@/components/ui/EstadoVazio";
import { useAuth } from "@/contexts/AuthContext";

type AbaProfessor = "nova-historia" | "desempenho";

export default function PaginaProfessor() {
  const { usuario } = useAuth();
  const router = useRouter();
  const [abaAtiva, setAbaAtiva] = useState<AbaProfessor>("nova-historia");

  useEffect(() => {
    if (usuario && usuario.papel !== "professor") {
      router.replace("/inicio");
    }
  }, [usuario, router]);

  if (usuario?.papel !== "professor") {
    return null;
  }

  return (
    <>
      <div className="relative mt-6">
        <TituloPagina
          titulo="Área do Professor"
          subtitulo="Cadastre novas histórias e acompanhe o progresso de leitura da turma"
        />
        <Regua className="absolute -top-6 right-6 hidden w-48 rotate-3 sm:block" />
      </div>

      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Seções da área do professor">
        <button
          type="button"
          role="tab"
          aria-selected={abaAtiva === "nova-historia"}
          onClick={() => setAbaAtiva("nova-historia")}
          className={`rounded-lg border-2 px-5 py-2.5 font-giz text-xl transition ${
            abaAtiva === "nova-historia"
              ? "border-lousa bg-lousa text-giz shadow-sm"
              : "border-lousa/30 bg-papel text-lousa hover:border-lousa"
          }`}
        >
          Submeter Nova História
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={abaAtiva === "desempenho"}
          onClick={() => setAbaAtiva("desempenho")}
          className={`rounded-lg border-2 px-5 py-2.5 font-giz text-xl transition ${
            abaAtiva === "desempenho"
              ? "border-lousa bg-lousa text-giz shadow-sm"
              : "border-lousa/30 bg-papel text-lousa hover:border-lousa"
          }`}
        >
          Desempenho dos Alunos
        </button>
      </div>

      {abaAtiva === "nova-historia" ? (
        <FormularioNovaHistoria />
      ) : (
        <EstadoVazio>Painel de desempenho dos alunos em carregamento.</EstadoVazio>
      )}
    </>
  );
}

