// StatCard.jsx
const StatCard = ({ label, value, currency = '₦', delta, deltaPositive, badge, icon }) => (
  <div style={{
    background: 'white',
    border: '1px solid #E5E7EB',
    borderRadius: 16,
    padding: '18px 18px',
    display: 'flex', flexDirection: 'column', gap: 8,
    boxShadow: '0 1px 2px rgba(17,24,39,0.04)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 12, color: '#7A7A7A', fontWeight: 500 }}>{label}</span>
      {icon && (
        <span style={{
          width: 28, height: 28, borderRadius: 8,
          background: '#F6F7FB',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: '#4A5CF5',
        }}>
          <Icon name={icon} size={14} stroke="#4A5CF5" />
        </span>
      )}
    </div>
    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#111827', letterSpacing: '-0.02em', lineHeight: 1 }}>
      <span style={{ fontSize: 16, opacity: 0.6, marginRight: 3 }}>{currency}</span>{value}
    </div>
    <div>
      {delta && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 12, fontWeight: 600,
          color: deltaPositive ? '#047857' : '#991B1B',
        }}>
          <Icon name={deltaPositive ? 'arrowUpRight' : 'arrowDownRight'} size={11} strokeWidth={2.4} stroke="currentColor" />
          {delta}
        </span>
      )}
      {badge && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '3px 9px', background: '#D1FAE5', color: '#047857',
          borderRadius: 999, fontSize: 11, fontWeight: 600,
        }}>
          <Icon name="shield" size={11} stroke="#047857" strokeWidth={2.2} />
          {badge}
        </span>
      )}
    </div>
  </div>
);
window.StatCard = StatCard;
