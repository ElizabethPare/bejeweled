import type { CSSProperties } from "react";

export function SparkleIcon({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M12 2C12.3 6.5 13.5 10 18 12C13.5 14 12.3 17.5 12 22C11.7 17.5 10.5 14 6 12C10.5 10 11.7 6.5 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

type IconProps = { className?: string; style?: CSSProperties };

export function RingIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} style={style} aria-hidden="true">
      <circle cx="32" cy="38" r="18" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M32 20L24 8H40L32 20Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M24 8L20 16M40 8L44 16" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function NecklaceIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M10 14C10 30 20 42 32 42C44 42 54 30 54 14"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M32 42L26 54H38L32 42Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EarringIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M32 8C38 8 42 12 42 18C42 24 32 28 32 28C32 28 22 24 22 18C22 12 26 8 32 8Z"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path d="M32 28V42" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="48" r="6" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

export function BraceletIcon({ className = "", style }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} style={style} aria-hidden="true">
      <ellipse cx="32" cy="32" rx="22" ry="14" stroke="currentColor" strokeWidth="2.5" />
      <path d="M12 28L20 24M52 28L44 24M12 36L20 40M52 36L44 40" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export const categoryIcon = {
  Rings: RingIcon,
  Necklaces: NecklaceIcon,
  Earrings: EarringIcon,
  Bracelets: BraceletIcon,
};

export function BagIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 8h12l1 13H5L6 8Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TrashIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 12h16M14 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 13l4 4L19 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
