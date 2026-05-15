// DashboardScreen.jsx
const Sparkline = ({ color = '#00D9A3' }) => (
  <svg viewBox="0 0 400 140" preserveAspectRatio="none" style={{ width: '100%', height: 140 }}>
    <defs>
      <linearGradient id="dash-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={color} stopOpacity="0.25" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,110 C40,100 70,80 100,90 C130,100 160,60 200,55 C240,50 270,80 300,60 C330,40 360,30 400,20 L400,140 L0,140 Z" fill="url(#dash-grad)" />
    <path d="M0,110 C40,100 70,80 100,90 C130,100 160,60 200,55 C240,50 270,80 300,60 C330,40 360,30 400,20" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    {[[100,90,'#4A5CF5'],[200,55,'#00D9A3'],[300,60,'#4A5CF5'],[400,20,'#00D9A3']].map(([x,y,c],i) =>
      <circle key={i} cx={x} cy={y} r="4" fill={c} stroke="white" strokeWidth="2" />)}
  </svg>
);

const Donut = () => {
  const segments = [
    { value: 45, color: '#4A5CF5', label: 'Bank transfer' },
    { value: 30, color: '#00D9A3', label: 'Mobile money' },
    { value: 15, color: '#2C36A2', label: 'Card' },
    { value: 10, color: '#A7F3D0', label: 'Crypto' },
  ];
  let offset = 0;
  const C = 2 * Math.PI * 56;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="56" fill="none" stroke="#F6F7FB" strokeWidth="22" />
        {segments.map((s, i) => {
          const len = (s.value / 100) * C;
          const el = (
            <circle key={i} cx="80" cy="80" r="56" fill="none" stroke={s.color} strokeWidth="22"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 80 80)" />
          );
          offset += len;
          return el;
        })}
        <text x="80" y="74" textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fontWeight="800" fill="#1E1E1E">₦2.4M</text>
        <text x="80" y="92" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="11" fill="#7A7A7A">in escrow</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {segments.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
            <span style={{ color: '#1E1E1E', flex: 1 }}>{s.label}</span>
            <span style={{ color: '#7A7A7A', fontVariantNumeric: 'tabular-nums' }}>{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AiCard = () => (
  <div style={{
    background: 'linear-gradient(135deg, #0F1230 0%, #1A1F3F 60%, #2C3672 100%)',
    borderRadius: 16, padding: '20px 22px', color: 'white',
    position: 'relative', overflow: 'hidden',
  }}>
    <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, background: 'radial-gradient(circle, rgba(0,217,163,0.3), transparent 70%)', filter: 'blur(20px)' }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, position: 'relative' }}>
      <span style={{ display: 'inline-flex', width: 24, height: 24, borderRadius: 6, background: 'rgba(0,217,163,0.18)', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="sparkle" size={14} stroke="#00D9A3" strokeWidth={2} />
      </span>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#00D9A3' }}>AI insight</span>
    </div>
    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, lineHeight: 1.35, position: 'relative', marginBottom: 10 }}>
      Restock <span style={{ color: '#00D9A3' }}>palm-oil 20L</span> within 5 days.
    </div>
    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 14, position: 'relative' }}>
      Sales of this item are up <strong style={{ color: 'white' }}>34%</strong> w/w. At
      your current pace you'll be out of stock by Tuesday.
    </div>
    <button style={{
      background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
      color: 'white', padding: '8px 14px', borderRadius: 8,
      fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
      display: 'inline-flex', gap: 6, alignItems: 'center',
      position: 'relative',
    }}>View recommendations <Icon name="arrowRight" size={14} stroke="white" strokeWidth={2}/></button>
  </div>
);

const DashboardScreen = ({ go }) => (
  <div data-screen-label="03 Dashboard" className="app-shell">
    <Sidebar active="dashboard" onNavigate={(k) => {
      if (k === 'transactions') go('transactions');
      else if (k === 'login') go('login');
      else go('dashboard');
    }} />
    <main className="app-main">
      <AppHeader
        title="Welcome back, Blessing"
        subtitle="Here's how your business is moving today."
        action={<Button kind="primary" size="sm" onClick={() => go('detail')} leading={<Icon name="plus" size={14} stroke="white" strokeWidth={2.4}/>}>New transaction</Button>}
      />
      <section className="app-content">
        <div className="content-grid">
          <div className="col">
            <TrustScoreCard score={92} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              <StatCard label="Today's sale"  value="185,400" delta="+12.4%" deltaPositive icon="card" />
              <StatCard label="This week"     value="962K"    delta="+8.2%"  deltaPositive icon="arrowUpRight" />
              <StatCard label="Escrow held"   value="2.4M"    badge="Secured" icon="lock" />
              <StatCard label="Total volume"  value="14.6M"   delta="+22%"   deltaPositive icon="bank" />
            </div>

            <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: '22px 22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#1E1E1E' }}>Transaction trend</div>
                  <div style={{ fontSize: 12, color: '#7A7A7A' }}>Last 30 days · ₦962K total</div>
                </div>
                <div style={{ display: 'flex', gap: 4, background: '#F6F7FB', borderRadius: 999, padding: 3 }}>
                  {['7D','30D','90D'].map((p, i) => (
                    <button key={p} style={{
                      padding: '6px 12px', borderRadius: 999, border: 'none',
                      background: i === 1 ? 'white' : 'transparent',
                      color: i === 1 ? '#1E1E1E' : '#7A7A7A',
                      fontWeight: 600, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                      boxShadow: i === 1 ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
                    }}>{p}</button>
                  ))}
                </div>
              </div>
              <Sparkline />
            </div>

            <TransactionsTable onRowClick={() => go('detail')} title="Recent transactions" />
          </div>

          <div className="col">
            <AiCard />
            <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 22 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#1E1E1E', marginBottom: 16 }}>Escrow distribution</div>
              <Donut />
            </div>
            <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 22 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#1E1E1E', marginBottom: 12 }}>Quick actions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { i: 'plus',     t: 'Create SafePay link',    s: 'Generate a unique payment URL' },
                  { i: 'shield',   t: 'Verify identity',        s: 'Upload your government ID' },
                  { i: 'bank',     t: 'Withdraw to bank',       s: '₦1.2M available · Tier 2 limits' },
                ].map((q, i) => (
                  <button key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '12px 14px', borderRadius: 12, background: '#F6F7FB',
                    border: '1px solid transparent',
                    cursor: 'pointer', textAlign: 'left',
                    fontFamily: 'inherit', transition: 'border-color .15s, background .15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#4A5CF5'; e.currentTarget.style.background = '#EEF2FF'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = '#F6F7FB'; }}
                  >
                    <span style={{ width: 36, height: 36, borderRadius: 10, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A5CF5', flexShrink: 0 }}>
                      <Icon name={q.i} size={18} stroke="#4A5CF5" strokeWidth={1.8} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#1E1E1E' }}>{q.t}</div>
                      <div style={{ fontSize: 12, color: '#7A7A7A' }}>{q.s}</div>
                    </div>
                    <Icon name="chevronRight" size={16} stroke="#9CA3AF" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);
window.DashboardScreen = DashboardScreen;
