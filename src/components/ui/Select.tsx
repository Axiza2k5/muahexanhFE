import { SelectHTMLAttributes, ReactNode } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export function Select({ label, error, id, children, className = '', ...props }: SelectProps) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-darkside ml-1" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`block w-full px-3 py-3 border ${
            error ? 'border-maul focus:ring-maul' : 'border-gray-300 focus:ring-rocket focus:border-rocket'
          } rounded-xl focus:ring-2 outline-none transition-shadow bg-white text-gray-700 ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
          {...props}
        >
          {children}
        </select>
        {error && <p className="mt-1 text-sm text-maul ml-1">{error}</p>}
      </div>
    </div>
  );
}
