import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Ticket } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { EasyTerraLogo } from "@/components/EasyTerraLogo";

export const Route = createFileRoute("/app/login")({
  component: LoginScreen,
});

function LoginScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "lookup">("login");

  return (
    <PhoneFrame showTabs={false}>
      <div className="relative h-full">
        {/* blue hero */}
        <div className="bg-primary px-6 pt-6 pb-10 text-primary-foreground">
          <EasyTerraLogo />
          <h1 className="mt-10 text-[28px] font-bold leading-tight">
            Welkom terug
          </h1>
          <p className="mt-1 text-sm opacity-85">
            Log in om je boeking en voucher te bekijken.
          </p>
        </div>

        <div className="-mt-6 rounded-t-3xl bg-background px-6 pt-6">
          {/* tabs */}
          <div className="mb-6 flex rounded-full bg-muted p-1 text-sm font-semibold">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 rounded-full py-2 transition ${
                tab === "login" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Inloggen
            </button>
            <button
              onClick={() => setTab("lookup")}
              className={`flex-1 rounded-full py-2 transition ${
                tab === "lookup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Boeking ophalen
            </button>
          </div>

          {tab === "login" ? (
            <div className="space-y-4">
              <Field icon={<Mail className="h-4 w-4" />} label="E-mailadres" placeholder="naam@email.nl" defaultValue="lieke@example.nl" />
              <Field icon={<Lock className="h-4 w-4" />} label="Wachtwoord" placeholder="••••••••" type="password" defaultValue="demoboeking" />
              <button className="text-right block w-full text-xs font-semibold text-primary">
                Wachtwoord vergeten?
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <Field icon={<Ticket className="h-4 w-4" />} label="Boekingsnummer" placeholder="ET-XXXX-XXXX" defaultValue="ET-2845-9921" />
              <Field label="Achternaam" placeholder="Achternaam" defaultValue="de Vries" />
            </div>
          )}

          <button
            onClick={() => navigate({ to: "/app/bookings" })}
            className="mt-8 w-full rounded-2xl bg-accent py-4 text-base font-semibold text-accent-foreground shadow-sm active:scale-[0.99]"
          >
            {tab === "login" ? "Inloggen" : "Boeking ophalen"}
          </button>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Nog geen account?{" "}
            <Link to="/app/login" className="font-semibold text-primary">
              Maak er een
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">of</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <button className="mt-4 w-full rounded-2xl border border-border bg-background py-3.5 text-sm font-semibold text-foreground">
             Ga verder met Apple
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Field({
  icon,
  label,
  placeholder,
  type = "text",
  defaultValue,
}: {
  icon?: React.ReactNode;
  label: string;
  placeholder: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2 rounded-2xl border border-border bg-muted/40 px-4 py-3.5 focus-within:border-primary focus-within:bg-background">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className="w-full bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
    </label>
  );
}
