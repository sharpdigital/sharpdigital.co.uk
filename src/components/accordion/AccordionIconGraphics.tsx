export const AccordionIconGraphics = ({ className }: { className?: string }) => (
  <svg
    className={`accordion-icon-graphics${className ? ` ${className}` : ''}`}
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="31.5" stroke="var(--iconColor)" />
    <path
      className="accordion-icon-path path-1"
      d="M46 32.33H18V31H46V32.33Z"
      fill="var(--iconColor)"
    />
    <path
      className="accordion-icon-path path-2"
      d="M46 32.33H18V31H46V32.33Z"
      fill="var(--iconColor)"
    />
  </svg>
);
