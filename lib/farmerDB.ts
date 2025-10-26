// Database for Farmers
export interface Farmer {
    id: string;
    username: string;
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    address?: string;
    farmName?: string;
    farmLocation?: string;
    crops?: string[];
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

// In-memory storage for demo purposes
let farmers: Farmer[] = [
    {
        id: '1',
        username: 'farmer1',
        email: 'farmer1@example.com',
        password: 'password123',
        fullName: 'Rajesh Kumar',
        phone: '+1234567890',
        address: 'Farm Road 1, Village',
        farmName: 'Green Valley Farm',
        farmLocation: 'Punjab, India',
        crops: ['Tomatoes', 'Potatoes', 'Onions'],
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        username: 'farmer2',
        email: 'farmer2@example.com',
        password: 'password123',
        fullName: 'Priya Sharma',
        phone: '+1234567891',
        address: 'Farm Road 2, Village',
        farmName: 'Organic Paradise',
        farmLocation: 'Haryana, India',
        crops: ['Carrots', 'Beetroot', 'Spinach'],
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// Database functions
export const farmerDB = {
    // Find farmer by username or email
    findByUsernameOrEmail: (identifier: string): Farmer | null => {
        return farmers.find(
            farmer => farmer.username === identifier || farmer.email === identifier
        ) || null;
    },

    // Find farmer by ID
    findById: (id: string): Farmer | null => {
        return farmers.find(farmer => farmer.id === id) || null;
    },

    // Create new farmer
    create: (farmerData: Omit<Farmer, 'id' | 'createdAt' | 'updatedAt'>): Farmer => {
        const newFarmer: Farmer = {
            ...farmerData,
            id: (farmers.length + 1).toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        farmers.push(newFarmer);
        return newFarmer;
    },

    // Update farmer
    update: (id: string, updates: Partial<Omit<Farmer, 'id' | 'createdAt'>>): Farmer | null => {
        const index = farmers.findIndex(farmer => farmer.id === id);
        if (index === -1) return null;

        farmers[index] = {
            ...farmers[index],
            ...updates,
            updatedAt: new Date().toISOString(),
        };
        return farmers[index];
    },

    // Delete farmer
    delete: (id: string): boolean => {
        const index = farmers.findIndex(farmer => farmer.id === id);
        if (index === -1) return false;
        farmers.splice(index, 1);
        return true;
    },

    // Get all farmers
    getAll: (): Farmer[] => {
        return [...farmers];
    },

    // Get verified farmers only
    getVerified: (): Farmer[] => {
        return farmers.filter(farmer => farmer.isVerified);
    },

    // Verify password
    verifyPassword: (farmer: Farmer, password: string): boolean => {
        return farmer.password === password;
    },

    // Check if username exists
    usernameExists: (username: string): boolean => {
        return farmers.some(farmer => farmer.username === username);
    },

    // Check if email exists
    emailExists: (email: string): boolean => {
        return farmers.some(farmer => farmer.email === email);
    },

    // Verify farmer account
    verifyAccount: (id: string): boolean => {
        const farmer = farmers.find(f => f.id === id);
        if (!farmer) return false;
        farmer.isVerified = true;
        farmer.updatedAt = new Date().toISOString();
        return true;
    },
};

export default farmerDB;
