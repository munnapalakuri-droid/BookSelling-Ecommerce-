import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg p-8 md:p-12 mb-8 text-center shadow-sm">
      <h1 className="text-4xl md:text-5xl font-extrabold text-sky-900 mb-4">Welcome to Book Nook</h1>
      <p className="text-lg text-sky-800 max-w-3xl mx-auto">
        Your one-stop shop for the best books from around the world. Dive into new adventures, discover timeless classics, and feed your curiosity.
      </p>
    </div>
  );
};
