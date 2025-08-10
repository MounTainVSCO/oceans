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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-5">
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg border border-amber-200 bg-white/80 px-4 py-4 text-base font-medium text-amber-900 ring-offset-background transition-colors placeholder:text-amber-600/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-amber-200 bg-white/80 px-4 py-4 text-base font-medium text-amber-900 ring-offset-background transition-colors placeholder:text-amber-600/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.password.message}</p>
          )}
        </div>
      </div>
      
      {errors.root && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-base text-red-700 font-medium">{errors.root.message}</p>
        </div>
      )}
      
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="inline-flex scale-100 items-center justify-center rounded-lg text-xl font-light ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-amber-800 text-white hover:bg-amber-900 h-14 px-10 shadow-lg w-full"
        style={{ fontFamily: "'Amatic SC', cursive" }}
      >
        {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
      </button>
      
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            id="rememberMe"
            className="rounded border-amber-300 text-amber-600 focus:ring-amber-500 focus:ring-offset-0 w-4 h-4"
          />
          <span className="text-amber-700 font-medium">Remember me</span>
        </label>
        <a 
          href="/reset-password"
          className="text-amber-800 underline-offset-4 hover:underline font-medium"
        >
          Forgot password?
        </a>
      </div>
    </form>
  );
};
