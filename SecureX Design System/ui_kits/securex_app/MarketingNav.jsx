// MarketingNav.jsx — dark sticky top nav for the landing page
const MarketingNav = ({ onLogin, onSignup }) => (
  <nav style={{
    position: 'sticky', top: 0, zIndex: 30,
    background: 'rgba(15, 18, 48, 0.92)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  }}>
    <div style={{
      maxWidth: 1280, margin: '0 auto',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 48px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ShieldMark size={34} />
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20,
          color: 'white', letterSpacing: '-0.01em',
        }}>SecureX</div>
      </div>
      <div style={{ display: 'flex', gap: 36 }}>
        {['Product', 'How it works', 'TrustScore™', 'Pricing', 'Contact'].map(l => (
          <a key={l} href="#" style={{
            color: 'rgba(255,255,255,0.78)', textDecoration: 'none',
            fontSize: 14, fontWeight: 500,
            transition: 'color .15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#00D9A3'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.78)'}
          >{l}</a>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onLogin} style={{
          background: 'transparent', border: '1px solid rgba(255,255,255,0.18)',
          color: 'white', padding: '10px 20px', borderRadius: 10,
          fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        }}>Sign in</button>
        <button onClick={onSignup} style={{
          background: '#00D9A3', border: 'none',
          color: 'white', padding: '10px 22px', borderRadius: 10,
          fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          boxShadow: '0 6px 18px rgba(0,217,163,0.25)',
        }}>Get started</button>
      </div>
    </div>
  </nav>
);
window.MarketingNav = MarketingNav;
