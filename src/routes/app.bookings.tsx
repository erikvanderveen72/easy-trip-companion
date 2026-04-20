import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Calendar, ShieldCheck, ChevronRight, Bell, Ticket } from "lucide-react";
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
      {/* large title header */}
      <div className="px-5 pt-3 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Hi Lieke 👋
            </p>
            <h1 className="mt-1 text-[32px] font-bold leading-tight text-foreground">
              Mijn boekingen
            </h1>
          </div>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <Bell className="h-5 w-5 text-foreground" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
          </button>
        </div>

        {/* segmented */}
        <div className="mt-5 flex rounded-full bg-muted p-1 text-sm font-semibold">
          {(["upcoming", "completed"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-full py-2 transition ${
                tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
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
  return (
    <Link
      to="/app/bookings/$bookingId"
      params={{ bookingId: b.id }}
      className="block overflow-hidden rounded-3xl bg-background"
      style={{ boxShadow: "var(--shadow-card)" }}
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
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[17px] font-bold text-foreground">{b.carName}</h3>
            <p className="text-xs text-muted-foreground">{b.carCategory}</p>
          </div>
          <ChevronRight className="mt-1 h-5 w-5 text-muted-foreground" />
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

      {b.status === "upcoming" && (
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = `/app/vouchers/${b.id}`;
          }}
          className="flex items-center justify-center gap-2 border-t border-border bg-secondary py-3 text-xs font-bold text-primary"
        >
          <Ticket className="h-3.5 w-3.5" /> Toon voucher
        </div>
      )}
    </Link>
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
