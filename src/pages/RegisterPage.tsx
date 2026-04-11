import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Book } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';
import registerImage from '@/assets/register.jpg';
import { authApi } from '@/api/auth';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    abilitiesDescription: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      const errorMessage = 'Passwords do not match';
      setError(errorMessage);
      toast.error(errorMessage);
      return;
    }

    setLoading(true);

    try {
      await authApi.registerStudent({
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber
      });
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Registration failed.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join us by filling out the details below."
      imageSide="left"
      imageContent={{
        imageUrl: registerImage
      }}
    >
      <form className="space-y-5 mt-8 text-left" onSubmit={handleSubmit}>
        {error && <p className="text-sm font-medium text-maul mb-4">{error}</p>}
        
        <Input
          id="username"
          type="text"
          label="Username"
          placeholder="your_username"
          icon={<User className="h-5 w-5 text-gray-400" />}
          value={formData.username}
          onChange={handleChange}
          required
        />

        <Input
          id="fullName"
          type="text"
          label="Full Name"
          placeholder="Nguyen Van A"
          icon={<User className="h-5 w-5 text-gray-400" />}
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          autoComplete="email"
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <Input
          id="phoneNumber"
          type="tel"
          label="Phone Number"
          placeholder="090 123 4567"
          icon={<Phone className="h-5 w-5 text-gray-400" />}
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <PasswordInput
            id="password"
            label="Password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="pt-2">
          <Button type="submit" variant="primary" fullWidth disabled={loading}>
            {loading ? 'Signing up...' : 'Sign up'}
          </Button>
        </div>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-rocket hover:text-rocket/80 transition-colors">
          Sign in instead
        </Link>
      </p>
    </AuthLayout>
  );
}
