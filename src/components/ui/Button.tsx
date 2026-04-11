import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'destructive' | 'outline';
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({ variant = 'primary', fullWidth = false, children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'flex justify-center items-center py-3 px-4 border rounded-xl shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  
  const variants = {
    primary: 'border-transparent text-white bg-rocket hover:bg-rocket/90 focus:ring-rocket',
    success: 'border-transparent text-white bg-yoda hover:bg-yoda/90 focus:ring-yoda',
    destructive: 'border-transparent text-white bg-maul hover:bg-maul/90 focus:ring-maul',
    outline: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-rocket',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
