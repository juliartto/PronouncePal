export default function Lapis({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} aria-hidden="true">
      <polygon points="32,8 32,32 4,20" fill="#f3d9a4" />
      <polygon points="13,15.5 13,24.5 4,20" fill="#2b2b2b" />
      <rect x="32" y="8" width="136" height="24" fill="#f6c344" />
      <rect x="32" y="16" width="136" height="8" fill="#f9d468" />
      <rect x="168" y="8" width="12" height="24" fill="#b8b8b8" />
      <rect x="171" y="8" width="2" height="24" fill="#9a9a9a" />
      <rect x="175" y="8" width="2" height="24" fill="#9a9a9a" />
      <rect x="180" y="8" width="16" height="24" rx="4" fill="#f29ca3" />
    </svg>
  );
}
