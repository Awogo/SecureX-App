// TransactionDetailScreen.jsx
const TransactionDetailScreen = ({ go }) => (
  <div data-screen-label="05 Transaction detail" className="app-shell">
    <Sidebar active="transactions" onNavigate={(k) => {
      if (k === 'dashboard') go('dashboard');
      else if (k === 'transactions') go('transactions');
      else if (k === 'login') go('login');
      else go('detail');
    }} />
    <main className="app-main">
      <AppHeader title="Transaction · TXN-0x7f3b"
        subtitle="iPad Pro 11&quot; M2 · Aisha Bello → Blessing Okonkwo" />
      <section className="app-content">
        <div style={{
          maxWidth: 1280,
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22,
        }}>
          {/* Left: details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {/* Top banner */}
            <div style={{
              background: 'linear-gradient(135deg,#1A1F3F 0%,#2C36A2 100%)',
              borderRadius: 20, padding: 28,
              color: 'white', display: 'flex', alignItems: 'center', gap: 24,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="lock" size={28} stroke="#00D9A3" strokeWidth={1.8} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>IN ESCROW</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, marginTop: 4, letterSpacing: '-0.02em' }}>
                  <span style={{ opacity: 0.7, fontSize: 22, marginRight: 2 }}>₦</span>42,500
                </div>
                <div style={{ fontSize: 13, opacity: 0.78, marginTop: 4 }}>
                  Funds will auto-release in <strong style={{ color: 'white' }}>47h 18m</strong> if no dispute is raised.
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Button kind="mint" size="sm">Release now</Button>
                <Button kind="danger" size="sm">Raise dispute</Button>
              </div>
            </div>

            {/* Parties */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 40px 1fr', alignItems: 'stretch',
              background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 22,
              gap: 12,
            }}>
              {[
                { side: 'Buyer',  name: 'Aisha Bello',       handle: '@aisha.b',     score: 88, tone: '#FEF3C7', toneFg: '#92400E', initials: 'AB' },
                { side: 'Seller', name: 'Blessing Okonkwo',  handle: '@blessing.ok', score: 92, tone: '#EEF2FF', toneFg: '#2C36A2', initials: 'BO' },
              ].map((p, i, arr) => (
                <React.Fragment key={p.side}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#7A7A7A', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>{p.side}</div>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <Avatar initials={p.initials} color={p.toneFg} size={44} />
                      <div>
                        <div style={{ fontWeight: 700, color: '#1E1E1E' }}>{p.name}</div>
                        <div style={{ fontSize: 12, color: '#7A7A7A', fontFamily: 'var(--font-mono)' }}>{p.handle}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, borderRadius: 999, background: '#F6F7FB', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${p.score}%`, background: '#00D9A3', borderRadius: 999 }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#1E1E1E', fontFamily: 'var(--font-display)' }}>{p.score}</span>
                      <span style={{ fontSize: 11, color: '#7A7A7A' }}>TrustScore™</span>
                    </div>
                  </div>
                  {i === 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: '#F6F7FB', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#4A5CF5',
                      }}>
                        <Icon name="arrowRight" size={18} stroke="#4A5CF5" strokeWidth={2} />
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Item details */}
            <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 22 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#1E1E1E', marginBottom: 14 }}>Transaction details</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
                {[
                  ['Item', 'iPad Pro 11" M2 · 256GB Space Black'],
                  ['Transaction ID', 'TXN-0x7f3b'],
                  ['Initiated', 'May 14, 2026 · 09:24 WAT'],
                  ['Inspection window', '48h after delivery'],
                  ['Payment method', 'Bank transfer · GTBank'],
                  ['Delivery', 'Lagos · ETA May 15'],
                ].map(([k,v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#7A7A7A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 14, color: '#1E1E1E', fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <EscrowTimeline active={3} />
            <div style={{
              background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 14,
              padding: 18, display: 'flex', gap: 12,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="info" size={16} stroke="#92400E" strokeWidth={2} />
              </div>
              <div style={{ fontSize: 13, color: '#92400E', lineHeight: 1.55 }}>
                <strong>Awaiting confirmation.</strong> Aisha received the OTP at 10:02. Once she enters it, funds release to your wallet automatically.
              </div>
            </div>
            <Button kind="primary" block onClick={() => go('otp')} trailing={<Icon name="arrowRight" size={14} stroke="white" strokeWidth={2.2}/>}>
              Buyer-side · enter OTP
            </Button>
          </div>
        </div>
      </section>
    </main>
  </div>
);
window.TransactionDetailScreen = TransactionDetailScreen;
