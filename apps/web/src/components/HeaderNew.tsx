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
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium tracking-wide"
                >
                  Sign In
                </Link>
                <Button 
                  size="sm" 
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium tracking-wide" 
                  asChild
                >
                  <Link to="/register">Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
};
