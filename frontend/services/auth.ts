import { SENHA_MOCK, usuariosMock } from "@/mocks/usuarios";
import type { Usuario } from "@/types";

const esperar = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login(usuario: string, senha: string): Promise<Usuario> {
  await esperar(600);

  const encontrado = usuariosMock.find((u) => u.usuario === usuario.trim().toLowerCase());
  if (!encontrado || senha !== SENHA_MOCK) {
    throw new Error("Usuário ou senha incorretos.");
  }
  return encontrado;
}
