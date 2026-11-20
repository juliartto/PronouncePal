import type { Historia, NovaHistoriaInput, ResultadoFrase } from "@/types";
import { requisitar } from "./api";

export async function listar(): Promise<Historia[]> {
  return requisitar<Historia[]>("/historias");
}

export async function buscarPorId(id: number): Promise<Historia> {
  return requisitar<Historia>(`/historias/${id}`);
}

export async function criar(dados: NovaHistoriaInput, token: string): Promise<Historia> {
  return requisitar<Historia>("/historias", {
    metodo: "POST",
    token,
    corpo: {
      titulo: dados.titulo,
      nivel: dados.nivel,
      frases: dados.frases,
    },
  });
}

export async function avaliarPronuncia(
  historiaId: number,
  fraseId: number,
  arquivoWav: Blob,
  token: string,
): Promise<ResultadoFrase> {
  const formData = new FormData();
  formData.append("audio", arquivoWav, "gravacao.wav");

  return requisitar<ResultadoFrase>(`/historias/${historiaId}/frases/${fraseId}/avaliacao`, {
    metodo: "POST",
    token,
    corpo: formData,
  });
}

export const historiasService = {
  listar,
  buscarPorId,
  criar,
  avaliarPronuncia,
};
