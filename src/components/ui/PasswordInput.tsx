import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { InputProps } from './Input';

export function PasswordInput({ label = 'Password', id = 'password', error, className, ...props }: Omit<InputProps, 'type' | 'icon'>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-darkside ml-1" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`block w-full pl-10 pr-10 py-3 border ${
            error ? 'border-maul focus:ring-maul' : 'border-gray-300 focus:ring-rocket focus:border-rocket'
          } rounded-xl focus:ring-2 outline-none transition-shadow`}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-maul ml-1">{error}</p>}
    </div>
  );
}
