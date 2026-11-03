import Lousa from "@/components/decor/Lousa";

interface TituloPaginaProps {
  titulo: string;
  subtitulo?: string;
}

export default function TituloPagina({ titulo, subtitulo }: TituloPaginaProps) {
  return (
    <Lousa className="mb-8">
      <h1 className="text-3xl sm:text-4xl">{titulo}</h1>
      {subtitulo && <p className="mt-1 text-lg opacity-80">{subtitulo}</p>}
    </Lousa>
  );
}
