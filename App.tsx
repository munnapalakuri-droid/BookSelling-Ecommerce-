import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Book, CartItem } from './types';
import { getBooks } from './services/bookService';
import { Header } from './components/Header';
import { BookList } from './components/BookList';
import { Footer } from './components/Footer';
import { FilterControls } from './components/FilterControls';
import { Hero } from './components/Hero';
import { CartModal } from './components/CartModal';

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-600"></div>
    </div>
);

const App: React.FC = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getBooks();
        setAllBooks(books);
        setFilteredBooks(books);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const genres = useMemo(() => {
    const allGenres = allBooks.map(book => book.genre);
    return [...new Set(allGenres)].sort();
  }, [allBooks]);

  const authors = useMemo(() => {
    const allAuthors = allBooks.map(book => book.author);
    return [...new Set(allAuthors)].sort();
  }, [allBooks]);

  useEffect(() => {
    let books = allBooks;

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      books = books.filter(book =>
        book.title.toLowerCase().includes(lowercasedQuery)
      );
    }

    if (selectedGenre) {
      books = books.filter(book => book.genre === selectedGenre);
    }

    if (selectedAuthor) {
      books = books.filter(book => book.author === selectedAuthor);
    }

    setFilteredBooks(books);
  }, [searchQuery, selectedGenre, selectedAuthor, allBooks]);

  const handleAddToCart = useCallback((bookToAdd: Book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.book.id === bookToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.book.id === bookToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { book: bookToAdd, quantity: 1 }];
    });
  }, []);
  
  const handleRemoveFromCart = useCallback((bookId: number) => {
    setCart(prevCart => prevCart.filter(item => item.book.id !== bookId));
  }, []);

  const handleUpdateCartQuantity = useCallback((bookId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(bookId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.book.id === bookId ? { ...item, quantity } : item
        )
      );
    }
  }, [handleRemoveFromCart]);

  const handleCheckout = () => {
    alert('Thank you for your purchase! Your books are on their way. (This is a demo)');
    setCart([]);
    setIsCartOpen(false);
  };
  
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('');
    setSelectedAuthor('');
  };

  return (
    <div className="bg-stone-50 min-h-screen flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Hero />
        <FilterControls
          genres={genres}
          authors={authors}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          selectedAuthor={selectedAuthor}
          onAuthorChange={setSelectedAuthor}
          onResetFilters={handleResetFilters}
        />

        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center pt-8 border-t border-gray-200">
            {searchQuery || selectedGenre || selectedAuthor ? 'Search Results' : 'Featured Books'}
        </h2>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <BookList books={filteredBooks} onAddToCart={handleAddToCart} />
        )}
      </main>
      
      <Footer />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;
