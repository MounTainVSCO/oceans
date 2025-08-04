import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background pattern similar to HeroSection */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-foreground/10 opacity-60 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:opacity-40"
      >
        <defs>
          <pattern
            id="register-pattern"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-border/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#register-pattern)"
        />
      </svg>

      {/* Subtle gradient blur */}
      <div
        aria-hidden="true"
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      >
        <div
          className="aspect-[1108/632] h-96 w-[69.25rem] bg-gradient-to-r from-gray-400 to-gray-600 opacity-20 dark:opacity-10"
          style={{
            clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl w-full px-6">
        <div className="flex items-center justify-center gap-12 lg:gap-16">
          {/* Left side - Form */}
          <div className="w-full max-w-md">
            <div className="text-center mb-12">
              <div className="space-y-2">
                <h6 className="text-base font-bold tracking-wide text-foreground/60">Join us,</h6>
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  Create Account
                </h1>
              </div>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Start tracking your life and building your professional presence.
              </p>
            </div>
            
            <RegisterForm onSuccess={handleSuccess} />
            
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  state={{ from }}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>

          {/* Right side - Rectangle */}
          <div className="hidden lg:block w-96 h-96 bg-gradient-to-br from-border/20 to-border/10 rounded-lg border border-border/20"></div>
        </div>
      </div>
    </section>
  );
};
