const marcas = Array.from({ length: 19 }, (_, i) => i);

export default function Regua({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 30" className={className} aria-hidden="true">
      <rect x="2" y="2" width="196" height="26" rx="3" fill="#8cc0e8" opacity="0.85" />
      {marcas.map((i) => (
        <rect key={i} x={10 + i * 10} y="2" width="1.5" height={i % 2 === 0 ? 12 : 7} fill="#2563b8" />
      ))}
    </svg>
  );
}
