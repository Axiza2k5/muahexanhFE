import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  error?: string;
}

export function Input({ label, icon, error, id, className = '', ...props }: InputProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-darkside ml-1" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={`block w-full ${icon ? 'pl-10' : 'pl-4'} pr-3 py-3 border ${
            error ? 'border-maul focus:ring-maul' : 'border-gray-300 focus:ring-rocket focus:border-rocket'
          } rounded-xl focus:ring-2 outline-none transition-shadow ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-maul ml-1">{error}</p>}
      </div>
    </div>
  );
}
