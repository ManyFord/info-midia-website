import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  priority = false,
  size = "md",
}: {
  className?: string;
  priority?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl bg-white px-2 py-1",
        className,
      )}
    >
      <Image
        src="/brand/logo.png"
        alt="InfoMídia Sistemas"
        width={902}
        height={363}
        priority={priority}
        className={cn("w-auto", size === "sm" ? "h-8" : "h-10 sm:h-11")}
      />
    </span>
  );
}
