import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Calendar, ShieldCheck, Bell, Ticket, Settings, LifeBuoy } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { EasyTerraLogo } from "@/components/EasyTerraLogo";
import { bookings, formatDate, daysBetween, type Booking } from "@/lib/demo-data";

export const Route = createFileRoute("/app/bookings")({
  component: BookingsScreen,
});

function BookingsScreen() {
  const [tab, setTab] = useState<"upcoming" | "completed">("upcoming");
  const list = bookings.filter((b) =>
    tab === "upcoming" ? b.status === "upcoming" : b.status === "completed",
  );

  return (
    <PhoneFrame>
      {/* blue brand band */}
      <div className="bg-primary px-5 pt-4 pb-6 text-primary-foreground">
        <div className="flex items-center justify-between">
          <EasyTerraLogo size="sm" onBlue />
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
          </button>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide opacity-85">
          Hi Lieke 👋
        </p>
        <h1 className="mt-1 text-[28px] font-bold leading-tight">
          Mijn boekingen
        </h1>
      </div>

      {/* segmented overlapping band */}
      <div className="-mt-4 px-5">
        <div className="flex rounded-full bg-background p-1 text-sm font-semibold shadow-sm">
          {(["upcoming", "completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-full py-2 transition ${
                tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {t === "upcoming" ? "Aankomend" : "Afgerond"}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4 px-5 pt-2">
        {list.map((b) => (
          <BookingCard key={b.id} b={b} />
        ))}
        {list.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">Geen boekingen hier.</p>
          </div>
        )}

        <p className="pt-2 pb-1 text-center text-[11px] text-muted-foreground">
          Beheer je auto via de boekingsdetails.
        </p>
      </div>
    </PhoneFrame>
  );
}

function BookingCard({ b }: { b: Booking }) {
  const days = daysBetween(b.pickupDate, b.dropoffDate);
  const isUpcoming = b.status === "upcoming";
  return (
    <div
      className="overflow-hidden rounded-3xl bg-background"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <Link
        to="/app/bookings/$bookingId"
        params={{ bookingId: b.id }}
        className="block"
      >
        <div className="relative h-32 bg-muted">
          <img src={b.carImage} alt={b.carName} className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3 flex gap-2">
            {b.worryFree && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-foreground">
                <ShieldCheck className="h-3 w-3" /> Worry-Free
              </span>
            )}
            <span className="rounded-full bg-background/95 px-2.5 py-1 text-[10px] font-bold text-foreground">
              {b.supplier}
            </span>
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-foreground/85 px-2.5 py-1 text-[10px] font-semibold text-background">
            {days} dagen
          </div>
        </div>

        <div className="p-4">
          <div>
            <h3 className="text-[17px] font-bold text-foreground">{b.carName}</h3>
            <p className="text-xs text-muted-foreground">{b.carCategory}</p>
          </div>

          <div className="mt-3 space-y-2 text-sm">
            <Row icon={<MapPin className="h-4 w-4" />} text={b.pickupLocation} />
            <Row
              icon={<Calendar className="h-4 w-4" />}
              text={`${formatDate(b.pickupDate)} → ${formatDate(b.dropoffDate)}`}
            />
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="text-xs font-semibold text-muted-foreground">
              {b.reference}
            </span>
            <span className="text-base font-bold text-foreground">
              € {b.totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>

      {/* Action buttons */}
      <div className="grid grid-cols-3 border-t border-border">
        <Link
          to="/app/bookings/$bookingId"
          params={{ bookingId: b.id }}
          className="flex flex-col items-center justify-center gap-1 py-3 text-[11px] font-bold text-foreground"
        >
          <Settings className="h-4 w-4" />
          <span>Beheer</span>
        </Link>
        <Link
          to="/app/bookings/$bookingId/support"
          params={{ bookingId: b.id }}
          className="flex flex-col items-center justify-center gap-1 border-l border-border py-3 text-[11px] font-bold text-foreground"
        >
          <LifeBuoy className="h-4 w-4" />
          <span>Klantenservice</span>
        </Link>
        <Link
          to="/app/vouchers/$bookingId"
          params={{ bookingId: b.id }}
          className={`flex flex-col items-center justify-center gap-1 border-l border-border py-3 text-[11px] font-bold ${
            isUpcoming ? "bg-secondary text-primary" : "text-foreground"
          }`}
        >
          <Ticket className="h-4 w-4" />
          <span>Voucher</span>
        </Link>
      </div>
    </div>
  );
}

function Row({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span className="text-primary">{icon}</span>
      <span className="text-foreground">{text}</span>
    </div>
  );
}
