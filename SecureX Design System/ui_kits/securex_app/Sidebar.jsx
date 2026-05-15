// Sidebar.jsx — app left rail
const Sidebar = ({ active, onNavigate, user = { name: 'Blessing Okonkwo', email: 'b.okonkwo@securex.com', initials: 'BO' } }) => {
  const items = [
    { key: 'dashboard',    label: 'Dashboard',     icon: 'grid' },
    { key: 'transactions', label: 'Transactions',  icon: 'list' },
    { key: 'ai',           label: 'AI Insights',   icon: 'sparkle' },
    { key: 'verification', label: 'Verification',  icon: 'shield' },
    { key: 'settings',     label: 'Settings',      icon: 'settings' },
  ];
  return (
    <aside style={{
      width: 260, background: 'white',
      borderRight: '1px solid #E5E7EB',
      display: 'flex', flexDirection: 'column',
      padding: '22px 16px',
      gap: 18,
      flexShrink: 0,
      position: 'sticky', top: 0, alignSelf: 'flex-start',
      height: '100vh',
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px' }}>
        <ShieldMark size={36} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: '#1E1E1E', lineHeight: 1 }}>SecureX</div>
          <div style={{ fontSize: 11, color: '#7A7A7A', marginTop: 2 }}>Smart Escrow</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {items.map(it => {
          const on = active === it.key;
          return (
            <button
              key={it.key}
              onClick={() => onNavigate(it.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 12px',
                background: on ? 'linear-gradient(135deg,#4A5CF5 0%,#2C36A2 100%)' : 'transparent',
                border: 'none', borderRadius: 10,
                color: on ? 'white' : '#374151',
                fontSize: 14, fontWeight: on ? 600 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: on ? '0 6px 18px rgba(74,92,245,0.25)' : 'none',
                transition: 'background .15s, color .15s',
              }}
              onMouseEnter={e => { if (!on) e.currentTarget.style.background = '#F6F7FB'; }}
              onMouseLeave={e => { if (!on) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon name={it.icon} size={18} strokeWidth={on ? 1.8 : 1.6} stroke={on ? 'white' : '#7A7A7A'} />
              <span>{it.label}</span>
              {it.key === 'ai' && (
                <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700,
                  padding: '2px 7px', borderRadius: 999,
                  background: on ? 'rgba(255,255,255,0.2)' : '#D1FAE5',
                  color: on ? 'white' : '#047857' }}>NEW</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{ borderTop: '1px solid #EEF0F4', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: 10, borderRadius: 12, background: '#F6F7FB',
        }}>
          <Avatar initials={user.initials} color="#4A5CF5" size={36} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#1E1E1E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
            <div style={{ fontSize: 11, color: '#7A7A7A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.email}</div>
          </div>
        </div>
        <button
          onClick={() => onNavigate('login')}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '10px', background: 'transparent',
            border: '1px solid #E5E7EB', borderRadius: 8,
            color: '#EF4444', fontWeight: 500, fontSize: 13, cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          <Icon name="logout" size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
};
window.Sidebar = Sidebar;
