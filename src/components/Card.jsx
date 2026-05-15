import React from 'react';

const Card = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  ...props
}) => {
  const baseClasses = 'card';
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg'
  };

  const classes = [
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    className
  ].filter(Boolean).join(' ');

  const paddingValue = {
    sm: 'var(--space-4)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)'
  }[padding];

  return (
    <div 
      className={classes}
      style={{ padding: paddingValue }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;