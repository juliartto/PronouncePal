"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtegerRota({ children }: { children: React.ReactNode }) {
  const { usuario, carregando } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!carregando && !usuario) router.replace("/");
  }, [carregando, usuario, router]);

  if (carregando || !usuario) {
    return <p className="p-8 text-center font-giz text-2xl text-lousa">Carregando...</p>;
  }

  return <>{children}</>;
}
