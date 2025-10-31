import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12 border-t">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Book Nook. All rights reserved.</p>
        <p className="text-sm mt-1">A delightful creation for book lovers.</p>
      </div>
    </footer>
  );
};
