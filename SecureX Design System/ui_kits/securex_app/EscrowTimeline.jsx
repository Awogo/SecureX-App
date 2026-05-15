// EscrowTimeline.jsx
const stepStyle = (state) => {
  if (state === 'done')   return { ring: '#00D9A3', bg: '#00D9A3', fg: 'white',     text: '#1E1E1E', sub: '#6B7280' };
  if (state === 'active') return { ring: '#4A5CF5', bg: '#4A5CF5', fg: 'white',     text: '#1E1E1E', sub: '#4A5CF5' };
  return                          { ring: '#E5E7EB', bg: 'white',   fg: '#9CA3AF',   text: '#7A7A7A', sub: '#9CA3AF' };
};

const EscrowTimeline = ({ active = 2 }) => {
  const steps = [
    { title: 'Buyer initiated SafePay',  desc: 'Funds deposited to escrow',     time: 'Today · 09:24', icon: 'card' },
    { title: 'Funds secured in escrow',  desc: 'Held until delivery confirmed', time: 'Today · 09:24', icon: 'lock' },
    { title: 'Seller dispatched item',   desc: 'OTP delivered to buyer',        time: 'Today · 10:02', icon: 'archive' },
    { title: 'Buyer confirms with OTP',  desc: 'Triggers automatic release',    time: 'Pending',       icon: 'shield' },
    { title: 'Funds released to seller', desc: '48-hr auto-release if no dispute', time: '—',          icon: 'check' },
  ];

  return (
    <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: 16, padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#1E1E1E', marginBottom: 18 }}>SafePay timeline</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
        {steps.map((s, i) => {
          const state = i < active ? 'done' : i === active ? 'active' : 'idle';
          const st = stepStyle(state);
          const isLast = i === steps.length - 1;
          return (
            <div key={i} style={{ display: 'flex', gap: 14, position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: st.bg, border: `2px solid ${st.ring}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: st.fg,
                  boxShadow: state === 'active' ? '0 0 0 4px rgba(74,92,245,0.18)' : 'none',
                }}>
                  {state === 'done' ? <Icon name="check" size={16} stroke="white" strokeWidth={2.4} />
                                    : <Icon name={s.icon} size={14} stroke={st.fg} strokeWidth={1.8} />}
                </div>
                {!isLast && <div style={{
                  width: 2, flex: 1, minHeight: 28,
                  background: state === 'done' ? '#00D9A3' : '#E5E7EB',
                  margin: '4px 0',
                }} />}
              </div>
              <div style={{ paddingBottom: isLast ? 0 : 20, flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: st.text, marginBottom: 2 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: st.sub }}>{s.desc}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>{s.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
window.EscrowTimeline = EscrowTimeline;
