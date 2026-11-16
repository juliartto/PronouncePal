import type { Usuario } from "@/types";
import { requisitar } from "./api";

export interface Sessao {
  token: string;
  usuario: Usuario;
}

export async function login(usuario: string, senha: string): Promise<Sessao> {
  // O login segue o padrão OAuth2 do FastAPI, que recebe formulário em vez de JSON
  const corpo = new URLSearchParams({ username: usuario, password: senha });
  const resposta = await requisitar<{ access_token: string; usuario: Usuario }>("/auth/login", { metodo: "POST", corpo });
  return { token: resposta.access_token, usuario: resposta.usuario };
}
