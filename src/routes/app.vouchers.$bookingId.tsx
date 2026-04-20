import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { ShieldCheck, Wallet, Share2, MapPin, Calendar } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { AppHeader } from "@/components/AppHeader";
import { getBooking, formatDate, formatTime } from "@/lib/demo-data";
import { EasyTerraLogo } from "@/components/EasyTerraLogo";

export const Route = createFileRoute("/app/vouchers/$bookingId")({
  loader: ({ params }) => {
    const b = getBooking(params.bookingId);
    if (!b) throw notFound();
    return b;
  },
  component: VoucherScreen,
  notFoundComponent: () => (
    <PhoneFrame showTabs={false}>
      <div className="px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">Voucher niet gevonden.</p>
        <Link to="/app/bookings" className="mt-4 inline-block text-primary font-semibold">
          Terug naar boekingen
        </Link>
      </div>
    </PhoneFrame>
  ),
});

function VoucherScreen() {
  const b = Route.useLoaderData();

  return (
    <PhoneFrame>
      <AppHeader
        title="Voucher"
        back="/app/bookings/$bookingId"
        right={
          <button className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-muted">
            <Share2 className="h-5 w-5 text-foreground" />
          </button>
        }
      />

      <div className="px-5 pt-2">
        {/* Wallet pass */}
        <div
          className="overflow-hidden rounded-3xl bg-primary text-primary-foreground"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center justify-between px-6 pt-5">
            <EasyTerraLogo />
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold">
              VOUCHER
            </span>
          </div>

          <div className="px-6 pt-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider opacity-75">
              Verhuurder
            </p>
            <p className="text-2xl font-bold">{b.supplier}</p>
            <p className="mt-1 text-xs opacity-80">{b.carName} · {b.carCategory}</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 px-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-75">
                Ophalen
              </p>
              <p className="mt-0.5 text-sm font-bold">{formatDate(b.pickupDate)}</p>
              <p className="text-xs opacity-85">{formatTime(b.pickupDate)}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-75">
                Inleveren
              </p>
              <p className="mt-0.5 text-sm font-bold">{formatDate(b.dropoffDate)}</p>
              <p className="text-xs opacity-85">{formatTime(b.dropoffDate)}</p>
            </div>
          </div>

          <div className="mt-4 px-6">
            <p className="text-[10px] font-semibold uppercase tracking-wider opacity-75">
              Locatie
            </p>
            <p className="text-sm font-semibold">{b.pickupLocation}</p>
          </div>

          {/* perforated divider */}
          <div className="relative mt-5">
            <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-background" />
            <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-background" />
            <div className="mx-6 border-t border-dashed border-white/30" />
          </div>

          {/* QR area */}
          <div className="flex flex-col items-center gap-3 px-6 pb-6 pt-5">
            <div className="rounded-2xl bg-white p-3">
              <QRCodeSVG value={`EASYTERRA:${b.reference}`} size={150} fgColor="#0b1220" />
            </div>
            <div className="text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-75">
                Boekingsnummer
              </p>
              <p className="font-mono text-base font-bold tracking-wider">
                {b.reference}
              </p>
            </div>
          </div>
        </div>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground py-3.5 text-sm font-semibold text-background">
          <Wallet className="h-4 w-4" /> Voeg toe aan Apple Wallet
        </button>

        <div
          className="mt-4 rounded-3xl bg-background p-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {b.worryFree && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-bold text-accent">
              <ShieldCheck className="h-3 w-3" /> Worry-Free pakket actief
            </div>
          )}
          <h3 className="text-sm font-bold text-foreground">Bij de balie tonen</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Toon deze voucher samen met je rijbewijs en creditcard van de
            hoofdbestuurder.
          </p>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-foreground">{b.pickupAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-foreground">
                {formatDate(b.pickupDate)} · {formatTime(b.pickupDate)}
              </span>
            </div>
          </div>

          <Link
            to="/app/bookings/$bookingId"
            params={{ bookingId: b.id }}
            className="mt-4 block text-center text-xs font-semibold text-primary"
          >
            Bekijk volledige boeking →
          </Link>
        </div>
      </div>
    </PhoneFrame>
  );
}
