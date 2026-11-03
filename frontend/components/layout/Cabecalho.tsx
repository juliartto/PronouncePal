"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/decor/Logo";
import { useAuth } from "@/contexts/AuthContext";

export default function Cabecalho() {
  const { usuario, sair } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const estiloLink = "rounded px-3 py-1 transition hover:bg-lousa-clara";
  const estiloAtivo = "underline decoration-lapis decoration-2 underline-offset-4";

  function handleSair() {
    sair();
    router.replace("/");
  }

  return (
    <header className="border-b-[8px] border-madeira bg-lousa textura-lousa text-giz shadow-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div>
          <Logo claro />
          <p className="font-giz text-xl">Bem-vindo(a), {usuario?.nome}!</p>
        </div>

        <nav className="flex items-center gap-1 font-giz text-xl">
          <Link href="/inicio" className={`${estiloLink} ${pathname === "/inicio" ? estiloAtivo : ""}`}>
            Início
          </Link>
          {usuario?.papel === "professor" && (
            <Link href="/professor" className={`${estiloLink} ${pathname.startsWith("/professor") ? estiloAtivo : ""}`}>
              Área do Professor
            </Link>
          )}
          <button onClick={handleSair} className={estiloLink}>
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
}
