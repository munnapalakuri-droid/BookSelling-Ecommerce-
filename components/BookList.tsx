import React from 'react';
import { Book } from '../types';
import { BookCard } from './BookCard';

interface BookListProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
}

export const BookList: React.FC<BookListProps> = ({ books, onAddToCart }) => {
  if (books.length === 0) {
    return (
        <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700">No books found.</h2>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};