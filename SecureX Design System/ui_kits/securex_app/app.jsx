// app.jsx — main app shell with screen switcher
const screens = [
  { key: 'landing',      label: 'Landing',      Comp: 'LandingScreen' },
  { key: 'login',        label: 'Login',        Comp: 'LoginScreen' },
  { key: 'dashboard',    label: 'Dashboard',    Comp: 'DashboardScreen' },
  { key: 'transactions', label: 'Transactions', Comp: 'TransactionsScreen' },
  { key: 'detail',       label: 'Detail',       Comp: 'TransactionDetailScreen' },
  { key: 'otp',          label: 'OTP confirm',  Comp: 'OtpScreen' },
];

const App = () => {
  // Persist last screen so refreshes don't reset
  const [screen, setScreen] = React.useState(() => {
    return (typeof localStorage !== 'undefined' && localStorage.getItem('sx-screen')) || 'landing';
  });
  const go = (k) => {
    setScreen(k);
    try { localStorage.setItem('sx-screen', k); } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const Cur = window[screens.find(s => s.key === screen).Comp];

  return (
    <>
      <div className="demo-bar">
        <div className="brand">
          <span className="dot" />
          SecureX · UI kit
        </div>
        <div className="crumbs">click-thru demo · all data stubbed</div>
        <div className="grow" />
        <div className="seg">
          {screens.map(s => (
            <button key={s.key}
              className={screen === s.key ? 'active' : ''}
              onClick={() => go(s.key)}>{s.label}</button>
          ))}
        </div>
      </div>
      <div data-screen-label={screens.find(s => s.key === screen).label}>
        {Cur ? <Cur go={go} /> : <div style={{padding:40}}>Unknown screen: {screen}</div>}
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
