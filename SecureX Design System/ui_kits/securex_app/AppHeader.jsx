// AppHeader.jsx — sticky top bar
const AppHeader = ({ title, subtitle, action }) => {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '18px 32px',
      background: 'white',
      borderBottom: '1px solid #E5E7EB',
      position: 'sticky', top: 0, zIndex: 5,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: '#111827', letterSpacing: '-0.01em' }}>{title}</div>}
        {subtitle && <div style={{ fontSize: 13, color: '#7A7A7A', marginTop: 2 }}>{subtitle}</div>}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px',
        background: '#F6F7FB', borderRadius: 10,
        width: 320, maxWidth: '40vw',
      }}>
        <Icon name="search" size={16} stroke="#7A7A7A" />
        <input
          placeholder="Search transactions, buyers…"
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 13, color: '#1E1E1E' }}
        />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#7A7A7A', padding: '2px 6px', background: 'white', borderRadius: 4, border: '1px solid #E5E7EB' }}>⌘K</span>
      </div>

      <button style={{
        position: 'relative',
        width: 40, height: 40, background: '#F6F7FB',
        border: 'none', borderRadius: 10, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="bell" size={18} stroke="#1E1E1E" />
        <span style={{
          position: 'absolute', top: 6, right: 6,
          width: 8, height: 8, borderRadius: '50%',
          background: '#EF4444', border: '2px solid white',
        }} />
      </button>

      {action || (
        <Button kind="primary" size="sm" leading={<Icon name="plus" size={14} stroke="white" strokeWidth={2} />}>
          New transaction
        </Button>
      )}

      <Avatar initials="BO" color="#2C36A2" size={36} />
    </header>
  );
};
window.AppHeader = AppHeader;
