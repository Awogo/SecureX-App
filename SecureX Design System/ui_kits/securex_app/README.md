# SecureX App UI Kit

A pixel-faithful **redesign** of the SecureX PWA — built from the source code at `_source/pages/` and `_source/styles/`. Same flows, same copy, richer visual treatment.

## What's here

`index.html` is a **clickable click-thru demo** that walks through the core product loop:

1. **Landing** → marketing hero with the dark navy gradient + glass "how it works" card.
2. **Login** → centered auth card on canvas, with the indigo focus ring.
3. **Dashboard** → TrustScore™ on the indigo gradient, stat cards, transaction trend chart, escrow distribution donut.
4. **Transactions** → searchable, status-pilled ledger.
5. **Transaction detail** → escrow timeline with OTP delivery / release stages.
6. **Confirm delivery (OTP)** → the 6-digit code grid + success state with the flashing checkmark.

You can click sidebar items / nav buttons to move between screens. Fields are stubbed in but interactive enough to feel real.

## Components

Each component is a separate JSX file so they're cheap to remix:

| File | Used for |
|---|---|
| `Tokens.jsx`         | Shared inline icon set + small helpers (avatar, currency). |
| `Button.jsx`         | Primary (gradient) · Mint · Ghost · Danger · sm size. |
| `Input.jsx`          | Labelled text input with leading icon + focus ring. |
| `OtpInput.jsx`       | 6-cell OTP grid with auto-advance. |
| `Badge.jsx`          | Status pills (Released · In escrow · Awaiting OTP · Disputed). |
| `Sidebar.jsx`        | App left rail with active state + user profile + sign out. |
| `AppHeader.jsx`      | Sticky top bar with search + notifications + avatar. |
| `TrustScoreCard.jsx` | The indigo-gradient TrustScore hero with circular gauge. |
| `StatCard.jsx`       | Today / Week / Escrow / Total tiles. |
| `TransactionsTable.jsx` | Searchable table with status pills + currency. |
| `EscrowTimeline.jsx` | Vertical timeline of the SafePay lifecycle. |
| `MarketingNav.jsx`   | Dark sticky nav for the landing page. |
| `HeroSection.jsx`    | Hero block with glass card. |
| `FlashSuccess.jsx`   | The pulsing-check completion state. |

## Screens

`screens/LandingScreen.jsx`, `screens/LoginScreen.jsx`, `screens/DashboardScreen.jsx`, `screens/TransactionsScreen.jsx`, `screens/TransactionDetailScreen.jsx`, `screens/OtpScreen.jsx`.

## Reference

This kit reproduces the **visual feel** of the original — pulling colors, spacing, copy, and component anatomy straight from the source CSS files. Functionality is stubbed; this is a design recreation, not production code. For the real implementation see `_source/pages/`.
