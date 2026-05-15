import React from 'react';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  leading,
  trailing,
  className = '',
  ...props
}) => {
  const baseClasses = 'input';
  const classes = [
    baseClasses,
    error ? 'border-danger-400 focus:shadow-focus-danger' : '',
    disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {leading && (
        <div style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--ink-400)',
          display: 'flex',
          alignItems: 'center'
        }}>
          {leading}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={classes}
        style={{
          paddingLeft: leading ? '40px' : undefined,
          paddingRight: trailing ? '40px' : undefined
        }}
        {...props}
      />
      {trailing && (
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--ink-400)',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}>
          {trailing}
        </div>
      )}
      {error && (
        <p style={{
          marginTop: '4px',
          fontSize: '12px',
          color: 'var(--danger-500)'
        }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;