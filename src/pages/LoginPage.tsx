import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';
import loginImage from '@/assets/login.jpg';

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Please sign in to your Mua He Xanh account."
      imageSide="right"
      showBackButton={false}
      imageContent={{
        imageUrl: loginImage
      }}
    >
      <form className="space-y-6 mt-8 text-left">
        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          autoComplete="email"
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          required
        />

        <PasswordInput
          id="password"
          placeholder="••••••••"
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-rocket focus:ring-rocket cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-rocket hover:text-rocket/80">
              Forgot password?
            </a>
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth>
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-8">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-rocket hover:text-rocket/80 transition-colors">
          Sign up now
        </Link>
      </p>
    </AuthLayout>
  );
}
