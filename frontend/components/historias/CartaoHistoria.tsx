import Link from "next/link";
import type { Historia } from "@/types";
import { coresNivel } from "./cores";
import EtiquetaNivel from "./EtiquetaNivel";

export default function CartaoHistoria({ historia }: { historia: Historia }) {
  const frasesParaPraticar = historia.frases.filter((f) => f.praticar).length;

  return (
    <Link
      href={`/historia?id=${historia.id}`}
      className="group flex overflow-hidden rounded-r-xl rounded-l-sm bg-papel shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <span className={`w-4 shrink-0 ${coresNivel[historia.nivel].lombada}`} />
      <div className="folha-caderno flex flex-1 flex-col gap-2 py-4 pl-14 pr-4">
        <h3 className="font-giz text-2xl leading-8 text-lousa group-hover:underline">{historia.titulo}</h3>
        <div>
          <EtiquetaNivel nivel={historia.nivel} />
        </div>
        <p className="text-sm text-gray-600">
          {frasesParaPraticar} frases para praticar · {historia.autor}
        </p>
      </div>
    </Link>
  );
}
