import logoUrl from "@/assets/easyterra-logo-blue.png";

/**
 * Official EasyTerra logo lockup (already on its brand-blue background).
 * Rendered as a single image — no extra pill wrapper needed.
 */
export function EasyTerraLogo({
  size = "md",
}: {
  /** Kept for backwards compatibility. */
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}) {
  const height = size === "lg" ? 56 : size === "sm" ? 32 : 44;

  return (
    <img
      src={logoUrl}
      alt="EasyTerra"
      style={{ height }}
      className="block w-auto select-none rounded-md"
      draggable={false}
    />
  );
}
