---
name: securex-design
description: Use this skill to generate well-branded interfaces and assets for SecureX, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a smart-escrow PWA for African SMEs.
user-invocable: true
---

# SecureX Design Skill

SecureX is an integrated FinTech prototype for safe, trusted, transparent transactions between African SMEs and their customers. It combines **SafePay smart escrow**, **TrustScore™**, **OTP proof-of-delivery**, automated transaction records, and AI-driven business intelligence — delivered as a PWA with SMS/USSD fallback.

## Read these first

1. **`README.md`** — full visual + content fundamentals, iconography, voice, copy patterns, edge-case copy.
2. **`colors_and_type.css`** — all tokens (CSS custom properties) + semantic type classes (`.sx-h1`, `.sx-p`, `.sx-mark-mint` etc.). **Always link this file** rather than re-declaring colors.
3. **`ui_kits/securex_app/`** — React/JSX recreation of the product surfaces. Read each component (`Button.jsx`, `Input.jsx`, `OtpInput.jsx`, `TrustScoreCard.jsx`, `EscrowTimeline.jsx`, etc.) before recreating from scratch.
4. **`_source/`** — the original SecureX-App import (read-only). When in doubt about an existing flow or copy detail, look here.
5. **`preview/`** — small per-token preview cards. Useful as quick visual references.

## Cardinal rules

- **Two-tone heart.** Navy = trusted ground; mint = secure event. Never use mint for chrome.
- **Sora for display, Inter for body, JetBrains Mono for transaction IDs and OTP.**
- **Outline icons only, 1.6–2px stroke, 20–24px**, Heroicons-style. Strokes inherit `currentColor`.
- **No emoji, no stock photos, no gradient cards-with-only-a-left-border.**
- **Copy is calm, sentence-case, in second person.** Status badges are one or two words.
- **Currency is ₦ by default** but the system is multi-currency-ready.

## How to use this skill

### If you're producing visual artifacts (slides, mocks, prototypes)
1. Copy `assets/`, `colors_and_type.css`, and whichever components you need into a fresh folder.
2. Build static HTML or React/JSX referencing those files. Use the `--navy-*`, `--mint-*`, `--indigo-*`, `--ink-*` tokens.
3. For app surfaces, lean on `ui_kits/securex_app/*.jsx` — those components are already on-brand.
4. For marketing, mirror the rhythm: **navy hero → white how-it-works → soft-gray why → navy CTA → dark footer**.

### If you're producing production code
1. Lift token values from `colors_and_type.css` straight into your tailwind config / styled-components theme.
2. Reuse component anatomy (paddings, radii, focus rings) from the kit — they were extracted from the real product CSS.
3. Use the original repo at <https://github.com/Awogo/SecureX-App> for any flow not represented here.

### If invoked without guidance
Ask the user **what they want to build** — slide deck, new screen, marketing page, throwaway mock, production component? Then ask 2–3 focused questions (audience, fidelity, variations) before designing. Surface output as an HTML artifact unless production code is explicitly requested.

## Voice quick-reference

- Hero: **"Secure every transaction with trust."**
- Reassurance: **"Funds held safely. Released the moment delivery is confirmed."**
- CTA: **"Get started →"** · **"Create new account"** · **"Release now"**
- Errors: name the problem + name the next action. Always offer the USSD fallback when relevant.
- Status: **Released · In escrow · Awaiting OTP · Disputed · Draft · Secured.**
