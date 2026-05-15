// Input.jsx
const Input = ({ label, icon, type = 'text', value, onChange, placeholder, trailing, hint, ...rest }) => {
  const [focus, setFocus] = React.useState(false);
  const wrapStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    background: focus ? 'white' : '#FAFBFC',
    border: `1.5px solid ${focus ? '#4A5CF5' : '#E5E7EB'}`,
    borderRadius: 10,
    transition: 'all .15s ease',
    boxShadow: focus ? '0 0 0 3px rgba(74,92,245,0.18)' : 'none',
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 600, color: '#1E1E1E' }}>{label}</label>
      )}
      <div style={wrapStyle}>
        {icon && (
          <span style={{ position: 'absolute', left: 14, display: 'flex', pointerEvents: 'none', color: focus ? '#4A5CF5' : '#9CA3AF' }}>
            <Icon name={icon} size={16} strokeWidth={1.7} />
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: '100%',
            padding: `13px 14px 13px ${icon ? 42 : 14}px`,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'inherit',
            fontSize: 14,
            color: '#1E1E1E',
          }}
          {...rest}
        />
        {trailing && <span style={{ position: 'absolute', right: 14, display: 'flex' }}>{trailing}</span>}
      </div>
      {hint && <div style={{ fontSize: 12, color: '#7A7A7A' }}>{hint}</div>}
    </div>
  );
};
window.Input = Input;
