# SecureX Design System

> A design language for **SecureX** — a smart-escrow & business-intelligence platform for African SMEs and their customers. This system codifies the visuals, voice, components, and motifs used across the product so future surfaces (web, app, slides, docs) stay coherent and instantly recognisable.

The redesign brief: take the existing SecureX visual identity and **push it toward a richer, more confident expression** — deeper navy surfaces, more deliberate accent use of mint, real typographic hierarchy, and components that feel safe + premium.

---

## Sources used

This system was distilled from material the team provided:

- **Product Requirement Document** — `uploads/PRD FOR SECUREX.docx` (extracted to `uploads/PRD_extracted.txt`). Defines the product, target users, feature set (SafePay escrow, TrustScore™, OTP proof-of-delivery, business dashboard, AI insights), tone, and edge cases.
- **GitHub: `Awogo/SecureX-App`** — the in-progress React/Vite PWA. <https://github.com/Awogo/SecureX-App> · imported into `_source/` for reference. **Explore this repo for more pages and components** (Verification flow, Settings, AI Insights, full Transaction list) when iterating the system.

> If you're reading this offline, the live source repo will give you the freshest component code, including the parts of the product that aren't yet represented here.

---

## Brand snapshot

SecureX is **trust infrastructure**. The brand has to feel as safe as a bank, as warm as a market trader, and as quick as a chat app — across both a polished smartphone PWA and a feature-phone USSD fallback.

Three words that govern every choice:

1. **Trusted** — deep navy surfaces, lots of breathing room, no flashy gradients on critical actions, calm motion.
2. **Secure** — locks, shields, OTP grids, and "Funds held safely" copy treated as first-class — never an afterthought.
3. **Inclusive** — high contrast, mobile-first, clear English, currency-aware (₦ default, but multi-currency-ready).

---

## Visual Foundations

### Color
The palette is **two-tone** at heart: **deep indigo-navy** as the trusted ground, **mint** as the live, "secure" accent. Everything else is a calibrated neutral. See `colors_and_type.css` for the full token set.

| Family | Anchor | Use |
|---|---|---|
| **Navy** | `#1A1F3F → #2C36A2` | Hero gradient, sidebar/nav surfaces, CTA backgrounds, primary button gradient |
| **Indigo** | `#4A5CF5` | Interactive primary — links, active sidebar item, focus rings, in-page action chips |
| **Mint** | `#00D9A3` | "Secure" emphasis, success state, "released" pill, escrow-confirmed states |
| **Neutrals** | `#F6F7FB` → `#1E1E1E` | App canvas (`#F6F7FB`), card fills (white), body text (`#1E1E1E`), captions (`#7A7A7A`) |
| **Danger** | `#EF4444` | Dispute, error, sign-out, OTP failure |

Rule of thumb: **navy frames the system, mint announces an event** (a confirmation, an OTP delivered, funds released). Never use mint for chrome.

### Typography
- **Display: `Sora`** (added for the redesign) — for hero headlines, page titles, hero numbers. Geometric, confident, slightly warmer than Inter at large sizes. **(Substitution flag below.)**
- **Body: `Inter`** — every paragraph, label, button, input. The source app uses Inter exclusively; we keep it for body but add Sora for richer display moments.
- **Mono: `JetBrains Mono`** — transaction IDs, OTP codes, ledger receipts.

Scale runs `12 → 58px`. Headlines use `letter-spacing: -0.02em` and `line-height: 1.1`. Body uses `1.5–1.6` for breathing room.

### Surfaces, backgrounds, depth
- **App canvas:** flat `#F6F7FB` — no patterns, no images. The product is a financial tool; the work *is* the texture.
- **Marketing pages:** stacked color blocks — **navy hero gradient → white "how it works" → soft-gray "why" → navy CTA**. This rhythm is core to the brand.
- **Hero gradient:** `linear-gradient(180deg, #1A1F3F 0%, #252A5C 60%, #2C3672 100%)`. Almost imperceptible — adds depth without drama.
- **Glass card on dark:** `background: rgba(255,255,255,0.08); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.15)`. Used for hero "how it works" panel and the redesign's TrustScore preview.
- **Cards on light:** `background: white; border: 1px solid #E5E7EB; border-radius: 16px; box-shadow: 0 4px 16px rgba(17,24,39,0.08)`. Subtle, almost flat.
- **No full-bleed photography.** No stock imagery. No hand-drawn illustrations. Icons + type + product UI carry the visual weight.

