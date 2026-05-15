// Badge.jsx — status pill
const badgeStyles = {
  released:    { bg: '#D1FAE5', fg: '#047857', dot: '#00D9A3' },
  escrow:      { bg: '#EEF2FF', fg: '#2C36A2', dot: '#4A5CF5' },
  awaiting:    { bg: '#FEF3C7', fg: '#92400E', dot: '#F59E0B' },
  disputed:    { bg: '#FEE2E2', fg: '#991B1B', dot: '#EF4444' },
  draft:       { bg: '#F6F7FB', fg: '#374151', dot: '#9CA3AF' },
  secured:     { bg: '#1A1F3F', fg: 'white',   dot: '#00D9A3' },
};

const labels = {
  released: 'Released',
  escrow: 'In escrow',
  awaiting: 'Awaiting OTP',
  disputed: 'Disputed',
  draft: 'Draft',
  secured: 'Secured',
};

const Badge = ({ kind = 'released', children }) => {
  const s = badgeStyles[kind] || badgeStyles.draft;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999,
      background: s.bg, color: s.fg,
      fontSize: 12, fontWeight: 600, lineHeight: 1.4,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot }} />
      {children || labels[kind]}
    </span>
  );
};
window.Badge = Badge;
