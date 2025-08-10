import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSuccess = () => {
    navigate(from, { replace: true });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#faf6f1]">
      {/* Background pattern matching HeroSection */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-amber-800/10 opacity-60 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:opacity-40"
      >
        <defs>
          <pattern
            id="login-pattern"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-amber-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#login-pattern)"
        />
      </svg>

      {/* Warm gradient blur matching landing page */}
      <div
        aria-hidden="true"
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      >
        <div
          className="aspect-[1108/632] h-96 w-[69.25rem] bg-gradient-to-r from-[#deac80] to-[#b5c18e] opacity-30 dark:opacity-15"
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
                <h6 className="text-2xl font-bold tracking-wide text-amber-800" style={{ fontFamily: "'Amatic SC', cursive" }}>Welcome back,</h6>
                <h1 className="text-6xl font-bold tracking-tight text-amber-900 sm:text-7xl drop-shadow-sm" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Sign In
                </h1>
              </div>
              <p className="mt-6 text-xl leading-8 text-amber-800" style={{ fontFamily: "'Amatic SC', cursive" }}>
                Access your timeline and continue documenting your journey.
              </p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm ring-1 ring-amber-800/10">
              <LoginForm onSuccess={handleSuccess} />
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-lg text-amber-700" style={{ fontFamily: "'Amatic SC', cursive" }}>
                Don't have an account yet?{' '}
                <Link 
                  to="/register" 
                  state={{ from }}
                  className="font-medium text-amber-800 underline-offset-4 hover:underline"
                  style={{ fontFamily: "'Amatic SC', cursive" }}
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>

          {/* Right side - Cozy illustration placeholder */}
          <div className="hidden lg:block w-96 h-96 bg-gradient-to-br from-amber-100/80 to-amber-200/60 rounded-2xl border border-amber-200/50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">🌅</div>
              <p className="text-amber-800 text-xl font-medium" style={{ fontFamily: "'Amatic SC', cursive" }}>
                Welcome back to<br />your story
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
