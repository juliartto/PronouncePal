const marcas = [20, 40, 60, 80, 100, 120, 140, 160, 180];

export default function Regua({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 30" className={className} aria-hidden="true">
      <rect x="2" y="2" width="196" height="26" rx="3" className="fill-linha" />
      {marcas.map((x) => (
        <rect key={x} x={x} y="2" width="2" height="10" className="fill-lousa" />
      ))}
    </svg>
  );
}
