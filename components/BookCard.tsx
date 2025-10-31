import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
      <img src={book.coverUrl} alt={`Cover of ${book.title}`} className="w-full h-64 object-cover"/>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-4">by {book.author}</p>
        <p className="text-gray-700 text-sm flex-grow mb-4 leading-relaxed">{book.description}</p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <p className="text-xl font-bold text-sky-600">${book.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(book)}
            className="px-6 py-2 bg-sky-600 text-white font-semibold rounded-full hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};