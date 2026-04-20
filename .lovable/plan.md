
**Goal:** Remove standalone Support tab. Make support contextual to a booking.

**Current state:**
- Support is a top-level tab in PhoneFrame footer (4 tabs: Boekingen, Vouchers, Support, Profiel)
- `/app/support` shows a booking selector chip row, then partner support info
- Booking detail already has a "Hulp nodig? Contact {supplier}" row that links to `/app/support`

**Problem:** Support is generic/standalone. User wants it as an extension of a specific booking.

**Plan:**

1. **Remove Support tab from footer** (`src/components/PhoneFrame.tsx`)
   - Reduce tabs from 4 to 3: Boekingen, Vouchers, Profiel
   - Adjust grid to `grid-cols-3`

2. **Convert support route to per-booking** 
   - Delete `src/routes/app.support.tsx`
   - Create `src/routes/app.bookings.$bookingId.support.tsx` → `/app/bookings/:bookingId/support`
   - Loader fetches the specific booking (404 if missing)
   - Reuse all existing support UI (partner card, contact tiles, emergency, EasyTerra fallback, FAQ) but driven by the loaded booking — no chip selector needed
   - Header: "Support voor {carName}" with back link to `/app/bookings/$bookingId`
   - FAQ becomes booking-aware (e.g. "Hoe wijzig ik deze boeking?")

3. **Update booking detail "Hulp nodig" row** (`src/routes/app.bookings.$bookingId.tsx`)
   - Change `to="/app/support"` → `to="/app/bookings/$bookingId/support"` with `params={{ bookingId: b.id }}`
   - Keep label "Hulp nodig? Contact {supplier}" — it's already contextual

4. **Add a clear Support entry point on the bookings list** (`src/routes/app.bookings.tsx`)
   - Optional small "Support" link/icon on each booking card so users can jump straight to per-booking support without opening details first

**Result:** Support always lives inside the context of one booking. No more generic support screen, no more booking-picker step.

**Files touched:**
- `src/components/PhoneFrame.tsx` — remove Support tab
- `src/routes/app.support.tsx` — delete
- `src/routes/app.bookings.$bookingId.support.tsx` — new
- `src/routes/app.bookings.$bookingId.tsx` — update support link
- `src/routes/app.bookings.tsx` — optional inline support link per card
