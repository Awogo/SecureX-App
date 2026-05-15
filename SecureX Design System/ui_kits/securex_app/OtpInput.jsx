// OtpInput.jsx — 6-digit OTP grid
const OtpInput = ({ value, onChange, length = 6, autoFocus = true }) => {
  const refs = React.useRef([]);
  const chars = (value || '').padEnd(length, ' ').split('').slice(0, length);

  React.useEffect(() => {
    if (autoFocus && refs.current[0]) refs.current[0].focus();
  }, []);

  const handleChange = (idx, c) => {
    const ch = (c || '').replace(/\D/g, '').slice(-1);
    const next = chars.slice();
    next[idx] = ch || ' ';
    const v = next.join('').trimEnd();
    onChange && onChange(v);
    if (ch && idx < length - 1) refs.current[idx + 1]?.focus();
  };

  const handleKey = (idx, e) => {
    if (e.key === 'Backspace' && !chars[idx].trim() && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
      {Array.from({ length }).map((_, i) => {
        const ch = chars[i].trim();
        return (
          <input
            key={i}
            ref={el => refs.current[i] = el}
            value={ch}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKey(i, e)}
            maxLength={1}
            inputMode="numeric"
            style={{
              width: 52, height: 60,
              borderRadius: 12,
              border: `1.5px solid ${ch ? '#4A5CF5' : '#E5E7EB'}`,
              background: ch ? '#FFFFFF' : '#FAFBFC',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700, fontSize: 24,
              color: '#1E1E1E',
              textAlign: 'center',
              outline: 'none',
              transition: 'all .15s ease',
              boxShadow: ch ? '0 0 0 3px rgba(74,92,245,0.12)' : 'none',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = '#4A5CF5'; e.currentTarget.style.background = 'white'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74,92,245,0.18)'; }}
            onBlur={e => { if (!e.currentTarget.value) { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = '#FAFBFC'; e.currentTarget.style.boxShadow = 'none'; } }}
          />
        );
      })}
    </div>
  );
};
window.OtpInput = OtpInput;
