import logoUrl from "@/assets/easyterra-logo.png";

/**
 * Official EasyTerra wordmark + globe/car icon.
 * Sourced from easyterra.nl. The "light" variant is for use on the brand-blue
 * background; the "dark" variant adds a blue pill behind the logo so it stays
 * legible on white surfaces.
 */
export function EasyTerraLogo({
  variant = "light",
  size = "md",
}: {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}) {
  const height = size === "lg" ? 38 : size === "sm" ? 22 : 28;

  const img = (
    <img
      src={logoUrl}
      alt="EasyTerra"
      style={{ height }}
      className="block w-auto select-none"
      draggable={false}
    />
  );

  if (variant === "dark") {
    return (
      <span className="inline-flex items-center rounded-md bg-primary px-2 py-1">
        {img}
      </span>
    );
  }

  return img;
}
