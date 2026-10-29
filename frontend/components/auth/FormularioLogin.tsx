"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Alerta from "@/components/ui/Alerta";
import Botao from "@/components/ui/Botao";
import Campo, { classesInput } from "@/components/ui/Campo";
import { useAuth } from "@/contexts/AuthContext";

export default function FormularioLogin() {
  const { entrar } = useAuth();
  const router = useRouter();

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState<{ usuario?: string; senha?: string }>({});
  const [erroLogin, setErroLogin] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErroLogin(null);

    const novosErros: typeof erros = {};
    if (!usuario.trim()) novosErros.usuario = "Informe seu usuário.";
    if (!senha) novosErros.senha = "Informe sua senha.";
    setErros(novosErros);
    if (Object.keys(novosErros).length > 0) return;

    setEnviando(true);
    try {
      await entrar(usuario, senha);
      router.replace("/inicio");
    } catch (erro) {
      setErroLogin(erro instanceof Error ? erro.message : "Erro ao entrar.");
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {erroLogin && <Alerta tipo="erro">{erroLogin}</Alerta>}

      <Campo id="usuario" rotulo="Usuário" erro={erros.usuario}>
        <input
          id="usuario"
          autoComplete="username"
          value={usuario}
          onChange={(e) => {
            setUsuario(e.target.value);
            setErros((atual) => ({ ...atual, usuario: undefined }));
          }}
          aria-invalid={!!erros.usuario}
          className={classesInput(!!erros.usuario)}
        />
      </Campo>

      <Campo id="senha" rotulo="Senha" erro={erros.senha}>
        <input
          id="senha"
          type="password"
          autoComplete="current-password"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setErros((atual) => ({ ...atual, senha: undefined }));
          }}
          aria-invalid={!!erros.senha}
          className={classesInput(!!erros.senha)}
        />
      </Campo>

      <Botao type="submit" carregando={enviando} className="mt-2">
        {enviando ? "Entrando..." : "Entrar"}
      </Botao>
    </form>
  );
}
