export type BookingStatus = "confirmed" | "upcoming" | "completed" | "cancelled";

export interface SupplierSupport {
  name: string;
  logoBg: string; // background tint for supplier badge
  phone: string;
  whatsapp?: string;
  email: string;
  hours: string;
  deskLocation: string;
  emergencyPhone: string;
  languages: string[];
}

export interface Booking {
  id: string;
  reference: string;
  carName: string;
  carCategory: string;
  carImage: string;
  supplier: string;
  worryFree: boolean;
  pickupLocation: string;
  pickupAddress: string;
  pickupDate: string; // ISO
  dropoffLocation: string;
  dropoffDate: string; // ISO
  totalPrice: number;
  currency: string;
  status: BookingStatus;
  driverName: string;
}

export const supplierSupport: Record<string, SupplierSupport> = {
  Sixt: {
    name: "Sixt",
    logoBg: "#ff5f00",
    phone: "+34 902 491 616",
    whatsapp: "+34 696 100 100",
    email: "reservations@sixt.es",
    hours: "Ma–Zo · 07:00–23:00",
    deskLocation: "Aankomsthal, balie 14",
    emergencyPhone: "+34 902 020 707",
    languages: ["NL", "EN", "ES", "DE"],
  },
  Goldcar: {
    name: "Goldcar",
    logoBg: "#ffcc00",
    phone: "+351 219 432 100",
    email: "customercare@goldcar.es",
    hours: "Ma–Zo · 08:00–22:00",
    deskLocation: "Parking P2, shuttle vanaf terminal",
    emergencyPhone: "+351 800 100 200",
    languages: ["EN", "PT", "ES"],
  },
  Hertz: {
    name: "Hertz",
    logoBg: "#ffd700",
    phone: "+351 219 426 300",
    whatsapp: "+351 939 100 200",
    email: "customer.service.pt@hertz.com",
    hours: "24/7",
    deskLocation: "Aankomsthal, balie 4",
    emergencyPhone: "+351 800 238 238",
    languages: ["NL", "EN", "PT"],
  },
};

export const bookings: Booking[] = [
  {
    id: "1",
    reference: "ET-2845-9921",
    carName: "Volkswagen T-Roc",
    carCategory: "SUV — of vergelijkbaar",
    carImage:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop",
    supplier: "Sixt",
    worryFree: true,
    pickupLocation: "Málaga Airport (AGP)",
    pickupAddress: "Av. del Comandante García Morato, 29004 Málaga",
    pickupDate: "2026-05-14T10:30:00",
    dropoffLocation: "Málaga Airport (AGP)",
    dropoffDate: "2026-05-21T10:30:00",
    totalPrice: 312.45,
    currency: "EUR",
    status: "upcoming",
    driverName: "Lieke de Vries",
  },
  {
    id: "2",
    reference: "ET-2790-1144",
    carName: "Fiat 500",
    carCategory: "Mini — of vergelijkbaar",
    carImage:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop",
    supplier: "Goldcar",
    worryFree: false,
    pickupLocation: "Lissabon — Centrum",
    pickupAddress: "Av. da Liberdade 38, 1250-145 Lisboa",
    pickupDate: "2026-07-02T09:00:00",
    dropoffLocation: "Lissabon Airport (LIS)",
    dropoffDate: "2026-07-09T18:00:00",
    totalPrice: 184.0,
    currency: "EUR",
    status: "upcoming",
    driverName: "Lieke de Vries",
  },
  {
    id: "3",
    reference: "ET-2611-7705",
    carName: "Toyota Corolla",
    carCategory: "Compact — of vergelijkbaar",
    carImage:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&auto=format&fit=crop",
    supplier: "Hertz",
    worryFree: true,
    pickupLocation: "Faro Airport (FAO)",
    pickupAddress: "8001-701 Faro, Portugal",
    pickupDate: "2025-08-10T11:00:00",
    dropoffLocation: "Faro Airport (FAO)",
    dropoffDate: "2025-08-17T11:00:00",
    totalPrice: 268.9,
    currency: "EUR",
    status: "completed",
    driverName: "Lieke de Vries",
  },
];

export const getBooking = (id: string) => bookings.find((b) => b.id === id);

export const getSupport = (supplier: string): SupplierSupport =>
  supplierSupport[supplier] ?? {
    name: supplier,
    logoBg: "#1f2937",
    phone: "+31 20 808 0808",
    email: "support@easyterra.nl",
    hours: "24/7",
    deskLocation: "Onbekend",
    emergencyPhone: "+31 20 808 0808",
    languages: ["NL", "EN"],
  };

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
export function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function daysBetween(a: string, b: string) {
  return Math.round(
    (new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24),
  );
}
