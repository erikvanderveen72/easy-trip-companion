import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface AppHeaderProps {
  title: string;
  back?: string;
  backParams?: Record<string, string>;
  right?: ReactNode;
  variant?: "light" | "blue";
}

export function AppHeader({
  title,
  back,
  backParams,
  right,
  variant = "light",
}: AppHeaderProps) {
  const blue = variant === "blue";
  return (
    <div
      className={`sticky top-0 z-10 flex items-center justify-between px-5 py-3 ${
        blue ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
      }`}
    >
      <div className="w-10">
        {back && (
          <Link
            to={back}
            params={backParams as never}
            className={`-ml-2 flex h-9 w-9 items-center justify-center rounded-full ${
              blue ? "hover:bg-white/10" : "hover:bg-muted"
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </Link>
        )}
      </div>
      <h1 className="text-[17px] font-semibold">{title}</h1>
      <div className="flex w-10 justify-end">{right}</div>
    </div>
  );
}
