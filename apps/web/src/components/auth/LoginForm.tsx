import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../hooks/useAuth';
import { Button } from '../Button';
import { Input } from '../Input';
import { Label } from '../Label';
import { loginSchema, type LoginFormData } from '@/lib/validations/auth';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginMutation = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      onSuccess?.();
    } catch (error: any) {
      // Handle specific error cases
      if (error?.status === 401) {
        setError('root', { message: 'Invalid email or password' });
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
            placeholder="Enter your password"
            error={errors.password?.message}
          />
        </div>

        {errors.root && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{errors.root.message}</p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full"
        >
          {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
        </Button>

        {onSwitchToRegister && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
