import React from 'react';

export default function Button({ href, variant = 'primary', size, children }) {
  const className = [
    'btn',
    variant === 'primary' && 'btn--primary',
    variant === 'outline' && 'btn--outline',
    variant === 'outline-light' && 'btn--outline-light',
    size === 'sm' && 'btn--sm',
  ].filter(Boolean).join(' ');

  if (href) {
    return <a href={href} className={className}>{children}</a>;
  }
  return <button className={className}>{children}</button>;
}
