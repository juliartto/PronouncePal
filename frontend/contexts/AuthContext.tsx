"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import * as authService from "@/services/auth";
import type { Usuario } from "@/types";

const CHAVE = "pronouncepal:usuario";

// A sessão fica no localStorage. Estas funções deixam o React "assinar" as mudanças.
const ouvintes = new Set<() => void>();

function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte);
  return () => ouvintes.delete(ouvinte);
}

function salvarSessao(valor: string | null) {
  if (valor) localStorage.setItem(CHAVE, valor);
  else localStorage.removeItem(CHAVE);
  ouvintes.forEach((ouvinte) => ouvinte());
}

interface AuthContextValor {
  usuario: Usuario | null;
  carregando: boolean;
  entrar: (usuario: string, senha: string) => Promise<Usuario>;
  sair: () => void;
}

const AuthContext = createContext<AuthContextValor | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // No build estático não existe localStorage, então o valor é undefined (carregando)
  const salvo = useSyncExternalStore(
    assinar,
    () => localStorage.getItem(CHAVE),
    () => undefined,
  );

  const usuario = useMemo<Usuario | null>(() => (salvo ? JSON.parse(salvo) : null), [salvo]);

  async function entrar(nomeUsuario: string, senha: string) {
    const logado = await authService.login(nomeUsuario, senha);
    salvarSessao(JSON.stringify(logado));
    return logado;
  }

  function sair() {
    salvarSessao(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, carregando: salvo === undefined, entrar, sair }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return contexto;
}
