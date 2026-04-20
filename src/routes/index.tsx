import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Smartphone } from "lucide-react";
import { EasyTerraLogo } from "@/components/EasyTerraLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EasyTerra App — Concept Prototype" },
      {
        name: "description",
        content:
          "Interactief concept van de EasyTerra iOS app voor klanten met boekingen, vouchers en support.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="rounded-full bg-primary px-4 py-2">
          <EasyTerraLogo />
        </div>
        <span className="rounded-full bg-background px-3 py-1 text-xs font-semibold text-muted-foreground shadow-sm">
          Concept · v1
        </span>
      </header>

      <main className="mx-auto grid max-w-6xl gap-12 px-6 pb-16 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <Smartphone className="h-3.5 w-3.5" /> iOS App — Klantportaal
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Jouw boeking, voucher en support — altijd in je broekzak.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Een interactief concept van de EasyTerra iPhone-app. Open op je telefoon
            of klik door om de flow te ervaren: van inloggen tot het tonen van je
            voucher bij de balie.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/app/login"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              Open prototype <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/app/bookings"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Skip naar Mijn boekingen
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
            {[
              ["5 schermen", "Login · Boekingen · Details · Voucher · Support"],
              ["Huisstijl", "EasyTerra blauw + Worry-Free groen"],
              ["Native feel", "iOS layout · tab bar · Wallet-style pas"],
              ["Echte data", "Realistische demo-boekingen"],
            ].map(([t, d]) => (
              <div
                key={t}
                className="rounded-2xl border border-border bg-background p-4 shadow-sm"
              >
                <div className="font-semibold text-foreground">{t}</div>
                <div className="mt-1 text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Preview />
        </div>
      </main>
    </div>
  );
}

function Preview() {
  return (
    <Link
      to="/app/login"
      className="group relative block w-[300px] rounded-[44px] bg-[#0b1220] p-[10px] transition hover:scale-[1.02]"
      style={{ boxShadow: "var(--shadow-phone)" }}
    >
      <div className="overflow-hidden rounded-[34px] bg-primary">
        <div className="flex h-[600px] flex-col items-center justify-center gap-4 px-8 text-center text-primary-foreground">
          <EasyTerraLogo size="lg" />
          <p className="mt-4 text-sm opacity-80">Welkom terug</p>
          <h2 className="text-2xl font-bold">Tik om de app te openen</h2>
          <div className="mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
            Open prototype →
          </div>
        </div>
      </div>
    </Link>
  );
}