### Borders, radii, shadows
- **Default radius: `10px`** (buttons, inputs). Larger containers step up: `14 → 16 → 20 → 24px`.
- **Borders are thin and quiet** — `1px solid #E5E7EB` on cards; `1.5px solid #E5E7EB` on inputs (heavier so focus feels responsive).
- **Two shadow systems:**
  - **Card shadows** are flat and short (`0 4px 16px rgba(17,24,39,0.08)`).
  - **Hero glass shadow** is large and atmospheric (`0 30px 80px rgba(0,0,0,0.35)`) — only on the dark hero.
  - **Primary button shadow** is colored (`0 8px 22px rgba(74,92,245,0.28)`) — lifts the indigo CTA.

### Animation & motion
- **Movement is subtle.** Hover lifts (`translateY(-1px)` to `-4px`), 200–300ms ease transitions, color crossfades. **No bounces. No spring physics.**
- **One exception:** the `flashSuccess` keyframe (pulsing scale on the success checkmark, ~1.5s loop) — used at the end of an escrow flow to celebrate a release. Never elsewhere.
- **Hover state pattern:**
  - Primary button: darken background (`#4A5CF5 → #2C36A2`), gain shadow, lift 1px.
  - Mint button: darken to `#00C394`, lift 1px.
  - Nav link: text crossfade to mint over 200ms.
  - Card: lift `translateY(-4px)`, no shadow change.
- **Press state:** drop the lift, scale to `0.99`.

### Transparency & blur
Reserved for **two contexts only:**
1. The hero glass card on navy (8% white + 24px backdrop blur).
2. Mobile sidebar overlay (`rgba(0,0,0,0.4)`, no blur).

Everything else is fully opaque. Frosted glass elsewhere reads as gimmicky for a fintech product.

### Layout rules
- **Max content width:** `1440px` for marketing, `1400px` for app dashboard.
- **Edge gutters:** `60px` desktop / `20px` mobile.
- **Sidebar:** `260px`, fixed left, white surface with `1px` right border. Collapses behind overlay below 768px.
- **Header:** sticky, white, `1px` bottom border, includes a wide search bar (`400px`) that collapses to flex-1 on mobile.

### Imagery treatment
There is **no photography in the system**. If product marketing needs hero imagery later, the rule is: muted, cool, slightly-desaturated, with the navy-indigo cast preserved. Never warm, never grainy.

---

## Content Fundamentals

### Voice
**Calm, capable, plain-spoken.** SecureX talks like a competent finance professional explaining things to a first-time entrepreneur — never patronising, never breathless. The product is reassurance, so the copy never *needs* to oversell.

### Person
**Mostly "you" addressing the user. "We" used sparingly** for the company position ("We hold your payment until you confirm…"). Avoid "I" — the AI in TrustScore™ and Predictive Inventory is referred to in third person ("SecureX detects…", "The system flags…").

### Casing
- **Sentence case** for buttons, links, labels, navigation: `Get Started →`, `Verify identity`, `Create new account`.
- **Title Case** for proper nouns and core feature names: `SafePay`, `TrustScore™`, `Digital Business Passport`, `Smart Escrow`.
- **UPPERCASE** is reserved for eyebrows (`SECURED`, `IN ESCROW`, `RELEASED`) at small sizes with letter-spacing.

### Punctuation & symbols
- The "→" arrow appears in CTAs (`Get Started →`, `Create transaction →`).
- Bullet separator "•" used in helper text: `No credit card required • Cancel anytime`.
- ₦ (Naira) is the default currency symbol in product UI. Slides/marketing may show `₦ / $ / KES / GHS` to signal multi-currency.

### Emoji
**Avoid.** The source app currently uses a few inline emoji (📝 ✓ 💰) as quick-action icons — the redesign **replaces those with proper outline SVG icons.** Emoji read as informal and lossy in a payments context.

### Tone examples (from the actual product)
- Hero: **"Secure Every Transaction with Trust"** — short, declarative, single benefit.
- Subhead: **"SecureX is your trusted escrow partner, ensuring safe, hassle-free online transactions for buyers and sellers."** — concrete role, names two audiences.
- Step pill: **"Buyer and seller get in touch."** — present tense, plain English.
- Error: **"Connection unstable. Please use the USSD fallback (*XXX#) to complete the release."** — actionable, mentions the inclusive fallback.
- Limit notice: **"Limit reached. Please upload your Government ID to process transactions above $X."** — names the constraint, names the next step.
- Status badge: **"Secured"** / **"Released"** / **"In escrow"** / **"Awaiting OTP"** — one or two words, always.

