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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <input
            {...register('name')}
            type="text"
            placeholder="Full name"
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
        
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
        
        <div>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm password"
            className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-destructive">{errors.confirmPassword.message}</p>
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
        disabled={registerMutation.isPending}
        className="inline-flex scale-100 items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-800 h-10 px-6 w-full"
      >
        {registerMutation.isPending ? 'Creating account...' : 'Create Account'}
      </button>
      
      <div className="text-center">
        <label className="flex items-start space-x-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            id="agreeToTerms"
            className="mt-0.5 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
          />
          <span className="text-muted-foreground">
            I agree to the{' '}
            <a href="/terms" className="text-primary underline-offset-4 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-primary underline-offset-4 hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>
      </div>
    </form>
  );
};
