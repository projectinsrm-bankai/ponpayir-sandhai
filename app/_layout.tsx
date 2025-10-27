// app/_layout.tsx
import { AuthProvider } from '@/lib/authContext';
import { Stack } from "expo-router";
import './globals.css';

export default function RootLayout() {
    const isAuthenticated = false;

    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(buyer)" options={{ headerShown: false }} />
                <Stack.Screen name="(farmer)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                {/* add more screens if needed */}
            </Stack>
        </AuthProvider>
    );
}