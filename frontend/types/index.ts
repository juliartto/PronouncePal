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

export interface AvaliacaoPalavra {
  palavra: string;
  correta: boolean;
}

export interface ResultadoFrase {
  fraseId: number;
  nota: number;
  palavras: AvaliacaoPalavra[];
  dica: string;
}

export interface TentativaPratica {
  id: string;
  alunoLogin: string;
  alunoNome: string;
  historiaId: number;
  historiaTitulo: string;
  nivel: Nivel;
  notaGeral: number;
  data: string;
  resultados: ResultadoFrase[];
}

export interface NovaHistoriaInput {
  titulo: string;
  nivel: Nivel;
  autor: string;
  frases: { texto: string; praticar: boolean }[];
}
