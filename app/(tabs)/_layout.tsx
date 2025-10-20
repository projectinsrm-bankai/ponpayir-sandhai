// app/(tabs)/_layout.tsx
import { Stack } from "expo-router";
import '../globals.css';

export default function TabsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#F8FFDE' }
            }}
        />
    );
}