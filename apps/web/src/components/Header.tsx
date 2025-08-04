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
                  className="inline-flex scale-100 items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-800 h-10 px-6"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex scale-100 items-center justify-center rounded-sm text-sm font-medium ring-offset-background transition-[transform,background-color] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-gray-800 h-10 px-6"
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
