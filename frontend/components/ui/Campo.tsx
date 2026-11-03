interface CampoProps {
  id: string;
  rotulo: string;
  erro?: string;
  children: React.ReactNode;
}

export default function Campo({ id, rotulo, erro, children }: CampoProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-bold text-lousa">
        {rotulo}
      </label>
      {children}
      {erro && (
        <p id={`${id}-erro`} className="text-sm font-semibold text-maca">
          {erro}
        </p>
      )}
    </div>
  );
}

export function classesInput(temErro = false) {
  return `w-full rounded-lg border-2 bg-white px-3 py-2 outline-none transition focus:ring-2 focus:ring-lapis ${
    temErro ? "border-maca" : "border-linha focus:border-lousa"
  }`;
}
