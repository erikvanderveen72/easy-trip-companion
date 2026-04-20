/**
 * EasyTerra wordmark.
 * Reproduces the easyterra.nl logo: lowercase "easy" + bold "terra"
 * with the brand-blue and brand-green color split.
 */
export function EasyTerraLogo({
  variant = "light",
  size = "md",
}: {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}) {
  const fontSize = size === "lg" ? 30 : size === "sm" ? 18 : 22;
  // On dark/blue surfaces "easy" goes white, "terra" stays green for contrast.
  const easyColor = variant === "light" ? "#ffffff" : "var(--et-blue)";
  const terraColor = variant === "light" ? "var(--et-green)" : "var(--et-green-deep)";

  return (
    <span
      aria-label="EasyTerra"
      className="inline-flex select-none items-baseline font-extrabold tracking-tight"
      style={{ fontSize, lineHeight: 1, letterSpacing: "-0.02em" }}
    >
      <span style={{ color: easyColor }}>easy</span>
      <span style={{ color: terraColor }}>terra</span>
    </span>
  );
}
