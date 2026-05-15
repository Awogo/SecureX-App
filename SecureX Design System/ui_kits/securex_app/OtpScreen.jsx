// OtpScreen.jsx — buyer confirms delivery with 6-digit OTP
const OtpScreen = ({ go }) => {
  const [code, setCode] = React.useState('428');
  const [step, setStep] = React.useState('enter'); // 'enter' | 'success'
  const [secs, setSecs] = React.useState(168);

  React.useEffect(() => {
    if (step !== 'enter') return;
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [step]);

  const handleConfirm = () => {
    if (code.length === 6) setStep('success');
    else setCode('428913');
  };

  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');

  return (
    <div data-screen-label="06 OTP confirm" style={{
      minHeight: '100vh', background: '#F6F7FB',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '48px 20px',
    }}>
      <div style={{
        width: '100%', maxWidth: 460,
        background: 'white', borderRadius: 20,
        padding: '36px 36px 32px',
        boxShadow: '0 16px 48px rgba(15,18,48,0.10)',
        border: '1px solid #EEF0F4',
      }}>
        {step === 'enter' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
              <button onClick={() => go('detail')} style={{
                width: 36, height: 36, borderRadius: 10, background: '#F6F7FB',
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <Badge kind="escrow">In escrow · ₦42,500</Badge>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                background: 'linear-gradient(135deg,#4A5CF5 0%,#2C36A2 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 12px 30px rgba(74,92,245,0.30)',
                marginBottom: 16,
              }}>
                <Icon name="lock" size={28} stroke="white" strokeWidth={2} />
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: '#1E1E1E', margin: '0 0 6px', letterSpacing: '-0.01em', textAlign: 'center' }}>
                Confirm delivery
              </h1>
              <p style={{ fontSize: 14, color: '#7A7A7A', textAlign: 'center', margin: 0, maxWidth: 320 }}>
                Enter the 6-digit code we sent to the buyer's phone. Funds release the moment we verify it.
              </p>
            </div>

            <OtpInput value={code} onChange={setCode} />

            <div style={{ textAlign: 'center', marginTop: 18, fontSize: 13, color: '#7A7A7A' }}>
              Didn't get it?{' '}
              <span style={{ color: '#4A5CF5', fontWeight: 600 }}>
                Resend in <span style={{ fontFamily: 'var(--font-mono)' }}>{m}:{s}</span>
              </span>
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: 12, marginTop: 20,
              background: 'rgba(74,92,245,0.06)',
              border: '1px solid rgba(74,92,245,0.15)',
              borderRadius: 10,
              fontSize: 12, color: '#2C36A2',
            }}>
              <Icon name="info" size={16} stroke="#2C36A2" strokeWidth={2} />
              <span>Three wrong attempts will lock this transaction for 30 minutes. Need help? Use the USSD fallback <strong>*584#</strong>.</span>
            </div>

            <Button kind="primary" block size="lg" onClick={handleConfirm} style={{ marginTop: 18 }}>
              Verify &amp; release funds
            </Button>
          </>
        )}

        {step === 'success' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0 6px' }}>
            <FlashSuccess size={96} />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#1E1E1E', margin: '28px 0 8px', letterSpacing: '-0.01em', textAlign: 'center' }}>
              Funds released.
            </h1>
            <p style={{ fontSize: 14, color: '#7A7A7A', textAlign: 'center', margin: 0, maxWidth: 340, lineHeight: 1.6 }}>
              <strong style={{ color: '#1E1E1E' }}>₦42,500</strong> has settled into Blessing's
              wallet. A digital receipt is on the way to both parties.
            </p>

            <div style={{
              marginTop: 24, width: '100%',
              background: '#F6F7FB', borderRadius: 12, padding: '14px 16px',
              fontFamily: 'var(--font-mono)', fontSize: 13, color: '#1E1E1E',
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span style={{ color: '#7A7A7A' }}>Receipt</span>
              <span>TXN-0x7f3b · 10:14 WAT</span>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 22, width: '100%' }}>
              <Button kind="ghost" block onClick={() => go('dashboard')}>Back to dashboard</Button>
              <Button kind="primary" block onClick={() => { setStep('enter'); setCode(''); setSecs(168); }}>Done</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
window.OtpScreen = OtpScreen;
