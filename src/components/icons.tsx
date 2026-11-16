import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2.5 3h2l2.2 11.2a1.6 1.6 0 0 0 1.6 1.3h8.9a1.6 1.6 0 0 0 1.6-1.3L20.5 7H6" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
    </Base>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </Base>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </Base>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m9 6 6 6-6 6" />
    </Base>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </Base>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </Base>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2.6l2.72 5.83 6.28.83-4.6 4.44 1.16 6.4L12 17.03 6.44 20.1l1.16-6.4L3 9.26l6.28-.83L12 2.6z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 2.8l7 2.8v5.5c0 4.4-2.9 8.4-7 9.7-4.1-1.3-7-5.3-7-9.7V5.6l7-2.8z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M2.5 6.5h10.8v9H2.5z" />
      <path d="M13.3 10h3.9l3.3 3.3v2.2h-7.2z" />
      <circle cx="6.5" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </Base>
  );
}

export function FlameIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 2.5s5.5 4.2 5.5 9.2a5.5 5.5 0 1 1-11 0c0-2 1-3.4 1-3.4s.6 1.6 2 2c0-3.2 2.5-7.8 2.5-7.8z" />
    </Base>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13 2.5 4.5 13.5H11l-.8 8 8.8-11H12.5l.5-8z" />
    </Base>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20 4C10 4 4.5 8.5 4.5 15.5c0 2 .6 3.6 1.4 4.8C9 17 12 14.5 16 13c-3 2-5.5 4.5-7.5 7.8 1 .5 2.3.8 3.7.8 6.3 0 10.5-5.5 10.5-13 0-1.6-.1-3-.7-4.6z" />
    </Base>
  );
}

export function ThermometerIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M13.8 14.3V5a2 2 0 1 0-4 0v9.3a4 4 0 1 0 4 0z" />
      <path d="M11.8 7.5v7.2" />
    </Base>
  );
}

export function RulerIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M3.5 14.2 14.2 3.5l6.3 6.3L9.8 20.5l-6.3-6.3z" />
      <path d="m7 10.7 1.8 1.8M10 7.7l1.8 1.8M13 4.7l1.8 1.8" />
    </Base>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Base>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
    </Base>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7h16M9.5 7V4.8h5V7M6.5 7l1 13h9l1-13" />
      <path d="M10.5 11v5.5M13.5 11v5.5" />
    </Base>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="8.2" r="3.8" />
      <path d="M4.5 20.2a7.5 7.5 0 0 1 15 0" />
    </Base>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M6.2 3.5h3l1.5 3.8-2 1.4a12.5 12.5 0 0 0 6.6 6.6l1.4-2 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8A16.8 16.8 0 0 1 4.4 5.5a1.8 1.8 0 0 1 1.8-2z" />
    </Base>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.6 6.5 8.4 6 8.4-6" />
    </Base>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </Base>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8.7" />
      <path d="M12 7v5.3l3.4 2" />
    </Base>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </Base>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </Base>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="2.8" y="5.5" width="18.4" height="13" rx="4" />
      <path d="m10.2 9.4 4.6 2.6-4.6 2.6z" />
    </Base>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </Base>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m12 2.8 8.5 4.4v9.6L12 21.2 3.5 16.8V7.2L12 2.8z" />
      <path d="M3.5 7.2 12 11.6l8.5-4.4M12 11.6v9.6" />
    </Base>
  );
}

export function GiftIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="8.5" width="18" height="4" rx="1" />
      <path d="M4.5 12.5V20h15v-7.5M12 8.5V20" />
      <path d="M12 8.5S10.8 4 8.3 4a2.2 2.2 0 0 0 0 4.5H12zM12 8.5s1.2-4.5 3.7-4.5a2.2 2.2 0 0 1 0 4.5H12z" />
    </Base>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </Base>
  );
}
