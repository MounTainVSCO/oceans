import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';

export const Header: React.FC = () => {
  const { isAuthenticated } = useAuthContext();

  return (
    <header className="bg-white border-b border-gray-200">
      <Container>
        <div className="flex justify-between items-center py-4">
          <Logo />
          <nav className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium tracking-wide"
                >
                  Timeline
                </Link>
                <Button
                  size="sm"
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide"
                  asChild
                >
                  <Link to="/dashboard">Add Milestone</Link>
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-xl bg-[#d57a66] text-white font-semibold px-6 py-3 shadow-sm hover:bg-[#c76b58] hover:shadow-md transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-[#f5e6d3] text-[#5b4636] font-semibold px-6 py-3 shadow-sm hover:bg-[#f0dcc3] transition-colors duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
};
