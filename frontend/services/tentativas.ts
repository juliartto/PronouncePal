import type { ResultadoFrase, TentativaPratica } from "@/types";
import { requisitar } from "./api";

export interface NovaTentativaInput {
  historiaId: number;
  resultados: ResultadoFrase[];
}

export async function listar(token: string): Promise<TentativaPratica[]> {
  return requisitar<TentativaPratica[]>("/tentativas", { token });
}

export async function registrar(dados: NovaTentativaInput, token: string): Promise<TentativaPratica> {
  return requisitar<TentativaPratica>("/tentativas", {
    metodo: "POST",
    token,
    corpo: dados,
  });
}

export const tentativasService = {
  listar,
  registrar,
};
