import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSuccess = () => {
    navigate(from, { replace: true });
  };

  const handleSwitchToLogin = () => {
    navigate('/login', { state: { from } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start building your professional presence with oceans
          </p>
        </div>

        <RegisterForm
          onSuccess={handleSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </div>
    </div>
  );
};
