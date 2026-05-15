// LandingScreen.jsx — full marketing page
const LandingScreen = ({ go }) => (
  <div data-screen-label="01 Landing">
    <MarketingNav onLogin={() => go('login')} onSignup={() => go('login')} />
    <HeroSection onCta={() => go('login')} />

    {/* How it works (light section) */}
    <section style={{ background: 'white', padding: '88px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#00D9A3', marginBottom: 12 }}>HOW IT WORKS</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
          A single, calm flow — for buyer and seller.
        </h2>
        <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 560, margin: '0 auto 56px' }}>
          The same four steps, every time. No surprises, no edge cases that
          stop a sale dead in its tracks.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {[
            { icon: 'document', t: 'Start a transaction',  d: 'Seller creates a SafePay link with item, price, and terms.' },
            { icon: 'card',     t: 'Pay as agreed',         d: 'Buyer deposits into the escrow vault. Funds locked.' },
            { icon: 'eye',      t: 'Track the order',       d: 'Both sides see status in real time across PWA + SMS.' },
            { icon: 'archive',  t: 'Release the payout',    d: 'OTP confirmation triggers release. Auto-release in 48h.' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 12px' }}>
              <div style={{
                width: 72, height: 72,
                background: 'linear-gradient(135deg,#D1FAE5 0%,#A7F3D0 100%)',
                borderRadius: 18,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}>
                <Icon name={s.icon} size={32} stroke="#00C394" strokeWidth={1.7} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1E1E1E', margin: '0 0 8px' }}>{s.t}</h3>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Why choose */}
    <section style={{ background: '#F9FAFB', padding: '88px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: '#111827', letterSpacing: '-0.02em', margin: '0 0 12px' }}>
            Why SecureX
          </h2>
          <p style={{ fontSize: 16, color: '#6B7280', maxWidth: 560, margin: '0 auto' }}>
            Trust isn't a feature — it's the whole product.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {[
            { icon: 'lock',    t: 'Bank-level security',          d: 'AES-256 at rest, TLS in transit, PCI-DSS-aligned controls. Your money never sits exposed.' },
            { icon: 'shield',  t: 'TrustScore™ on every profile', d: 'A live 0–100 trust score from completion rate, dispute history and KYC tier. Buyers see it before they pay.' },
            { icon: 'phone',   t: 'Works on any phone',           d: 'PWA on smartphones, USSD on feature phones. No customer left behind on 2G.' },
            { icon: 'sparkle', t: 'AI inventory & insights',      d: 'SecureX learns your sales rhythm and recommends what to restock and when.' },
          ].map((b, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid #E5E7EB',
              borderRadius: 16, padding: '28px 28px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
              display: 'flex', gap: 18,
            }}>
              <div style={{
                width: 56, height: 56, background: '#EEF2FF', borderRadius: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={b.icon} size={26} stroke="#4A5CF5" strokeWidth={1.8} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1E1E1E', margin: '0 0 6px' }}>{b.t}</h3>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{b.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section style={{
      background: 'linear-gradient(135deg,#252A5C 0%,#1A1F3F 100%)',
      padding: '88px 48px', textAlign: 'center', color: 'white',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
          Ready to make your next sale safer?
        </h2>
        <p style={{ fontSize: 17, opacity: 0.85, margin: '0 0 32px' }}>
          Join 8,000+ SMEs across Africa using SecureX to settle high-stakes
          transactions in minutes.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
          <Button kind="mint" size="lg" onClick={() => go('login')} trailing={<Icon name="arrowRight" size={16} stroke="white" strokeWidth={2.2} />}>Create account</Button>
          <button style={{
            background: 'transparent', border: '2px solid white', color: 'white',
            padding: '12px 28px', borderRadius: 10, fontWeight: 600, fontSize: 15,
            cursor: 'pointer', fontFamily: 'inherit',
          }}>Talk to sales</button>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer style={{ background: '#0F1230', color: 'white', padding: '48px 48px 28px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ShieldMark size={32} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>SecureX</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Security</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Status</a>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>© 2026 SecureX. SDG 9 · Lagos</div>
      </div>
    </footer>
  </div>
);
window.LandingScreen = LandingScreen;
