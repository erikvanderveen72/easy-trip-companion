import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  ChevronRight,
  MapPin,
  Clock,
  AlertTriangle,
  Languages,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { AppHeader } from "@/components/AppHeader";
import { getBooking, getSupport } from "@/lib/demo-data";

export const Route = createFileRoute("/app/bookings/$bookingId/support")({
  loader: ({ params }) => {
    const booking = getBooking(params.bookingId);
    if (!booking) throw notFound();
    return booking;
  },
  component: BookingSupportScreen,
  notFoundComponent: () => (
    <PhoneFrame showTabs={false}>
      <div className="px-6 py-12 text-center">
        <p className="text-sm text-muted-foreground">Boeking niet gevonden.</p>
        <Link to="/app/bookings" className="mt-4 inline-block font-semibold text-primary">
          Terug naar boekingen
        </Link>
      </div>
    </PhoneFrame>
  ),
});

function BookingSupportScreen() {
  const booking = Route.useLoaderData();
  const support = getSupport(booking.supplier);

  const faqs = [
    `Hoe wijzig ik deze boeking (${booking.reference})?`,
    `Wat moet ik meenemen bij het ophalen bij ${support.name}?`,
    booking.worryFree
      ? "Hoe werkt mijn Worry-Free pakket?"
      : "Kan ik nog Worry-Free toevoegen?",
  ];

  return (
    <PhoneFrame>
      <AppHeader
        title="Support"
        back="/app/bookings/$bookingId"
        backParams={{ bookingId: booking.id }}
        variant="blue"
      />

      {/* Context band */}
      <div className="bg-primary px-5 pb-6 pt-2 text-primary-foreground">
        <p className="text-[11px] font-semibold uppercase tracking-wider opacity-85">
          Support voor
        </p>
        <div className="mt-2 flex items-center gap-3">
          <img
            src={booking.carImage}
            alt={booking.carName}
            className="h-12 w-12 rounded-xl object-cover"
          />
          <div>
            <p className="text-lg font-bold leading-tight">{booking.carName}</p>
            <p className="text-xs opacity-85">
              {booking.supplier} · {booking.reference}
            </p>
          </div>
        </div>
      </div>

      {/* Partner card */}
      <div className="-mt-3 px-5">
        <div
          className="overflow-hidden rounded-3xl bg-background"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div
            className="flex items-center gap-3 px-5 py-4 text-white"
            style={{ background: support.logoBg }}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/20 text-base font-extrabold">
              {support.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-85">
                Verhuurpartner
              </p>
              <p className="text-lg font-bold leading-tight">{support.name}</p>
            </div>
          </div>

          <div className="space-y-3 px-5 py-4 text-sm">
            <InfoRow icon={<MapPin className="h-4 w-4" />} text={support.deskLocation} />
            <InfoRow icon={<Clock className="h-4 w-4" />} text={support.hours} />
            <InfoRow
              icon={<Languages className="h-4 w-4" />}
              text={`Talen: ${support.languages.join(" · ")}`}
            />
          </div>
        </div>

        {/* Contact actions */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <ContactTile
            icon={<Phone className="h-5 w-5" />}
            label={`Bel ${support.name}`}
            sub={support.phone}
            href={`tel:${support.phone.replace(/\s/g, "")}`}
          />
          <ContactTile
            icon={<Mail className="h-5 w-5" />}
            label="E-mail"
            sub={support.email}
            href={`mailto:${support.email}`}
          />
        </div>

        {/* Emergency */}
        <a
          href={`tel:${support.emergencyPhone.replace(/\s/g, "")}`}
          className="mt-3 flex items-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3.5"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
            <AlertTriangle className="h-4 w-4" />
          </span>
          <div className="flex-1">
            <p className="text-sm font-bold text-destructive">Pechhulp / noodgeval</p>
            <p className="text-xs text-muted-foreground">{support.emergencyPhone} · 24/7</p>
          </div>
          <ChevronRight className="h-4 w-4 text-destructive" />
        </a>
      </div>

      {/* EasyTerra fallback */}
      <div className="mt-6 px-5">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Of vraag EasyTerra
        </p>
        <div
          className="flex items-center gap-3 rounded-3xl bg-primary p-4 text-primary-foreground"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Live chat met EasyTerra</p>
            <p className="text-xs opacity-85">Wachttijd ± 2 min · NL</p>
          </div>
          <button className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
            Start
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-6 px-5 pb-2">
        <h2 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Veelgesteld over deze boeking
        </h2>
        <div
          className="overflow-hidden rounded-3xl bg-background"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          {faqs.map((q, i) => (
            <button
              key={q}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left ${
                i !== faqs.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <HelpCircle className="h-4 w-4 text-primary" />
              <span className="flex-1 text-sm text-foreground">{q}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-primary">{icon}</span>
      <span className="text-foreground">{text}</span>
    </div>
  );
}

function ContactTile({
  icon,
  label,
  sub,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="rounded-3xl bg-background p-4 text-left"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
        {icon}
      </span>
      <p className="mt-3 text-sm font-bold text-foreground">{label}</p>
      <p className="truncate text-xs text-muted-foreground">{sub}</p>
    </a>
  );
}
