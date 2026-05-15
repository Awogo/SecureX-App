// Button.jsx
const buttonStyles = {
  base: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: 14,
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    padding: '12px 22px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    transition: 'transform .15s ease, box-shadow .15s ease, background .15s ease, color .15s ease',
    whiteSpace: 'nowrap',
    lineHeight: 1,
  },
  primary: {
    background: 'linear-gradient(135deg,#4A5CF5 0%,#2C36A2 100%)',
    color: 'white',
    boxShadow: '0 8px 22px rgba(74,92,245,0.28)',
  },
  mint:    { background: '#00D9A3', color: 'white' },
  dark:    { background: '#1A1F3F', color: 'white' },
  ghost:   { background: 'transparent', color: '#1E1E1E', border: '1.5px solid #E5E7EB' },
  link:    { background: 'transparent', color: '#4A5CF5', padding: '6px 0' },
  danger:  { background: 'transparent', color: '#EF4444', border: '1px solid #FCA5A5' },
  sm: { padding: '8px 14px', fontSize: 13, borderRadius: 8 },
  lg: { padding: '14px 28px', fontSize: 15 },
  block: { width: '100%' },
};

const Button = ({ kind = 'primary', size, block, leading, trailing, children, style: extra, ...rest }) => {
  const style = {
    ...buttonStyles.base,
    ...buttonStyles[kind],
    ...(size === 'sm' ? buttonStyles.sm : {}),
    ...(size === 'lg' ? buttonStyles.lg : {}),
    ...(block ? buttonStyles.block : {}),
    ...(extra || {}),
  };
  return (
    <button
      style={style}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {leading}{children}{trailing}
    </button>
  );
};

window.Button = Button;
