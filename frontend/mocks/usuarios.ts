import type { Usuario } from "@/types";

// Senha de todos os usuários de teste: 1234
export const usuariosMock: Usuario[] = [
  { id: 1, nome: "Ana", usuario: "ana", papel: "aluno" },
  { id: 2, nome: "Pedro", usuario: "pedro", papel: "aluno" },
  { id: 3, nome: "Profª Carla", usuario: "carla", papel: "professor" },
];

export const SENHA_MOCK = "1234";
