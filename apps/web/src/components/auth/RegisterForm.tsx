import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '../../hooks/useAuth';
import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth';

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const registerMutation = useRegister();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      onSuccess?.();
    } catch (error: any) {
      // Handle specific error cases
      if (error?.status === 409) {
        setError('email', {
          message: 'An account with this email already exists',
        });
      } else if (error?.status === 400) {
        setError('root', { message: error.message || 'Invalid input' });
      } else {
        setError('root', { message: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            {...register('name')}
            placeholder="Enter your full name"
            error={errors.name?.message}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Enter your email"
            error={errors.email?.message}
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Create a password"
            error={errors.password?.message}
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
          />
        </div>

        {errors.root && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{errors.root.message}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full"
        >
          {registerMutation.isPending
            ? 'Creating account...'
            : 'Create Account'}
        </Button>

        {onSwitchToLogin && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
