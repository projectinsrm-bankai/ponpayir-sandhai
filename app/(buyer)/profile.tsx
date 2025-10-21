import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, Pressable } from "react-native";
import BottomNavBuyer from "@/components/BottomNavBuyer";



export default function ProfilePage() {
    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            <ScrollView contentContainerStyle={{ padding: 20 }}>


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
            <BottomNavBuyer />
        </SafeAreaView>
    );
}
