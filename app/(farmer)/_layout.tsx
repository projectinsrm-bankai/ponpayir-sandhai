import { Stack } from "expo-router";
import '../globals.css'; // Adjust active path if needed

export default function FarmerLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#F8FFDE' }, // Cream background for all auth pages
            }}
        />
    );
}
