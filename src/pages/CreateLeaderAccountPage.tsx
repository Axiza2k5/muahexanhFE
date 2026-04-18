import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function CreateLeaderAccountPage() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
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
      const msg = 'Passwords do not match';
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('accessToken'); // 👈 lấy token

      const res = await fetch('/api/v1/auth/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 👈 thêm vào đây
        },
        body: JSON.stringify({
          username: formData.username,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: 'COMMUNITY_LEADER',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Create failed');
      }

      toast.success('Leader account created!');
      navigate('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Create Leader Account
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Admin creates a new leader account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Input
            id="username"
            label="Username"
            placeholder="leader_username"
            icon={<User className="h-5 w-5 text-gray-400" />}
            value={formData.username}
            onChange={handleChange}
            required
          />

          <Input
            id="fullName"
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
            label="Email"
            placeholder="you@example.com"
            icon={<Mail className="h-5 w-5 text-gray-400" />}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <PasswordInput
            id="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </Button>
        </form>
      </div>
    </div>
  );
}