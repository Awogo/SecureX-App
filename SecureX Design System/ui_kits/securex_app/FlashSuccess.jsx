// FlashSuccess.jsx — the pulsing checkmark used on completion screens
const FlashSuccess = ({ size = 88 }) => (
  <>
    <style>{`
      @keyframes sxFlash {
        0%, 100% { opacity: 1; transform: scale(1); }
        50%      { opacity: 0.7; transform: scale(1.06); }
      }
      @keyframes sxRing {
        0%   { transform: scale(0.6); opacity: 0.6; }
        100% { transform: scale(1.6); opacity: 0; }
      }
    `}</style>
    <div style={{
      position: 'relative', width: size, height: size,
      animation: 'sxFlash 1.6s ease-in-out infinite',
    }}>
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: '#D1FAE5',
      }} />
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: '2px solid #00D9A3',
        animation: 'sxRing 1.6s ease-out infinite',
      }} />
      <div style={{
        position: 'absolute', inset: '14%', borderRadius: '50%',
        background: '#00D9A3',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="check" size={size * 0.42} stroke="white" strokeWidth={3} />
      </div>
    </div>
  </>
);
window.FlashSuccess = FlashSuccess;
