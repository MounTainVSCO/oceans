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
      <div className="space-y-5">
        <div>
          <input
            {...register('name')}
            type="text"
            placeholder="Full name"
            className="w-full rounded-lg border border-amber-200 bg-white/80 px-4 py-4 text-base font-medium text-amber-900 ring-offset-background transition-colors placeholder:text-amber-600/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>
          )}
        </div>
        
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
        
        <div>
          <input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm password"
            className="w-full rounded-lg border border-amber-200 bg-white/80 px-4 py-4 text-base font-medium text-amber-900 ring-offset-background transition-colors placeholder:text-amber-600/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600 font-medium">{errors.confirmPassword.message}</p>
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
        disabled={registerMutation.isPending}
        className="inline-flex scale-100 items-center justify-center rounded-lg text-xl font-light ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-amber-800 text-white hover:bg-amber-900 h-14 px-10 shadow-lg w-full"
        style={{ fontFamily: "'Amatic SC', cursive" }}
      >
        {registerMutation.isPending ? 'Creating account...' : 'Create Account'}
      </button>
      
      <div className="text-center">
        <label className="flex items-start space-x-3 cursor-pointer text-sm">
          <input
            type="checkbox"
            id="agreeToTerms"
            className="mt-1 rounded border-amber-300 text-amber-600 focus:ring-amber-500 focus:ring-offset-0 w-4 h-4"
          />
          <span className="text-amber-700 font-medium">
            I agree to the{' '}
            <a href="/terms" className="text-amber-800 underline-offset-4 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-amber-800 underline-offset-4 hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>
      </div>
    </form>
  );
};
