import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  leading,
  trailing,
  className = '',
  ...props
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    mint: 'btn-mint',
    dark: 'btn-dark',
    ghost: 'btn-ghost',
    link: 'btn-link',
    danger: 'btn-danger'
  };
  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    block ? 'btn-block' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled}
      {...props}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}
    >
      {leading && <span>{leading}</span>}
      {children}
      {trailing && <span>{trailing}</span>}
    </button>
  );
};

export default Button;