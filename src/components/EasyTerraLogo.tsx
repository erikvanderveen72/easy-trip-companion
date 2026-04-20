import { Car } from "lucide-react";

export function EasyTerraLogo({
  variant = "light",
  size = "md",
}: {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}) {
  const s = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-lg";
  const dot = size === "lg" ? "h-9 w-9" : size === "sm" ? "h-6 w-6" : "h-7 w-7";
  return (
    <div className="flex items-center gap-2">
      <div className={`${dot} flex items-center justify-center rounded-full bg-accent`}>
        <Car className="h-4 w-4 text-accent-foreground" strokeWidth={2.5} />
      </div>
      <span
        className={`${s} font-extrabold tracking-tight ${
          variant === "dark" ? "text-foreground" : "text-primary-foreground"
        }`}
      >
        Easy<span className={variant === "dark" ? "text-primary" : "text-white"}>Terra</span>
      </span>
    </div>
  );
}
