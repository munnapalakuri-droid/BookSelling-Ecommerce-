import React from 'react';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (bookId: number) => void;
  onUpdateQuantity: (bookId: number, quantity: number) => void;
  onCheckout: () => void;
}

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity, onCheckout }) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((total, item) => total + item.book.price * item.quantity, 0);

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center transition-opacity duration-300" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4 max-h-[90vh] flex flex-col transform transition-transform duration-300 scale-95" 
        style={isOpen ? { transform: 'scale(1)', opacity: 1 } : {}}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b">
          <h2 id="cart-title" className="text-2xl font-bold text-gray-800">Your Cart</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Close cart">
            <CloseIcon />
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="p-6 overflow-y-auto">
              <ul className="space-y-4">
                {cartItems.map(({ book, quantity }) => (
                  <li key={book.id} className="flex items-center gap-4">
                    <img src={book.coverUrl} alt={book.title} className="w-20 h-28 object-cover rounded-md flex-shrink-0 shadow-sm" />
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-800">{book.title}</h3>
                      <p className="text-sm text-gray-500">by {book.author}</p>
                      <div className="flex items-center mt-2">
                        <button 
                            onClick={() => onUpdateQuantity(book.id, quantity - 1)} 
                            disabled={quantity === 1}
                            className="px-2 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label={`Decrease quantity of ${book.title}`}
                        >
                          -
                        </button>
                        <span className="px-3 font-medium" aria-live="polite">{quantity}</span>
                        <button 
                            onClick={() => onUpdateQuantity(book.id, quantity + 1)} 
                            className="px-2 py-1 border rounded-md"
                            aria-label={`Increase quantity of ${book.title}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="font-semibold text-gray-800">${(book.price * quantity).toFixed(2)}</p>
                      <button 
                        onClick={() => onRemoveItem(book.id)} 
                        className="text-red-500 hover:text-red-700 mt-2 transition-colors"
                        aria-label={`Remove ${book.title} from cart`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-6 border-t mt-auto bg-gray-50 rounded-b-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-medium text-gray-600">Subtotal</span>
                <span className="text-2xl font-bold text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={onCheckout}
                className="w-full py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
