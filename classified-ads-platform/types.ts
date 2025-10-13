
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  profilePicture: string;
  joinedDate: string;
  isOnline: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  location: string;
  seller: User;
  postedDate: string;
  isSold: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  participants: [User, User];
  messages: Message[];
}

export interface Transaction {
    id: string;
    productId: string;
    buyerId: string;
    sellerId: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
}
