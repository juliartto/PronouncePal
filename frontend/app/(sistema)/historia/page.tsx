import { Suspense } from "react";
import ConteudoHistoria from "./ConteudoHistoria";

// useSearchParams precisa de Suspense na exportação estática
export default function PaginaHistoria() {
  return (
    <Suspense fallback={<p className="text-center font-giz text-2xl text-lousa">Carregando...</p>}>
      <ConteudoHistoria />
    </Suspense>
  );
}
