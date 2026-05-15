// HeroSection.jsx — landing page hero with navy gradient + glass card
const HeroSection = ({ onCta }) => (
  <section style={{
    background: 'linear-gradient(180deg,#0F1230 0%,#1A1F3F 30%,#252A5C 70%,#2C3672 100%)',
    padding: '72px 48px 96px',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Soft glow */}
    <div style={{
      position: 'absolute', top: '20%', left: '-10%', width: 400, height: 400,
      background: 'radial-gradient(circle, rgba(74,92,245,0.4), transparent 60%)',
      filter: 'blur(40px)', pointerEvents: 'none',
    }} />
    <div style={{
      position: 'absolute', bottom: '-10%', right: '-5%', width: 480, height: 480,
      background: 'radial-gradient(circle, rgba(0,217,163,0.18), transparent 60%)',
      filter: 'blur(40px)', pointerEvents: 'none',
    }} />

    <div style={{
      maxWidth: 1280, margin: '0 auto',
      display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64,
      alignItems: 'center', position: 'relative',
    }}>
      <div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 999,
          background: 'rgba(0,217,163,0.10)', border: '1px solid rgba(0,217,163,0.30)',
          color: '#00D9A3', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
          marginBottom: 22,
        }}>
          <Icon name="shield" size={13} stroke="#00D9A3" strokeWidth={2} />
          SDG 9 · Built for African SMEs
        </span>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 64, fontWeight: 800,
          color: 'white', margin: 0, lineHeight: 1.05,
          letterSpacing: '-0.025em',
        }}>
          <span style={{ color: '#00D9A3' }}>Secure</span> every<br/>
          transaction with<br/>
          unshakeable trust.
        </h1>

        <p style={{
          fontSize: 18, color: 'rgba(255,255,255,0.78)',
          margin: '24px 0 36px', maxWidth: 480, lineHeight: 1.6,
        }}>
          SecureX is the smart-escrow PWA helping African SMEs and their customers
          buy &amp; sell without fear. Funds wait until delivery is confirmed.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 6, borderRadius: 14, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', maxWidth: 460 }}>
          <input placeholder="you@business.com" style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: 'white', padding: '12px 16px', fontSize: 14, fontFamily: 'inherit',
          }} />
          <button onClick={onCta} style={{
            background: '#00D9A3', border: 'none',
            padding: '12px 22px', borderRadius: 10,
            color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer',
            fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6,
          }}>Get started <Icon name="arrowRight" size={14} stroke="white" strokeWidth={2.2}/></button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 16, color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
          <span>No credit card required</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>USSD &amp; SMS fallback</span>
          <span style={{ opacity: 0.4 }}>•</span>
          <span>1,500+ active SMEs</span>
        </div>
      </div>

      {/* Glass card */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 24, padding: 36,
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
      }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#00D9A3', marginBottom: 10 }}>HOW SAFEPAY WORKS</div>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: 24, fontWeight: 700, margin: '0 0 24px', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
          Four steps to a transaction<br/>both sides can trust.
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            'Buyer initiates SafePay link',
            'Funds secured in escrow vault',
            'Seller dispatches, buyer gets OTP',
            'Buyer confirms — funds release instantly',
          ].map((t, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 16px', borderRadius: 14,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: '#00D9A3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 0 4px rgba(0,217,163,0.18)',
              }}>
                <Icon name="check" size={14} stroke="white" strokeWidth={2.6} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: 14, fontWeight: 500 }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
window.HeroSection = HeroSection;
