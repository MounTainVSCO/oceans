import React from 'react';

export const FooterBlock: React.FC = () => (
  <footer className="w-full px-8 py-4 border-t border-gray-200 bg-white text-center text-sm text-gray-500">
    © {new Date().getFullYear()} oceans.app. All rights reserved.
  </footer>
);
