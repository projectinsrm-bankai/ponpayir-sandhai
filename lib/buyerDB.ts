// Database for Buyers/Users
export interface Buyer {
    id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    address?: string;
    createdAt: string;
    updatedAt: string;
}

// In-memory storage for demo purposes
let buyers: Buyer[] = [
    {
        id: '1',
        username: 'buyer1',
        email: 'buyer1@example.com',
        password: 'password123',
        fullName: 'John Buyer',
        phone: '+1234567890',
        address: '123 Main St, City',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        username: 'buyer2',
        email: 'buyer2@example.com',
        password: 'password123',
        fullName: 'Jane Buyer',
        phone: '+1234567891',
        address: '456 Oak Ave, City',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// Database functions
export const buyerDB = {
    // Find buyer by username or email
    findByUsernameOrEmail: (identifier: string): Buyer | null => {
        return buyers.find(
            buyer => buyer.username === identifier || buyer.email === identifier
        ) || null;
    },

    // Find buyer by ID
    findById: (id: string): Buyer | null => {
        return buyers.find(buyer => buyer.id === id) || null;
    },

    // Create new buyer
    create: (buyerData: Omit<Buyer, 'id' | 'createdAt' | 'updatedAt'>): Buyer => {
        const newBuyer: Buyer = {
            ...buyerData,
            id: (buyers.length + 1).toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        buyers.push(newBuyer);
        return newBuyer;
    },

    // Update buyer
    update: (id: string, updates: Partial<Omit<Buyer, 'id' | 'createdAt'>>): Buyer | null => {
        const index = buyers.findIndex(buyer => buyer.id === id);
        if (index === -1) return null;

        buyers[index] = {
            ...buyers[index],
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        return buyers[index];
    },

    // Delete buyer
    delete: (id: string): boolean => {
        const index = buyers.findIndex(buyer => buyer.id === id);
        if (index === -1) return false;
        buyers.splice(index, 1);
        return true;
    },

    // Get all buyers
    getAll: (): Buyer[] => {
        return [...buyers];
    },

    // Verify password
    verifyPassword: (buyer: Buyer, password: string): boolean => {
        return buyer.password === password;
    },

    // Check if username exists
    usernameExists: (username: string): boolean => {
        return buyers.some(buyer => buyer.username === username);
    },

    // Check if email exists
    emailExists: (email: string): boolean => {
        return buyers.some(buyer => buyer.email === email);
    },
};

export default buyerDB;
