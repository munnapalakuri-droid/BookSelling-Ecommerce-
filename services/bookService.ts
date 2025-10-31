import { Book } from '../types';

const mockBooks: Book[] = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    description: "A novel about the serious issues of rape and racial inequality, but it is also a story about the innocence of childhood and the importance of empathy.",
    price: 18.99,
    coverUrl: "https://picsum.photos/seed/mockingbird/400/600",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    description: "A dystopian social science fiction novel and cautionary tale about the dangers of totalitarianism, and the power of truth.",
    price: 15.99,
    coverUrl: "https://picsum.photos/seed/1984/400/600",
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    description: "A story about the American dream, the Jazz Age, and the destructive power of wealth and social class.",
    price: 14.50,
    coverUrl: "https://picsum.photos/seed/gatsby/400/600",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    description: "A romantic novel that charts the emotional development of the protagonist, Elizabeth Bennet, who learns the error of making hasty judgments.",
    price: 12.99,
    coverUrl: "https://picsum.photos/seed/pride/400/600",
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Classic Fiction",
    description: "A story about a teenager's angst and alienation. Holden Caulfield has become an icon for teenage rebellion.",
    price: 16.00,
    coverUrl: "https://picsum.photos/seed/rye/400/600",
  },
  {
    id: 6,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description: "A fantasy novel and children's book. The story is set in Middle-earth and follows the quest of home-loving Bilbo Baggins.",
    price: 22.50,
    coverUrl: "https://picsum.photos/seed/hobbit/400/600",
  },
   {
    id: 7,
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    description: "The saga of Captain Ahab and his obsessive quest to exact revenge on the giant white sperm whale, Moby Dick.",
    price: 19.99,
    coverUrl: "https://picsum.photos/seed/moby/400/600",
  },
  {
    id: 8,
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Historical Fiction",
    description: "A literary work mixed with chapters on history and philosophy, it chronicles the French invasion of Russia.",
    price: 25.00,
    coverUrl: "https://picsum.photos/seed/war/400/600",
  },
   {
    id: 9,
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    genre: "Satire",
    description: "A Spanish novel about a nobleman who reads so many chivalric romances that he loses his mind and decides to become a knight-errant.",
    price: 21.75,
    coverUrl: "https://picsum.photos/seed/quixote/400/600",
  },
];

export const getBooks = (): Promise<Book[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockBooks);
    }, 1000);
  });
};