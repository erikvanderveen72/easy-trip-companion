import logoUrl from "@/assets/easyterra-logo.webp";

/**
 * Official EasyTerra logo (globe + car + wordmark).
 * Always rendered inside a brand-blue pill so the black wordmark stays
 * legible on both light and dark surfaces.
 */
export function EasyTerraLogo({
  size = "md",
}: {
  /** Kept for backwards compatibility — visual is the same on any surface. */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}) {
  const height = size === "lg" ? 36 : size === "sm" ? 20 : 26;

  return (
    <span className="inline-flex items-center rounded-lg bg-primary px-2.5 py-1.5">
      <img
        src={logoUrl}
        alt="EasyTerra"
        style={{ height }}
        className="block w-auto select-none"
        draggable={false}
      />
    </span>
  );
}
