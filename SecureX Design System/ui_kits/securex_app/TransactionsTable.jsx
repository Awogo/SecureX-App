// TransactionsTable.jsx
const sampleTxns = [
  { id: 'TXN-0x7f3a', name: 'Chinedu Okeke',     ref: 'Galaxy S24 Ultra · 256GB',   initials: 'CO', tone: '#EEF2FF', toneFg: '#2C36A2', amount: '185,000', status: 'released',  date: 'May 14' },
  { id: 'TXN-0x7f3b', name: 'Aisha Bello',        ref: 'iPad Pro 11" M2',           initials: 'AB', tone: '#FEF3C7', toneFg: '#92400E', amount: '42,500',  status: 'escrow',    date: 'May 14' },
  { id: 'TXN-0x7f39', name: 'Mama Funmi Foods',   ref: 'Wholesale palm oil · 20L',  initials: 'MF', tone: '#D1FAE5', toneFg: '#047857', amount: '78,000',  status: 'awaiting',  date: 'May 13' },
  { id: 'TXN-0x7f37', name: 'Kola Adeyemi',       ref: 'MacBook Air M3',            initials: 'KA', tone: '#EEF2FF', toneFg: '#2C36A2', amount: '1,250,000', status: 'released',date: 'May 12' },
  { id: 'TXN-0x7f33', name: 'Zainab Olawale',     ref: 'Wedding fabric · 6 yards',  initials: 'ZO', tone: '#FEE2E2', toneFg: '#991B1B', amount: '54,000',  status: 'disputed',  date: 'May 11' },
  { id: 'TXN-0x7f31', name: 'Tunde Marketplace',  ref: 'Bulk smartphone cases',     initials: 'TM', tone: '#D1FAE5', toneFg: '#047857', amount: '320,000', status: 'released',  date: 'May 10' },
];

const TransactionsTable = ({ onRowClick, compact, rows = sampleTxns, title = 'Recent transactions' }) => {
  return (
    <div style={{
      background: 'white', border: '1px solid #E5E7EB',
      borderRadius: 16, overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', borderBottom: '1px solid #EEF0F4',
      }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: '#1E1E1E', fontFamily: 'var(--font-display)' }}>{title}</div>
        <button style={{ background: 'transparent', border: 'none', color: '#4A5CF5', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
          See all →
        </button>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: compact ? '1.6fr 0.9fr 0.9fr' : '1.6fr 0.9fr 0.9fr 0.6fr 50px',
        padding: '10px 20px', borderBottom: '1px solid #EEF0F4',
        fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7A7A7A',
      }}>
        <div>Counterparty</div>
        <div>Amount</div>
        <div>Status</div>
        {!compact && <div>Date</div>}
        {!compact && <div></div>}
      </div>

      {rows.map((r, i) => (
        <button
          key={r.id}
          onClick={() => onRowClick && onRowClick(r)}
          style={{
            display: 'grid',
            gridTemplateColumns: compact ? '1.6fr 0.9fr 0.9fr' : '1.6fr 0.9fr 0.9fr 0.6fr 50px',
            alignItems: 'center',
            padding: '14px 20px',
            borderTop: i === 0 ? 'none' : '1px solid #EEF0F4',
            background: 'transparent', border: 'none',
            width: '100%', cursor: 'pointer',
            textAlign: 'left', fontFamily: 'inherit',
            transition: 'background .12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#FAFBFC'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
            <Avatar initials={r.initials} color={r.toneFg} size={36} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1E1E1E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name}</div>
              <div style={{ fontSize: 12, color: '#7A7A7A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.ref}</div>
            </div>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#111827' }}>
            <span style={{ opacity: 0.5, marginRight: 2 }}>₦</span>{r.amount}
          </div>
          <div><Badge kind={r.status} /></div>
          {!compact && <div style={{ fontSize: 13, color: '#7A7A7A' }}>{r.date}</div>}
          {!compact && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', color: '#9CA3AF' }}>
              <Icon name="chevronRight" size={16} />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

window.TransactionsTable = TransactionsTable;
window.sampleTxns = sampleTxns;
