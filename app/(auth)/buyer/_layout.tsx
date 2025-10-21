import { Stack } from "expo-router";
import '../../globals.css'; // Adjust the path as needed

export default function BuyerLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#F8FFDE' }
            }}
        />
    );
}
