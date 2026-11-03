export default function Livros({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" className={className} aria-hidden="true">
      <rect x="6" y="46" width="108" height="20" rx="3" className="fill-maca" />
      <rect x="16" y="26" width="92" height="20" rx="3" className="fill-lousa" />
      <rect x="10" y="6" width="96" height="20" rx="3" className="fill-lapis" />
    </svg>
  );
}
