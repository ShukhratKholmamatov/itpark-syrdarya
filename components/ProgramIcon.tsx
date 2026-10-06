const paths: Record<string, React.ReactNode> = {
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 15c-1 1.5-1.5 4-1.5 4s2.5-.5 4-1.5" />
      <path d="M9 15l-2-2c1-5 4.5-9 10-9 0 5.5-4 9-9 10z" />
      <circle cx="14.5" cy="9.5" r="1.4" />
    </>
  ),
  plane: (
    <>
      <path d="M10.5 3.5c.8-.8 1.7-.8 2 .5l1 4 5 1c1 .3 1 1.3.3 1.8l-3.5 2 .8 5.2c.1.9-.9 1.3-1.5.6l-2.9-3.4-2.9 1.7c-1 .6-2-.4-1.4-1.4l1.7-2.9-3.4-2.9c-.7-.6-.3-1.6.6-1.5l5.2.8 2-3.5z" />
    </>
  ),
  passport: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M9 16h6" />
    </>
  ),
  badge: (
    <>
      <path d="M12 3l2.3 1.7 2.8-.3 1 2.7 2.5 1.3-.8 2.7.8 2.7-2.5 1.3-1 2.7-2.8-.3L12 21l-2.3-1.7-2.8.3-1-2.7L3.4 15l.8-2.7L3.4 9.6l2.5-1.3 1-2.7 2.8.3L12 3z" />
      <path d="M9.5 12l1.8 1.8 3.2-3.6" />
    </>
  ),
};

export function ProgramIcon({
  name,
  className = "h-7 w-7",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? paths.badge}
    </svg>
  );
}
