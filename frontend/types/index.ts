export type Papel = "aluno" | "professor";

export type Nivel = "Iniciante" | "Básico" | "Intermediário";

export interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  papel: Papel;
}

export interface Frase {
  id: number;
  texto: string;
  praticar: boolean;
}

export interface Historia {
  id: number;
  titulo: string;
  nivel: Nivel;
  autor: string;
  frases: Frase[];
}
