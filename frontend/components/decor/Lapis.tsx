export default function Lapis({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} aria-hidden="true">
      <polygon points="32,8 32,32 4,20" className="fill-madeira" />
      <rect x="32" y="8" width="148" height="24" className="fill-lapis" />
      <rect x="180" y="8" width="16" height="24" rx="4" className="fill-maca" />
    </svg>
  );
}
