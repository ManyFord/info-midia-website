import { cn } from "@/lib/cn";

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium tracking-[0.2em] text-[#7DD3FC] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="text-[clamp(1.875rem,3.1vw,3.15rem)] leading-[1.12] font-semibold tracking-tight text-balance text-[#F8FAFC]"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-[#94A3B8] sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
