import type { Product, User, Conversation, Message } from '../types';

export const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  location: 'New York, NY',
  profilePicture: 'https://picsum.photos/seed/user1/200/200',
  joinedDate: '2023-01-15',
  isOnline: true,
};

const mockSeller: User = {
  id: 'user-2',
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: '098-765-4321',
  location: 'Los Angeles, CA',
  profilePicture: 'https://picsum.photos/seed/user2/200/200',
  joinedDate: '2022-11-20',
  isOnline: false,
};

const otherUsers: User[] = Array.from({ length: 5 }, (_, i) => ({
    id: `user-${i + 3}`,
    name: `User ${i + 3}`,
    email: `user${i+3}@example.com`,
    phone: '555-555-5555',
    location: 'Chicago, IL',
    profilePicture: `https://picsum.photos/seed/otheruser${i}/200/200`,
    joinedDate: '2023-05-10',
    isOnline: i % 2 === 0,
}))

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Vintage Leather Sofa',
    description: 'A beautiful vintage leather sofa, in great condition. Perfect for any living room. Minor wear and tear consistent with age.',
    price: 450,
    category: 'Furniture',
    images: ['https://picsum.photos/seed/sofa/600/400', 'https://picsum.photos/seed/sofa2/600/400'],
    location: 'Brooklyn, NY',
    seller: mockSeller,
    postedDate: '2024-07-20T10:00:00Z',
    isSold: false,
  },
  {
    id: 'prod-2',
    title: '2021 MacBook Pro 16"',
    description: 'M1 Pro chip, 16GB RAM, 512GB SSD. In excellent condition with original box and charger. Barely used.',
    price: 1800,
    category: 'Electronics',
    images: ['https://picsum.photos/seed/macbook/600/400'],
    location: 'Manhattan, NY',
    seller: mockUser,
    postedDate: '2024-07-18T14:30:00Z',
    isSold: false,
  },
   {
    id: 'prod-3',
    title: 'Mountain Bike - Full Suspension',
    description: 'Great for trails, recently serviced. Medium frame size. Selling because I upgraded to a new one.',
    price: 750,
    category: 'Books & Sports',
    images: ['https://picsum.photos/seed/bike/600/400'],
    location: 'Queens, NY',
    seller: mockSeller,
    postedDate: '2024-07-15T09:00:00Z',
    isSold: true,
  },
   {
    id: 'prod-4',
    title: 'Ford F-150 2019',
    description: 'Well-maintained truck with 50,000 miles. Clean title. All-wheel drive, towing package included.',
    price: 25000,
    category: 'Vehicles',
    images: ['https://picsum.photos/seed/truck/600/400'],
    location: 'San Francisco, CA',
    seller: mockSeller,
    postedDate: '2024-07-21T11:00:00Z',
    isSold: false,
  },
  // Add more products
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `prod-${i + 5}`,
    title: `Generic Product ${i + 5}`,
    description: 'This is a description for a generic product. It is a quality item.',
    price: Math.floor(Math.random() * 500) + 20,
    category: ['Electronics', 'Fashion', 'Furniture', 'Books & Sports'][i % 4],
    images: [`https://picsum.photos/seed/prod${i+5}/600/400`],
    location: ['Los Angeles, CA', 'Chicago, IL', 'Houston, TX'][i % 3],
    seller: i % 3 === 0 ? mockUser : mockSeller,
    postedDate: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    isSold: i % 5 === 0,
  }))
];

const mockMessages: Message[] = [
    { id: 'msg-1', senderId: 'user-1', receiverId: 'user-2', text: 'Hi, is this still available?', timestamp: new Date(Date.now() - 5 * 60000).toISOString()},
    { id: 'msg-2', senderId: 'user-2', receiverId: 'user-1', text: 'Yes, it is!', timestamp: new Date(Date.now() - 4 * 60000).toISOString()},
    { id: 'msg-3', senderId: 'user-1', receiverId: 'user-2', text: 'Great, can I pick it up tomorrow?', timestamp: new Date(Date.now() - 3 * 60000).toISOString()},
];

export const mockConversations: Conversation[] = [
    {
        id: 'conv-1',
        productId: 'prod-1',
        productTitle: 'Vintage Leather Sofa',
        productImage: 'https://picsum.photos/seed/sofa/600/400',
        participants: [mockUser, mockSeller],
        messages: mockMessages,
    },
    {
        id: 'conv-2',
        productId: 'prod-4',
        productTitle: 'Ford F-150 2019',
        productImage: 'https://picsum.photos/seed/truck/600/400',
        participants: [mockUser, otherUsers[0]],
        messages: [{id: 'msg-4', senderId: 'user-3', receiverId: 'user-1', text: 'What is the mileage?', timestamp: new Date(Date.now() - 10 * 60000).toISOString()}]
    }
];


// MOCK API FUNCTIONS
export const fetchProducts = (): Promise<Product[]> => {
  return new Promise(resolve => setTimeout(() => resolve(mockProducts), 500));
};

export const fetchProductById = (id: string): Promise<Product | undefined> => {
  return new Promise(resolve => setTimeout(() => resolve(mockProducts.find(p => p.id === id)), 500));
};

export const fetchConversations = (userId: string): Promise<Conversation[]> => {
    return new Promise(resolve => setTimeout(() => resolve(mockConversations.filter(c => c.participants.some(p => p.id === userId))), 500));
}

export const postMessage = (conversationId: string, message: Omit<Message, 'id' | 'timestamp'>): Promise<Message> => {
    return new Promise(resolve => setTimeout(() => {
        const newMessage = { ...message, id: `msg-${Date.now()}`, timestamp: new Date().toISOString() };
        const convo = mockConversations.find(c => c.id === conversationId);
        if (convo) {
            convo.messages.push(newMessage);
        }
        resolve(newMessage);
    }, 200));
}

export const updateProductStatus = (productId: string, isSold: boolean): Promise<Product | undefined> => {
    return new Promise(resolve => setTimeout(() => {
        const productIndex = mockProducts.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            mockProducts[productIndex].isSold = isSold;
            resolve(mockProducts[productIndex]);
        } else {
            resolve(undefined);
        }
    }, 300));
}