export type Papel = "aluno" | "professor";

export interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  papel: Papel;
}
