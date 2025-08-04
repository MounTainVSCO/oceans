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
      <div className="space-y-4">
        <div>
          <input
            {...register('email')}
            type="email"
            placeholder="Email address"
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>
      </div>
      
      {errors.root && (
        <div className="rounded-sm border border-destructive/50 bg-destructive/10 p-3">
          <p className="text-sm text-destructive">{errors.root.message}</p>
        </div>
      )}
      
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="inline-flex scale-100 items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-800 h-10 px-6 w-full"
      >
        {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
      </button>
      
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            id="rememberMe"
            className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
          />
          <span className="text-muted-foreground">Remember me</span>
        </label>
        <a 
          href="/reset-password"
          className="text-primary underline-offset-4 hover:underline"
        >
          Forgot password?
        </a>
      </div>
    </form>
  );
};
