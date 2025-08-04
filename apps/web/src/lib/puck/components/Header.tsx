import React from 'react';

export const Header: React.FC<{ editMode?: boolean }> = () => (
  <header
    className="styles_Header-inner__G31_O w-full flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white"
    style={{ minHeight: 64 }}
  >
    <div className="styles_Header-logo__Jc_g3 text-xl font-bold tracking-wide">
      LOGO
    </div>
    <nav className="styles_Header-items__bcoWI flex gap-8">
      <a
        href="/"
        style={{
          textDecoration: 'none',
          color: 'var(--puck-color-grey-02)',
          fontWeight: 600,
        }}
      >
        Home
      </a>
      <a
        href="/"
        style={{
          textDecoration: 'none',
          color: 'var(--puck-color-grey-02)',
          fontWeight: 600,
        }}
      >
        Pricing
      </a>
      <a
        href="/"
        style={{
          textDecoration: 'none',
          color: 'var(--puck-color-grey-02)',
          fontWeight: 600,
        }}
      >
        About
      </a>
    </nav>
  </header>
);
