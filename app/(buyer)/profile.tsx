import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* Red Verification Alert */}
                <View className="mb-4 rounded-xl bg-[#FFE5E7] border border-[#FF4B4B] flex-row items-center p-3">
                    <Ionicons name="alert-circle" size={24} color="#FF2A2A" style={{ marginRight: 10 }} />

                    <Pressable className="ml-3 px-4 py-2 rounded-lg bg-[#FF4B4B]" onPress={() => {/* verification logic */}}>
                        <Text className="text-white font-quicksand-bold text-sm">Go</Text>
                    </Pressable>
                </View>

                {/* Profile Card */}
                <View className="rounded-xl border border-[#BCD657] bg-[#EAF6BC] p-4 mb-6 items-center">
                    <Image
                        source={{ uri: "https://randomuser.me/api/portraits/men/31.jpg" }} // Dummy avatar
                        style={{ width: 88, height: 88, borderRadius: 24, marginBottom: 12 }}
                    />
                    <Text className="font-quicksand-bold text-xl text-primary mb-1">Somu</Text>
                    <Text className="font-quicksand text-[#67671A] mb-2">Buyer</Text>
                    <Text className="font-quicksand text-[#576423] mb-2">Phone: +91 98765 43210</Text>
                    <Text className="font-quicksand text-[#576423] mb-2">Aadhar: XXXX-XXXX-1234</Text>
                    <Text className="font-quicksand text-[#576423] mb-2">Address: Trichy, Tamil Nadu</Text>
                    <Text className="font-quicksand text-[#576423] mb-1">Bank: State Bank of India</Text>
                    <Text className="font-quicksand text-[#576423]">Account No: XXXXXXXX0203</Text>
                </View>

                {/* Additional Section: Profile Actions */}
                <View className="bg-[#F8FFDE] rounded-xl border border-dashed border-[#BCD657] p-4 mb-4">
                    <Text className="font-quicksand-bold text-primary mb-2">Need Help?</Text>
                    <Text className="font-quicksand text-[#576423] mb-3">Contact support for any issues or update info any time.</Text>
                    <Pressable className="w-1/2 mx-auto h-11 rounded-lg bg-primary justify-center items-center">
                        <Text className="text-white font-quicksand-bold text-base">Contact Support</Text>
                    </Pressable>
                </View>
            </ScrollView>

            {/* Bottom Nav Bar */}
            <BottomNav />
        </SafeAreaView>
    );
}
