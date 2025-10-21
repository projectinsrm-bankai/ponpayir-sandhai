import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {router} from "expo-router";

const invoice = {
    orderId: "ORD1234279",
    paidAt: "21 Oct 2025, 07:40 PM",
    total: "$35.00",
    items: [
        {
            name: "Organic Rice",
            qty: "1kg",
            price: "$10.00",
            img: "https://images.pexels.com/photos/41957/rice-bowl-white-ceramic-41957.jpeg?auto=compress&w=80"
        },
        {
            name: "Organic Lentils",
            qty: "1kg",
            price: "$12.00",
            img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=80"
        },
        {
            name: "Organic Wheat",
            qty: "1kg",
            price: "$13.00",
            img: "https://images.pexels.com/photos/221361/pexels-photo-221361.jpeg?auto=compress&w=80"
        },
    ],
    shipping: "$5.00",
    subtotal: "$30.00"
};

export default function PaymentSuccess() {
    return (
        <SafeAreaView className="flex-1 bg-primary-cream justify-between">
            <View className="flex-1 justify-center px-6">
                {/* Success Icon */}
                <View className="items-center mb-7">
                    <View className="bg-[#EAF6BC] rounded-full p-6 shadow" style={{ elevation: 6 }}>
                        <Ionicons name="checkmark-circle" size={54} color="#7A9608" />
                    </View>
                    <Text className="font-quicksand-bold text-2xl mt-5 text-primary">Payment Successful</Text>
                </View>

                {/* Order Info */}
                <View className="bg-[#F8FFDE] rounded-xl px-4 py-3 mb-5 shadow-md" style={{ elevation: 2 }}>
                    <Text className="font-quicksand-bold text-[#67671A] mb-1">Order ID: <Text className="text-[#7A9608]">{invoice.orderId}</Text></Text>
                    <Text className="font-quicksand text-[#576423] mb-1">Paid at: {invoice.paidAt}</Text>
                </View>

                {/* Invoice Card */}
                <View className="bg-white rounded-2xl px-4 py-4 mb-5 border border-dashed border-[#BCD657] shadow-sm" style={{ elevation: 1 }}>
                    {invoice.items.map((item, idx) => (
                        <View key={item.name + idx} className="flex-row items-center mb-3">
                            <Image
                                source={{ uri: item.img }}
                                style={{ width: 36, height: 36, borderRadius: 9, marginRight: 10 }}
                            />
                            <Text className="font-quicksand-bold text-primary mr-2">{item.name}</Text>
                            <Text className="text-xs text-[#7A9608] mr-2">{item.qty}</Text>
                            <Text className="text-xs font-quicksand-bold text-[#B5B80A] ml-auto">{item.price}</Text>
                        </View>
                    ))}
                    <View className="my-2" style={{ borderTopWidth: 1, borderColor: "#EAF6BC" }} />
                    <View className="flex-row justify-between mb-1">
                        <Text className="font-quicksand-bold text-[#7A9608]">Subtotal</Text>
                        <Text className="font-quicksand-bold text-primary">{invoice.subtotal}</Text>
                    </View>
                    <View className="flex-row justify-between mb-1">
                        <Text className="font-quicksand-bold text-[#7A9608]">Shipping</Text>
                        <Text className="font-quicksand-bold text-primary">{invoice.shipping}</Text>
                    </View>
                    <View className="flex-row justify-between pt-1 mt-2 border-t border-dashed border-[#BCD657]">
                        <Text className="font-quicksand-bold text-[#7A9608] text-lg">Total</Text>
                        <Text className="font-quicksand-bold text-primary text-lg">{invoice.total}</Text>
                    </View>
                </View>
            </View>

            {/* Return to Home Button */}
            <View className="px-8 mb-6">
                <Pressable
                    className="w-full h-12 rounded-xl bg-[#B5B80A] justify-center items-center shadow-lg"
                    style={{ elevation: 4 }}
                    onPress={() => router.push("../(buyer)/home")}
                >
                    <Text className="text-white font-quicksand-bold text-lg">Return to Home</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
