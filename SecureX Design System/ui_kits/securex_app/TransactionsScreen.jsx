// TransactionsScreen.jsx
const TransactionsScreen = ({ go }) => {
  const [filter, setFilter] = React.useState('all');
  const filters = [
    { key: 'all',      label: 'All', n: 6 },
    { key: 'escrow',   label: 'In escrow', n: 1 },
    { key: 'awaiting', label: 'Awaiting OTP', n: 1 },
    { key: 'released', label: 'Released', n: 3 },
    { key: 'disputed', label: 'Disputed', n: 1 },
  ];
  const rows = filter === 'all' ? sampleTxns : sampleTxns.filter(t => t.status === filter);

  return (
    <div data-screen-label="04 Transactions" className="app-shell">
      <Sidebar active="transactions" onNavigate={(k) => {
        if (k === 'dashboard') go('dashboard');
        else if (k === 'login') go('login');
        else go('transactions');
      }} />
      <main className="app-main">
        <AppHeader
          title="Transactions"
          subtitle="Every SafePay you've ever started, in one ledger."
          action={<Button kind="primary" size="sm" leading={<Icon name="plus" size={14} stroke="white" strokeWidth={2.4}/>}>New transaction</Button>}
        />
        <section className="app-content">
          <div style={{ maxWidth: 1280, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '8px 14px', borderRadius: 999,
                  background: filter === f.key ? '#1A1F3F' : 'white',
                  color: filter === f.key ? 'white' : '#374151',
                  border: '1px solid ' + (filter === f.key ? '#1A1F3F' : '#E5E7EB'),
                  fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  {f.label}
                  <span style={{
                    padding: '2px 7px', borderRadius: 999, fontSize: 11,
                    background: filter === f.key ? 'rgba(255,255,255,0.18)' : '#F6F7FB',
                    color: filter === f.key ? 'white' : '#7A7A7A',
                  }}>{f.n}</span>
                </button>
              ))}
              <div style={{ flex: 1 }} />
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 10,
                background: 'white', border: '1px solid #E5E7EB',
                color: '#374151', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <Icon name="document" size={14} stroke="#374151" />
                Export
              </button>
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 10,
                background: 'white', border: '1px solid #E5E7EB',
                color: '#374151', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
              }}>
                <Icon name="chevronDown" size={14} stroke="#374151" />
                Date range
              </button>
            </div>

            {/* Summary band */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14,
            }}>
              <StatCard label="Total volume"  value="1,929,500" delta="+22% mo/mo" deltaPositive />
              <StatCard label="In escrow"     value="42,500"    badge="1 active" />
              <StatCard label="Released this month" value="1,755,000" delta="+18%" deltaPositive />
              <StatCard label="Avg. release time"   value="6.4h"  currency="" />
            </div>

            <TransactionsTable rows={rows} onRowClick={() => go('detail')} title={filter === 'all' ? 'All transactions' : filters.find(f => f.key === filter).label} />
          </div>
        </section>
      </main>
    </div>
  );
};
window.TransactionsScreen = TransactionsScreen;
