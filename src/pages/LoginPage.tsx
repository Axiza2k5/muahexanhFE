import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';
import loginImage from '@/assets/login.jpg';
import { authApi } from '@/api/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authApi.login({ username, password });
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('role', data.role);
        toast.success('Successfully logged in!');
        navigate('/projects');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to login. Please check your credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
      <form className="space-y-6 mt-8 text-left" onSubmit={handleSubmit}>
        {error && <p className="text-sm font-medium text-maul mb-4">{error}</p>}
        <Input
          id="username"
          type="text"
          label="Username"
          placeholder="your_username"
          autoComplete="username"
          icon={<User className="h-5 w-5 text-gray-400" />}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <PasswordInput
          id="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
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
