"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import FormularioLogin from "@/components/auth/FormularioLogin";
import Lapis from "@/components/decor/Lapis";
import Livros from "@/components/decor/Livros";
import Logo from "@/components/decor/Logo";
import Regua from "@/components/decor/Regua";
import { useAuth } from "@/contexts/AuthContext";

const argolas = Array.from({ length: 9 }, (_, i) => i);

export default function PaginaLogin() {
  const { usuario } = useAuth();
  const router = useRouter();

  // Quem já está logado vai direto para o início
  useEffect(() => {
    if (usuario) router.replace("/inicio");
  }, [usuario, router]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      <Livros className="absolute bottom-6 left-6 hidden w-44 md:block" />
      <Lapis className="absolute right-10 top-16 hidden w-56 rotate-[-20deg] md:block" />
      <Regua className="absolute bottom-12 right-8 hidden w-64 rotate-6 md:block" />
      <p className="absolute left-12 top-12 hidden -rotate-6 font-giz text-6xl text-lousa/20 md:block">ABC</p>

      <div className="relative w-full max-w-sm rounded-xl bg-papel px-8 pb-8 pt-12 shadow-xl">
        {/* Argolas de caderno */}
        <div className="absolute -top-3 left-6 right-6 flex justify-between" aria-hidden="true">
          {argolas.map((i) => (
            <span key={i} className="h-6 w-3 rounded-full border-2 border-gray-400 bg-[#fbf8ef]" />
          ))}
        </div>

        <div className="mb-6 flex flex-col items-center gap-1">
          <Logo />
          <p className="text-center text-sm text-gray-600">Pratique a leitura em inglês</p>
        </div>

        <FormularioLogin />

        <p className="mt-6 text-center text-xs text-gray-500">
          Teste: <b>ana</b> (aluna) ou <b>carla</b> (professora), senha <b>1234</b>
        </p>
      </div>
    </main>
  );
}
