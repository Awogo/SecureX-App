// Tokens.jsx — shared icons + small helpers exposed on window for other JSX files

const Icon = ({ name, size = 20, stroke = 'currentColor', strokeWidth = 1.6, ...rest }) => {
  const paths = {
    shield: <>
      <path d="M12 3l8 3v5c0 5-3.5 9-8 11-4.5-2-8-6-8-11V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </>,
    lock: <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </>,
    eye: <>
      <circle cx="12" cy="12" r="3" />
      <path d="M2.5 12C4 7 7.8 4 12 4s8 3 9.5 8c-1.5 5-5.3 8-9.5 8s-8-3-9.5-8z" />
    </>,
    document: <>
      <path d="M14 2H7a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V7l-5-5z" />
      <path d="M14 2v5h5M9 13h6M9 17h6" />
    </>,
    card: <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
    </>,
    archive: <>
      <path d="M5 8h14l-1 11a2 2 0 01-2 2H8a2 2 0 01-2-2L5 8z" />
      <path d="M9 8V5a3 3 0 016 0v3" />
    </>,
    clock: <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>,
    user: <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </>,
    grid: <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>,
    list: <path d="M3 6h18M3 12h18M3 18h12" />,
    sparkle: <>
      <path d="M12 3l1.7 4.6L18 9l-4.3 1.4L12 15l-1.7-4.6L6 9l4.3-1.4L12 3z" />
      <path d="M19 15l.7 1.8L21 17l-1.3.5L19 19l-.7-1.5L17 17l1.3-.2L19 15z" />
    </>,
    settings: <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 00-.1-1.2l2-1.5-2-3.5-2.4.9a7 7 0 00-2-1.2L14 3h-4l-.5 2.5a7 7 0 00-2 1.2L5 5.8 3 9.3l2 1.5A7 7 0 005 12c0 .4 0 .8.1 1.2l-2 1.5 2 3.5 2.4-.9a7 7 0 002 1.2L10 21h4l.5-2.5a7 7 0 002-1.2l2.4.9 2-3.5-2-1.5c.1-.4.1-.8.1-1.2z" />
    </>,
    search: <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>,
    bell: <>
      <path d="M6 8a6 6 0 1112 0c0 7 3 7 3 9H3c0-2 3-2 3-9z" />
      <path d="M10 21h4" />
    </>,
    logout: <>
      <path d="M9 17l-5-5 5-5" />
      <path d="M4 12h12" />
      <path d="M14 4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4" />
    </>,
    plus: <path d="M12 5v14M5 12h14" />,
    arrowRight: <path d="M5 12h14M13 5l7 7-7 7" />,
    arrowDownRight: <>
      <path d="M7 7l10 10" /><path d="M17 7v10H7" />
    </>,
    arrowUpRight: <>
      <path d="M7 17L17 7" /><path d="M8 7h9v9" />
    </>,
    check: <path d="M5 12l4 4L19 7" />,
    chevronRight: <path d="M9 6l6 6-6 6" />,
    chevronDown: <path d="M6 9l6 6 6-6" />,
    mail: <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>,
    phone: <path d="M5 3h4l2 5-3 2a13 13 0 006 6l2-3 5 2v4a2 2 0 01-2 2A18 18 0 013 5a2 2 0 012-2z" />,
    flag: <>
      <path d="M5 21V4l9 2-1 4 7 1-2 5H5" />
    </>,
    bank: <>
      <path d="M3 10l9-6 9 6" />
      <path d="M5 10v8M9 10v8M15 10v8M19 10v8" />
      <path d="M3 21h18" />
    </>,
    info: <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v5h1" />
    </>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
         stroke={stroke} strokeWidth={strokeWidth}
         strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {paths[name]}
    </svg>
  );
};

const Currency = ({ value, currency = '₦', big }) => (
  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, letterSpacing: '-0.01em' }}>
    <span style={{ opacity: 0.7, marginRight: 2, fontSize: big ? 22 : 14 }}>{currency}</span>
    {value}
  </span>
);

const Avatar = ({ initials, color = '#4A5CF5', size = 36 }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%', background: color,
    color: 'white', fontWeight: 700, fontSize: size * 0.36,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  }}>{initials}</div>
);

// Brand shield used as a small mark
const ShieldMark = ({ size = 36 }) => (
  <div style={{
    width: size, height: size,
    background: 'linear-gradient(135deg,#2C36A2 0%,#4A5CF5 100%)',
    borderRadius: size * 0.28,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 6px 18px rgba(74,92,245,0.28)',
    flexShrink: 0,
  }}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 36 36" fill="none"
         stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24.7 21c0 5-2.9 7.5-6.4 9-3.5-1.5-6.4-4-6.4-9v-7a1 1 0 011-1c1.7 0 3.7-1.2 5.2-2.7a.95.95 0 011.3 0c1.5 1.5 3.6 2.7 5.3 2.7a1 1 0 011 1v7z" />
    </svg>
  </div>
);

Object.assign(window, { Icon, Currency, Avatar, ShieldMark });
