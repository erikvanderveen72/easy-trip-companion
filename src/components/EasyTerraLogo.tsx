import logoUrl from "@/assets/easyterra-logo-blue.png";

/**
 * Official EasyTerra logo lockup.
 * The asset already includes the brand-blue background, so on blue surfaces
 * we render it bare (`onBlue`) to blend in. On light surfaces we keep the
 * blue tile visible as a self-contained badge.
 */
export function EasyTerraLogo({
  size = "md",
  onBlue = false,
}: {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  /** Set to true when the surface behind the logo is already brand-blue. */
  onBlue?: boolean;
}) {
  const height = size === "lg" ? 56 : size === "sm" ? 32 : 44;

  return (
    <img
      src={logoUrl}
      alt="EasyTerra"
      style={{ height }}
      className={`block w-auto select-none ${onBlue ? "" : "rounded-md"}`}
      draggable={false}
    />
  );
}
