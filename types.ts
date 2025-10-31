export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  price: number;
  coverUrl: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}
