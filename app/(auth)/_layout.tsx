import { AuthProvider } from '@/lib/authContext';
import { Stack } from "expo-router";
import '../globals.css'; // Adjust active path if needed

export default function AuthLayout() {
    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#F8FFDE' }, // Cream background for all auth pages
                }}
            />
        </AuthProvider>
    );
}
