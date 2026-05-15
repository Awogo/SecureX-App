// LoginScreen.jsx
const LoginScreen = ({ go }) => {
  const [email, setEmail] = React.useState('blessing@securex.com');
  const [pw, setPw]       = React.useState('••••••••');

  return (
    <div data-screen-label="02 Login" style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg,#F6F7FB 0%,#EEF2FF 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 20px',
    }}>
      <div style={{
        width: '100%', maxWidth: 440,
        background: 'white', borderRadius: 20,
        padding: '40px 36px',
        boxShadow: '0 16px 48px rgba(15,18,48,0.10), 0 2px 8px rgba(15,18,48,0.04)',
        border: '1px solid #EEF0F4',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 28 }}>
          <ShieldMark size={52} />
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#1E1E1E', marginTop: 12 }}>SecureX</div>
          <div style={{ fontSize: 13, color: '#7A7A7A', marginTop: 2 }}>Smart escrow for African SMEs</div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#1E1E1E', textAlign: 'center', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
          Welcome back
        </h1>
        <p style={{ fontSize: 14, color: '#7A7A7A', textAlign: 'center', margin: '0 0 28px' }}>
          Sign in to continue securing your transactions.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Input label="Email" icon="mail" value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Password" icon="lock" type="password" value={pw} onChange={e => setPw(e.target.value)}
            trailing={<button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9CA3AF', display: 'flex' }}>
              <Icon name="eye" size={16} stroke="currentColor" />
            </button>} />

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: -8 }}>
            <a href="#" style={{ fontSize: 13, color: '#4A5CF5', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
          </div>

          <Button kind="primary" size="lg" block onClick={() => go('dashboard')}>Sign in</Button>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: 10, background: 'rgba(0,217,163,0.08)', borderRadius: 10,
            color: '#047857', fontSize: 12, fontWeight: 500,
          }}>
            <Icon name="lock" size={14} stroke="#047857" strokeWidth={2} />
            Bank-level encryption · Your data is protected
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#7A7A7A', marginTop: 22 }}>
          New to SecureX?{' '}
          <a href="#" onClick={e => { e.preventDefault(); go('dashboard'); }} style={{ color: '#4A5CF5', textDecoration: 'none', fontWeight: 600 }}>Create an account</a>
        </p>
      </div>
    </div>
  );
};
window.LoginScreen = LoginScreen;
