import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Buyer } from './buyerDB';
import { Farmer } from './farmerDB';

export type UserType = 'buyer' | 'farmer';
export type User = Buyer | Farmer;

interface AuthContextType {
    user: User | null;
    userType: UserType | null;
    isLoading: boolean;
    login: (identifier: string, password: string, userType: UserType) => Promise<{ success: boolean; message: string }>;
    register: (userData: any, userType: UserType) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    demoLogin: (userType: UserType) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userType, setUserType] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on app start
    useEffect(() => {
        // In a real app, you'd check AsyncStorage or secure storage
        // For demo purposes, we'll just set loading to false
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const login = async (identifier: string, password: string, type: UserType): Promise<{ success: boolean; message: string }> => {
        try {
            setIsLoading(true);

            if (type === 'buyer') {
                const { buyerDB } = await import('./buyerDB');
                const buyer = buyerDB.findByUsernameOrEmail(identifier);

                if (!buyer) {
                    return { success: false, message: 'User not found' };
                }

                if (!buyerDB.verifyPassword(buyer, password)) {
                    return { success: false, message: 'Invalid password' };
                }

                setUser(buyer);
                setUserType('buyer');
                return { success: true, message: 'Login successful' };
            } else {
                const { farmerDB } = await import('./farmerDB');
                const farmer = farmerDB.findByUsernameOrEmail(identifier);

                if (!farmer) {
                    return { success: false, message: 'User not found' };
                }

                if (!farmerDB.verifyPassword(farmer, password)) {
                    return { success: false, message: 'Invalid password' };
                }

                setUser(farmer);
                setUserType('farmer');
                return { success: true, message: 'Login successful' };
            }
        } catch (error) {
            return { success: false, message: 'Login failed' };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: any, type: UserType): Promise<{ success: boolean; message: string }> => {
        try {
            setIsLoading(true);

            if (type === 'buyer') {
                const { buyerDB } = await import('./buyerDB');

                if (buyerDB.usernameExists(userData.username)) {
                    return { success: false, message: 'Username already exists' };
                }

                if (buyerDB.emailExists(userData.email)) {
                    return { success: false, message: 'Email already exists' };
                }

                const newBuyer = buyerDB.create(userData);
                setUser(newBuyer);
                setUserType('buyer');
                return { success: true, message: 'Registration successful' };
            } else {
                const { farmerDB } = await import('./farmerDB');

                if (farmerDB.usernameExists(userData.username)) {
                    return { success: false, message: 'Username already exists' };
                }

                if (farmerDB.emailExists(userData.email)) {
                    return { success: false, message: 'Email already exists' };
                }

                const newFarmer = farmerDB.create(userData);
                setUser(newFarmer);
                setUserType('farmer');
                return { success: true, message: 'Registration successful' };
            }
        } catch (error) {
            return { success: false, message: 'Registration failed' };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setUserType(null);
    };

    const updateUser = (updates: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...updates });
        }
    };

    const demoLogin = async (type: UserType): Promise<{ success: boolean; message: string }> => {
        try {
            setIsLoading(true);

            if (type === 'farmer') {
                const { farmerDB } = await import('./farmerDB');
                const farmer = farmerDB.findById('demo-farmer-1');

                if (!farmer) {
                    return { success: false, message: 'Demo farmer not found' };
                }

                setUser(farmer);
                setUserType('farmer');
                return { success: true, message: 'Demo login successful' };
            } else {
                // For buyer demo login, you can add similar logic
                return { success: false, message: 'Demo buyer not available' };
            }
        } catch (error) {
            return { success: false, message: 'Demo login failed' };
        } finally {
            setIsLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        userType,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        demoLogin,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
