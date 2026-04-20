import { createFileRoute, Link } from "@tanstack/react-router";
import {
  User,
  CreditCard,
  Bell,
  Globe,
  ShieldCheck,
  FileText,
  ChevronRight,
  LogOut,
  Star,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { EasyTerraLogo } from "@/components/EasyTerraLogo";

export const Route = createFileRoute("/app/profile")({
  component: ProfileScreen,
});

function ProfileScreen() {
  return (
    <PhoneFrame>
      {/* blue brand band */}
      <div className="bg-primary px-5 pt-4 pb-10 text-primary-foreground">
        <EasyTerraLogo size="sm" onBlue />
        <h1 className="mt-5 text-[28px] font-bold leading-tight">Profiel</h1>
      </div>

      {/* profile card overlapping band */}
      <div className="-mt-6 px-5">
        <div
          className="flex items-center gap-4 rounded-3xl bg-background p-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            LV
          </div>
          <div className="flex-1">
            <p className="text-lg font-bold text-foreground">Lieke de Vries</p>
            <p className="text-xs text-muted-foreground">lieke@example.nl</p>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold text-primary">
              <Star className="h-3 w-3 fill-current" /> Loyalty · 3 boekingen
            </div>
          </div>
        </div>

        {/* quick stats */}
        <div className="mt-3 grid grid-cols-3 gap-3">
          <Stat label="Boekingen" value="3" />
          <Stat label="Landen" value="2" />
          <Stat label="Bespaard" value="€84" />
        </div>
      </div>
      {/* sections */}
      <Section title="Account">
        <Row to="/app/profile" icon={<User className="h-4 w-4" />} label="Persoonsgegevens" />
        <Row to="/app/profile" icon={<CreditCard className="h-4 w-4" />} label="Betaalmethodes" sub="Visa •••• 4421" />
        <Row to="/app/profile" icon={<FileText className="h-4 w-4" />} label="Rijbewijs" sub="Geverifieerd" verified />
      </Section>

      <Section title="Voorkeuren">
        <Row to="/app/profile" icon={<Bell className="h-4 w-4" />} label="Notificaties" sub="Aan" />
        <Row to="/app/profile" icon={<Globe className="h-4 w-4" />} label="Taal & valuta" sub="Nederlands · EUR" />
      </Section>

      <Section title="Hulp">
        <Row to="/app/support" icon={<ShieldCheck className="h-4 w-4" />} label="Veiligheid & privacy" />
        <Row to="/app/support" icon={<FileText className="h-4 w-4" />} label="Algemene voorwaarden" />
      </Section>

      <div className="mx-5 my-5">
        <Link
          to="/app/login"
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background py-3.5 text-sm font-semibold text-destructive"
        >
          <LogOut className="h-4 w-4" /> Uitloggen
        </Link>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          EasyTerra v1.0.0 · Concept prototype
        </p>
      </div>
    </PhoneFrame>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-2xl bg-background p-3 text-center"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <p className="text-lg font-bold text-foreground">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 px-5">
      <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div
        className="overflow-hidden rounded-3xl bg-background"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {children}
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  sub,
  verified,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  verified?: boolean;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 border-b border-border px-4 py-3.5 last:border-b-0"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
        {icon}
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
      {verified && (
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
          ✓
        </span>
      )}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  );
}
