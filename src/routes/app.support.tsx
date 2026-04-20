import { createFileRoute } from "@tanstack/react-router";
import {
  MessageCircle,
  Phone,
  Mail,
  HelpCircle,
  ChevronRight,
  Search,
  Send,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";

export const Route = createFileRoute("/app/support")({
  component: SupportScreen,
});

const faqs = [
  "Hoe wijzig ik mijn boeking?",
  "Wat moet ik meenemen bij ophalen?",
  "Hoe werkt het Worry-Free pakket?",
  "Mag ik de auto over de grens rijden?",
  "Hoe annuleer ik mijn reservering?",
];

function SupportScreen() {
  return (
    <PhoneFrame>
      <div className="px-5 pt-3 pb-4">
        <h1 className="text-[32px] font-bold leading-tight text-foreground">
          Support
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          We helpen je 24/7, in het Nederlands.
        </p>

        {/* search */}
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-muted px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Zoek in veelgestelde vragen"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* live chat hero */}
      <div className="px-5">
        <div
          className="flex items-center gap-4 rounded-3xl bg-primary p-5 text-primary-foreground"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Live chat</p>
            <p className="text-xs opacity-85">Gemiddelde wachttijd: 2 min.</p>
          </div>
          <button className="rounded-full bg-accent px-3.5 py-2 text-xs font-bold text-accent-foreground">
            Start
          </button>
        </div>

        {/* contact tiles */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <ContactTile icon={<Phone className="h-5 w-5" />} label="Bel ons" sub="+31 20 808 0808" />
          <ContactTile icon={<Mail className="h-5 w-5" />} label="E-mail" sub="binnen 4 uur" />
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-6 px-5">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Veelgesteld
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

      {/* mock chat preview */}
      <div className="mt-6 px-5">
        <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Recent gesprek
        </h2>
        <div
          className="rounded-3xl bg-background p-4"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <Bubble who="agent" text="Hoi Lieke, hoe kan ik je helpen?" />
          <Bubble who="me" text="Kan ik mijn ophaaltijd nog wijzigen?" />
          <Bubble who="agent" text="Zeker! Tot 24u vóór ophaal kun je dat gratis aanpassen." />

          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-border bg-muted/40 px-3 py-2">
            <input
              placeholder="Schrijf een bericht…"
              className="w-full bg-transparent text-sm outline-none"
            />
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ContactTile({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <button
      className="rounded-3xl bg-background p-4 text-left"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
        {icon}
      </span>
      <p className="mt-3 text-sm font-bold text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </button>
  );
}

function Bubble({ who, text }: { who: "agent" | "me"; text: string }) {
  const me = who === "me";
  return (
    <div className={`mb-2 flex ${me ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
          me
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm bg-muted text-foreground"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
