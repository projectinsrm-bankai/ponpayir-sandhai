# Authentication System Demo

## Overview
This authentication system provides a simple, file-based database for demo purposes with separate user types for buyers and farmers.

## Features
- ✅ Separate databases for buyers and farmers
- ✅ User registration and login
- ✅ Password validation
- ✅ Error handling
- ✅ Loading states
- ✅ Custom input and button components
- ✅ Beautiful UI with your existing design

## Demo Credentials

### Buyers
- **Username:** `buyer1` or `buyer1@example.com`
- **Password:** `password123`
- **Username:** `buyer2` or `buyer2@example.com`
- **Password:** `password123`

### Farmers
- **Username:** `farmer1` or `farmer1@example.com`
- **Password:** `password123`
- **Username:** `farmer2` or `farmer2@example.com`
- **Password:** `password123`

## File Structure
```
lib/
├── buyerDB.ts          # Buyer database and functions
├── farmerDB.ts         # Farmer database and functions
└── authContext.tsx     # Authentication context and provider

components/
├── CustomInput.tsx     # Reusable input component
└── CustomButton.tsx    # Reusable button component

app/(auth)/
├── _layout.tsx         # Auth layout with AuthProvider
├── buyer/
│   ├── sign-in.tsx     # Buyer sign-in page
│   └── sign-up.tsx     # Buyer sign-up page
└── farmer/
    ├── sign-in.tsx     # Farmer sign-in page
    └── sign-up.tsx     # Farmer sign-up page
```

## Usage

### Using the Auth Context
```tsx
import { useAuth } from '@/lib/authContext';

const MyComponent = () => {
  const { user, userType, login, register, logout, isLoading } = useAuth();
  
  // Your component logic
};
```

### Database Functions
```tsx
import { buyerDB } from '@/lib/buyerDB';
import { farmerDB } from '@/lib/farmerDB';

// Find user
const buyer = buyerDB.findByUsernameOrEmail('buyer1');
const farmer = farmerDB.findByUsernameOrEmail('farmer1');

// Create new user
const newBuyer = buyerDB.create({
  username: 'newuser',
  email: 'new@example.com',
  password: 'password123',
  fullName: 'New User'
});
```

## Next Steps
1. Test the authentication flow
2. Add more validation rules if needed
3. Implement persistent storage (AsyncStorage) for production
4. Add more user fields as required
5. Implement password hashing for security

## Notes
- Passwords are stored in plain text for demo purposes
- Data is stored in memory and will be lost on app restart
- For production, implement proper password hashing and persistent storage
- The system is designed to be easily migrated to a real database later
