import React from 'react';

export const Footer: React.FC<{ children?: React.ReactNode }> & {
  List: React.FC<{ title: string; children?: React.ReactNode }>;
  Link: React.FC<{ href: string; children: React.ReactNode }>;
} = ({ children }) => (
  <footer className="w-full px-8 py-8 border-t border-gray-200 bg-white text-center text-sm text-gray-500 flex flex-wrap justify-center gap-8">
    {children}
  </footer>
);

Footer.List = ({ title, children }) => (
  <div className="min-w-[120px]">
    <div className="font-semibold mb-2 text-gray-700">{title}</div>
    <div className="flex flex-col gap-1 items-start">{children}</div>
  </div>
);

Footer.Link = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-500 hover:text-blue-600 transition"
    style={{ textDecoration: 'none', fontWeight: 500 }}
  >
    {children}
  </a>
);
