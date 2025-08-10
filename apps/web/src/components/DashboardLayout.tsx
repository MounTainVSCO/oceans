import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import BearAnim from '@/components/home/anim/bear';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuthContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
    setShowUserMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#faf6f1] relative overflow-hidden">
      {/* Background decorative elements */}
      <div
        aria-hidden="true"
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
      >
        <div
          className="aspect-[1108/632] h-96 w-[69.25rem] bg-gradient-to-r from-[#deac80] to-[#b5c18e] opacity-20"
          style={{
            clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
          }}
        />
      </div>

      {/* Top Navigation Bar */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-[#5b4636]/10 shadow-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl flex items-center justify-center shadow-md ring-1 ring-[#5b4636]/10 overflow-hidden">
                <div className="scale-[0.15] -mt-2">
                  <BearAnim />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-amber-900" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Oceans
                </h1>
                <p className="text-sm text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                  Your life's journey
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2.5 text-lg font-medium text-amber-900 bg-amber-100/80 rounded-xl transition-all duration-200 hover:bg-amber-200/80 hover:-translate-y-0.5"
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                <svg className="w-5 h-5 mr-2 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Timeline
              </Link>
              
              <Link
                to="/dashboard/insights"
                className="flex items-center px-4 py-2.5 text-lg font-medium text-[#6b5748] hover:text-amber-900 hover:bg-amber-50 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                style={{ fontFamily: "'Amatic SC', cursive" }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Insights
              </Link>
            </nav>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-3 py-2 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#5b4636]/10 hover:bg-white transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#f5e6d3] to-[#deac80] rounded-xl flex items-center justify-center ring-1 ring-[#5b4636]/10">
                  <svg className="w-5 h-5 text-[#b86a50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-sm font-semibold text-[#4b3a2d]" style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.1rem' }}>
                    {user?.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="text-xs text-[#6b5748]" style={{ fontFamily: "'Amatic SC', cursive" }}>
                    Account
                  </div>
                </div>
                <svg 
                  className={`w-4 h-4 text-[#6b5748] transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm border border-[#5b4636]/10 rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-[#5b4636]/10">
                    <p className="text-sm font-semibold text-[#4b3a2d]" style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.1rem' }}>
                      Signed in as
                    </p>
                    <p className="text-sm text-[#6b5748] truncate" style={{ fontFamily: "'Amatic SC', cursive" }}>
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-[#6b5748] hover:text-[#4b3a2d] hover:bg-amber-50 flex items-center transition-colors duration-200"
                    style={{ fontFamily: "'Amatic SC', cursive", fontSize: '1.1rem' }}
                  >
                    <svg className="w-5 h-5 mr-3 text-[#b86a50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1">
        {children}
      </main>
    </div>
  );
}
