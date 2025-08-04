import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>

      {!location.pathname.includes('editor') && <Footer />}
    </div>
  );
}