### What we never say
- "Revolutionary", "disruptive", "next-gen", "AI-powered" as a tagline. (TrustScore™ uses AI — we describe it functionally.)
- "Just" or "simply" in instructions. ("Just enter your OTP" → "Enter the 6-digit OTP we sent you.")
- Slang or African-market clichés. SecureX is pan-African; copy is universal.

---

## Iconography

See [ICONOGRAPHY](#iconography-1) section below.

---

## Iconography

### Approach
**Outline icons, 1.5–2px stroke, rounded line caps, 20–24px default size.** Pure black/`currentColor` strokes — color is inherited from the parent. No filled bowls, no two-tone, no isometric.

### Source
The source app pulls icons from **Heroicons (outline)** — `@heroicons/react/24/outline`. The redesign continues that convention because it pairs well with Inter and is wide-coverage and free.

When the codebase needs an icon that Heroicons doesn't ship cleanly (shield-check at the brand mark, OTP grid, escrow vault), the app **hand-inlines an SVG path** matching the same stroke weight. Two such hand-inlines live in `assets/icons/` (`check.svg`, `paper.svg`) and we treat them as canonical.

**Substitution flag:** if you need a wider icon set (e.g. financial charting, currency-specific), **prefer Lucide** at the same stroke weight (`1.5–2px`). Don't mix sets visually in one screen.

### CDN
For prototypes you can pull Heroicons via `https://unpkg.com/heroicons@2.x/24/outline/<name>.svg` or use Lucide via `<script src="https://unpkg.com/lucide@latest"></script>`. Always **match the stroke weight to existing icons** before shipping.

### Logo
The SecureX mark is a **shield containing a smaller shield**, set in a rounded-square indigo gradient (`#2C36A2 → #4A5CF5`). White stroke. The shield-in-shield is a literal nod to escrow: layered protection.

Files:
- `assets/logo-securex.svg` — full lockup (mark + "SecureX" wordmark), used on light surfaces.
- `assets/logo-blue.png` — same lockup, raster, light-surface use (sidebar header, footer-light).
- `assets/logo-green.png` — alternate mark used on **dark** marketing surfaces (nav, dark footer).
- `assets/logo-icon.png` — bare shield mark, for app icon / favicons.
- `assets/logo-favicon.png` — square favicon.

### Unicode characters used as icons
None systematically. The "→" in CTAs is the only routine use. ₦ is treated as currency, not iconography.

---

## Spacing & elevation

- **Spacing scale:** `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80` (px). Most surfaces snap to multiples of 8.
- **Card inner padding:** `20–24px` on data cards, `32–48px` on hero/marketing cards.
- **Stack rhythm:** `gap: 16px` between siblings within a card; `gap: 24px` between cards.
- **Sticky regions:** navs and headers cast a soft bottom shadow (`box-shadow: 0px 10px 15px -3px rgba(23,22,22,0.8)` on dark nav, `border-bottom: 1px solid #E5E7EB` on light header).

---

## Folder index

```
.
├── README.md                ← this file
├── SKILL.md                 ← Claude Code/Agent Skill manifest
├── colors_and_type.css      ← all tokens + semantic type classes
├── assets/                  ← logos, icons, brand marks
│   ├── logo-securex.svg
│   ├── logo-blue.png        (light surfaces)
│   ├── logo-green.png       (dark surfaces)
│   ├── logo-icon.png        (square app icon)
│   ├── logo-favicon.png
│   └── icons/
│       ├── check.svg
│       └── paper.svg
├── preview/                 ← per-token preview cards rendered in the Design System tab
├── ui_kits/
│   └── securex_app/         ← rich-redesign UI kit for the PWA
│       ├── index.html       (clickable demo)
│       ├── README.md
│       └── *.jsx            (one component per file)
├── _source/                 ← original SecureX-App import (read-only reference)
│   ├── pages/               (LandinPage, Dashboard, Login, etc.)
│   ├── styles/              (8 source CSS files)
│   ├── assets/
│   └── src/
└── uploads/
    ├── PRD FOR SECUREX.docx
    └── PRD_extracted.txt
```

---

## Caveats / known substitutions

- **Sora font** has been *added* for richer headline expression — the original product uses Inter everywhere. If the team wants to stay 100% Inter, swap `--font-display` to `'Inter'` in `colors_and_type.css` (one line).
- The source `logo-green.png` is white-on-transparent at thumbnail size; it reads as blank against this README's preview. It looks correct on a dark navy surface — see the UI kit's marketing header.
- The Heroicons set is referenced via the existing import in the source — for the kit we hand-inline matching SVG paths so there's no runtime dependency on `@heroicons/react`.
