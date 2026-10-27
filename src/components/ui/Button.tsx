import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-[#2563EB] text-white shadow-[0_10px_30px_-16px_rgba(37,99,235,0.9)] hover:bg-[#1D4ED8]",
  secondary: "border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.08]",
  light: "bg-white text-[#0B1220] hover:bg-[#E8EEF9]",
  ghost: "text-[#E2E8F0] hover:bg-white/5 hover:text-white",
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-center text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonAsButton = Common & {
  href?: undefined;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonAsLink = Common & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const className = cn(base, variants[props.variant ?? "primary"], props.className);

  if (props.href) {
    const external = props.external || props.href.startsWith("http");
    if (external || props.href.startsWith("#")) {
      return (
        <a
          href={props.href}
          className={className}
          onClick={props.onClick}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {props.children}
        </a>
      );
    }

    return (
      <Link href={props.href} className={className} onClick={props.onClick}>
        {props.children}
      </Link>
    );
  }

  const button = props as ButtonAsButton;

  return (
    <button
      type={button.type ?? "button"}
      className={className}
      onClick={button.onClick}
      disabled={button.disabled}
    >
      {button.children}
    </button>
  );
}
