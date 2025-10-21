import './globals.css';
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons'; // For info icon

export default function Index() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-primary-cream px-8 pt-20">
            <View className="flex-row justify-between items-center mb-16">
                <Text className="text-2xl font-quicksand-bold text-primary">Ponpayir Sandhai</Text>
                <Pressable>
                    <Ionicons name="help-circle-outline" size={28} color="#7A9608" />
                </Pressable>
            </View>

            <View className="gap-y-6">
                <Pressable
                    className="w-full rounded-xl h-12 justify-center items-center bg-[#7A9608]"
                    onPress={() => router.push('/(auth)/farmer/sign-in')}
                >
                    <Text className="text-white text-base font-quicksand-bold">Farmer</Text>
                </Pressable>
                <Pressable
                    className="w-full rounded-xl h-12 justify-center items-center bg-[#7A9608]"
                    onPress={() => router.push('/(auth)/buyer/sign-in')}
                >
                    <Text className="text-white text-base font-quicksand-bold">Buyer</Text>
                </Pressable>
                <Pressable
                    className="w-1/2 mt-8 rounded-lg h-10 justify-center items-center bg-[#444444]"
                    // onPress={() => router.push('/auth/admin-login')}
                    onPress={() => router.push('/(tabs)/admin')}
                >
                    <Text className="text-white text-base font-quicksand-bold">Admin</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
