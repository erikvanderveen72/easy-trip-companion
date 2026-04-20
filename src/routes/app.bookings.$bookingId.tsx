import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Calendar,
  Clock,
  ShieldCheck,
  Ticket,
  Navigation,
  FileText,
  ChevronRight,
  CalendarClock,
  UserPlus,
  Receipt,
  XCircle,
  LifeBuoy,
  Download,
  type LucideIcon,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { AppHeader } from "@/components/AppHeader";
import { getBooking, formatDate, formatTime, daysBetween } from "@/lib/demo-data";

export const Route = createFileRoute("/app/bookings/$bookingId")({
  loader: ({ params }) => {
    const booking = getBooking(params.bookingId);
    if (!booking) throw notFound();
    return booking;
  },
  component: BookingDetail,
  notFoundComponent: () => (
    <PhoneFrame showTabs={false}>
      <div className="px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">Boeking niet gevonden.</p>
        <Link to="/app/bookings" className="mt-4 inline-block text-primary font-semibold">
          Terug naar boekingen
        </Link>
      </div>
    </PhoneFrame>
  ),
});

function BookingDetail() {
  const b = Route.useLoaderData();
  const days = daysBetween(b.pickupDate, b.dropoffDate);
  const isUpcoming = b.status === "upcoming";

  return (
    <PhoneFrame>
      <AppHeader title="Boekingsdetails" back="/app/bookings" variant="blue" />

      {/* hero */}
      <div className="relative h-56 bg-muted">
        <img src={b.carImage} alt={b.carName} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          {b.worryFree && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-foreground">
              <ShieldCheck className="h-3 w-3" /> Worry-Free
            </span>
          )}
          <span className="rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-bold text-foreground">
            {b.supplier}
          </span>
        </div>
      </div>

      <div className="-mt-6 px-5">
        <div
          className="rounded-3xl bg-background p-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {b.carCategory}
          </p>
          <h2 className="mt-1 text-2xl font-bold text-foreground">{b.carName}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Boekingsnr: <span className="font-semibold text-foreground">{b.reference}</span>
          </p>

          <Link
            to="/app/vouchers/$bookingId"
            params={{ bookingId: b.id }}
            className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground"
          >
            <Ticket className="h-4 w-4" /> Toon voucher
          </Link>
        </div>

        {/* trip blocks */}
        <div
          className="mt-4 rounded-3xl bg-background p-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <TripBlock
            label="Ophalen"
            date={b.pickupDate}
            location={b.pickupLocation}
            address={b.pickupAddress}
          />
          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-primary">
              {days} dagen
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <TripBlock
            label="Inleveren"
            date={b.dropoffDate}
            location={b.dropoffLocation}
          />
        </div>

        {/* map */}
        <div
          className="mt-4 overflow-hidden rounded-3xl bg-background"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="relative h-36 bg-secondary">
            <svg viewBox="0 0 400 144" className="h-full w-full">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="oklch(0.9 0.02 255)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="400" height="144" fill="url(#grid)" />
              <path d="M 20 110 Q 100 40 200 80 T 380 50" stroke="var(--et-blue)" strokeWidth="3" fill="none" strokeLinecap="round" />
              <circle cx="20" cy="110" r="6" fill="var(--et-green)" />
              <circle cx="380" cy="50" r="6" fill="var(--et-blue)" />
            </svg>
            <button className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background px-3 py-2 text-xs font-semibold text-primary shadow-sm">
              <Navigation className="h-3.5 w-3.5" /> Route
            </button>
          </div>
        </div>

        {/* BEHEER */}
        <h3 className="mt-6 mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Beheer deze auto
        </h3>
        <div
          className="overflow-hidden rounded-3xl bg-background"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <ManageRow
            icon={CalendarClock}
            label="Wijzig datum of tijd"
            sub={isUpcoming ? "Gratis tot 24 uur vóór ophaal" : "Niet meer mogelijk"}
            disabled={!isUpcoming}
          />
          <ManageRow
            icon={UserPlus}
            label="Extra bestuurder toevoegen"
            sub="€ 5 per dag"
            disabled={!isUpcoming}
          />
          <ManageRow
            icon={ShieldCheck}
            label={b.worryFree ? "Worry-Free actief" : "Worry-Free toevoegen"}
            sub={b.worryFree ? "€ 0 eigen risico" : "Vanaf € 5,57 per dag"}
          />
          <ManageRow
            to="/app/support"
            icon={LifeBuoy}
            label={`Hulp nodig? Contact ${b.supplier}`}
            sub="Partner-specifieke support"
          />
        </div>

        {/* Documenten */}
        <h3 className="mt-6 mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Documenten
        </h3>
        <div
          className="overflow-hidden rounded-3xl bg-background"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <ManageRow icon={Receipt} label="Factuur downloaden" sub={`PDF · € ${b.totalPrice.toFixed(2)}`} trailing={<Download className="h-4 w-4 text-muted-foreground" />} />
          <ManageRow icon={FileText} label="Huurvoorwaarden" sub="PDF · 240 kB" trailing={<Download className="h-4 w-4 text-muted-foreground" />} />
        </div>

        {/* price */}
        <div
          className="mt-6 rounded-3xl bg-background p-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h3 className="text-sm font-bold text-foreground">Prijsoverzicht</h3>
          <div className="mt-3 space-y-2 text-sm">
            <PriceRow label={`Huurperiode (${days} dagen)`} value={b.totalPrice - (b.worryFree ? 39 : 0)} />
            {b.worryFree && <PriceRow label="Worry-Free pakket" value={39} />}
            <div className="my-2 h-px bg-border" />
            <div className="flex justify-between text-base">
              <span className="font-bold text-foreground">Totaal betaald</span>
              <span className="font-bold text-foreground">€ {b.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {isUpcoming && (
          <>
            <button className="mt-6 mb-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-background py-3.5 text-sm font-semibold text-destructive">
              <XCircle className="h-4 w-4" /> Boeking annuleren
            </button>
            <p className="mb-6 text-center text-[11px] text-muted-foreground">
              Gratis annuleren tot 48 uur voor ophalen
            </p>
          </>
        )}
      </div>
    </PhoneFrame>
  );
}

function TripBlock({
  label,
  date,
  location,
  address,
}: {
  label: string;
  date: string;
  location: string;
  address?: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{label}</p>
      <p className="mt-1 text-base font-semibold text-foreground">{location}</p>
      {address && <p className="mt-0.5 text-xs text-muted-foreground">{address}</p>}
      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" /> {formatDate(date)}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> {formatTime(date)}
        </span>
      </div>
    </div>
  );
}

function ManageRow({
  icon: Icon,
  label,
  sub,
  to,
  disabled,
  trailing,
}: {
  icon: LucideIcon;
  label: string;
  sub?: string;
  to?: string;
  disabled?: boolean;
  trailing?: React.ReactNode;
}) {
  const inner = (
    <div className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${disabled ? "opacity-50" : ""}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
      {trailing ?? <ChevronRight className="h-4 w-4 text-muted-foreground" />}
    </div>
  );
  if (to && !disabled) {
    return (
      <Link to={to} className="block border-b border-border last:border-b-0">
        {inner}
      </Link>
    );
  }
  return (
    <button
      type="button"
      disabled={disabled}
      className="block w-full border-b border-border last:border-b-0"
    >
      {inner}
    </button>
  );
}

function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground">€ {value.toFixed(2)}</span>
    </div>
  );
}
