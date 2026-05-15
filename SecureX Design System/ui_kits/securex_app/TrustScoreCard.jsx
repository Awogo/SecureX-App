// TrustScoreCard.jsx
const TrustScoreCard = ({ score = 92 }) => {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (c * score / 100);
  return (
    <div style={{
      background: 'linear-gradient(135deg,#4A5CF5 0%,#2C36A2 100%)',
      borderRadius: 20,
      padding: 28,
      color: 'white',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      gap: 24,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 14px 36px rgba(44,54,162,0.28)',
    }}>
      {/* Decorative grid */}
      <svg style={{ position: 'absolute', inset: 0, opacity: 0.07, pointerEvents: 'none' }} width="100%" height="100%">
        <defs>
          <pattern id="ts-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="white" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ts-grid)" />
      </svg>

      <div style={{ position: 'relative', flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>TrustScore™</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 26, marginTop: 6, letterSpacing: '-0.02em' }}>Your trust is rising</div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          marginTop: 12, padding: '5px 12px', borderRadius: 999,
          background: 'rgba(255,255,255,0.18)', fontSize: 12, fontWeight: 600,
        }}>
          <span style={{ width: 6, height: 6, background: '#00D9A3', borderRadius: '50%' }} />
          Excellent · Top 15% of sellers
        </span>
        <div style={{ display: 'flex', gap: 18, marginTop: 18, fontSize: 12, opacity: 0.85 }}>
          <div><div style={{ opacity: 0.7, marginBottom: 2 }}>Completion</div><div style={{ fontWeight: 700, fontSize: 15, opacity: 1 }}>98%</div></div>
          <div><div style={{ opacity: 0.7, marginBottom: 2 }}>Disputes</div><div style={{ fontWeight: 700, fontSize: 15, opacity: 1 }}>0.2%</div></div>
          <div><div style={{ opacity: 0.7, marginBottom: 2 }}>KYC tier</div><div style={{ fontWeight: 700, fontSize: 15, opacity: 1 }}>Tier 2</div></div>
        </div>
      </div>

      <div style={{ position: 'relative', width: 136, height: 136, flexShrink: 0 }}>
        <svg width="136" height="136" viewBox="0 0 136 136">
          <circle cx="68" cy="68" r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="10" />
          <circle cx="68" cy="68" r={r} fill="none" stroke="white" strokeWidth="10"
                  strokeDasharray={c} strokeDashoffset={offset}
                  strokeLinecap="round" transform="rotate(-90 68 68)" />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>{score}</div>
          <div style={{ fontSize: 10, opacity: 0.7, marginTop: 4, letterSpacing: '0.08em' }}>OF 100</div>
        </div>
      </div>
    </div>
  );
};
window.TrustScoreCard = TrustScoreCard;
