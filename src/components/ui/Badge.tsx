import React from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'outline';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-[4px] text-sm font-medium transition-colors';
  
  const variants = {
    default: 'bg-indigo-100 text-rocket',
    success: 'bg-green-100 text-yoda',
    warning: 'bg-yellow-100 text-chewie',
    error: 'bg-red-100 text-maul',
    outline: 'border border-gray-200 text-gray-800'
  };

  return (
    <span 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
