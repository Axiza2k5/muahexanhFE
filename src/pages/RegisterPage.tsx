import { Link } from 'react-router-dom';
import { User, Mail, Phone } from 'lucide-react';
import AuthLayout from '@/layouts/AuthLayout';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import registerImage from '@/assets/register.jpg';

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join us by filling out the details below."
      imageSide="left"
      imageContent={{
        imageUrl: registerImage
      }}
    >
      <form className="space-y-5 mt-8 text-left">
        <Input
          id="fullName"
          type="text"
          label="Full Name"
          placeholder="Nguyen Van A"
          icon={<User className="h-5 w-5 text-gray-400" />}
          required
        />

        <Input
          id="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          autoComplete="email"
          icon={<Mail className="h-5 w-5 text-gray-400" />}
          required
        />
        
        <Input
          id="phone"
          type="tel"
          label="Phone Number"
          placeholder="090 123 4567"
          icon={<Phone className="h-5 w-5 text-gray-400" />}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <PasswordInput
            id="password"
            label="Password"
            placeholder="••••••••"
            required
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            required
          />
        </div>
        
        <Select id="role" label="I am a...">
          <option value="student">Student Volunteer</option>
          <option value="leader">Project Leader</option>
        </Select>

        <div className="pt-2">
          <Button type="submit" variant="primary" fullWidth>
            Sign up
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
