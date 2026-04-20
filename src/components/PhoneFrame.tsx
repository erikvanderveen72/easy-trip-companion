import { Link, useLocation } from "@tanstack/react-router";
import { Calendar, User, Signal, Wifi, BatteryFull } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  showTabs?: boolean;
}

const tabs = [
  { to: "/app/bookings", label: "Boekingen", icon: Calendar },
  { to: "/app/profile", label: "Profiel", icon: User },
] as const;

export function PhoneFrame({ children, showTabs = true }: PhoneFrameProps) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
      );
    tick();
    const i = setInterval(tick, 30_000);
    return () => clearInterval(i);
  }, []);
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary px-4 py-8">
      <div
        className="relative w-[390px] h-[844px] rounded-[55px] bg-[#0b1220] p-[14px]"
        style={{ boxShadow: "var(--shadow-phone)" }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[42px] bg-background">
          {/* status bar */}
          <div className="absolute inset-x-0 top-0 z-30 flex h-12 items-center justify-between px-7 pt-2 text-[13px] font-semibold text-foreground">
            <span>{time}</span>
            <div className="absolute left-1/2 top-2 h-[28px] w-[110px] -translate-x-1/2 rounded-full bg-[#0b1220]" />
            <div className="flex items-center gap-1">
              <Signal className="h-3.5 w-3.5" />
              <Wifi className="h-3.5 w-3.5" />
              <BatteryFull className="h-4 w-4" />
            </div>
          </div>

          <div className="h-full overflow-y-auto pt-12 pb-24">{children}</div>

          {showTabs && (
            <nav className="absolute inset-x-0 bottom-0 z-20 bg-primary text-primary-foreground">
              <div className="flex items-end justify-around px-2 pt-2 pb-6">
                {tabs.map(({ to, label, icon: Icon }) => {
                  const active = location.pathname.startsWith(to);
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1 transition ${
                        active ? "text-white" : "text-white/60"
                      }`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={active ? 2.5 : 2} />
                      <span className="text-[10px] font-semibold tracking-wide">
                        {label}
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="mx-auto mb-1 h-1 w-32 rounded-full bg-white/80" />
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}
