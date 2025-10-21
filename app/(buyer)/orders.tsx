import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBuyer from "@/components/BottomNavBuyer";

const orders = [
    {
        orderId: "1234567890",
        product: "Tomato",
        productImg: "https://images.pexels.com/photos/13272119/pexels-photo-13272119.jpeg?auto=compress&w=60&h=60",
        quantity: "5kg",
        status: 2, // 0 = Placed, 1 = Confirmed, 2 = Shipped, 3 = Delivered
        steps: [
            { name: "Order Placed", time: "10:00 AM" },
            { name: "Order Confirmed", time: "12:00 PM" },
            { name: "Shipped", time: "2:00 PM" },
            { name: "Delivered", time: "4:00 PM" },
        ],
    },
    // ...more orders
];

export default function OrdersPage() {
    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 mb-2">
                <Pressable>
                    <Ionicons name="arrow-back-outline" size={28} color="#7A9608" />
                </Pressable>
                <Text className="text-2xl font-quicksand-bold text-primary">Order Tracking</Text>
            </View>

            {/* Orders Cards */}
            <ScrollView contentContainerStyle={{ padding: 14 }}>
                <View className="rounded-xl border border-dashed border-[#BCD657] p-3 bg-[#EAF6BC]">
                    {orders.map((order, idx) => (
                        <View
                            key={order.orderId + idx}
                            className="bg-[#F8FFDE] rounded-2xl mb-4 p-4"
                            style={{ borderBottomWidth: 1, borderBottomColor: "#EAF6BC" }}
                        >
                            <View className="flex-row items-center mb-2">
                                <View className="flex-1">
                                    <Text className="text-xs text-[#487908] mb-1">Order #{order.orderId}</Text>
                                    <Text className="font-quicksand-bold text-primary text-lg">{order.product}</Text>
                                    <Text className="text-xs text-[#838323] mt-1">Quantity: {order.quantity}</Text>
                                </View>
                                <Image
                                    source={{ uri: order.productImg }}
                                    style={{ width: 54, height: 38, borderRadius: 12 }}
                                />
                            </View>

                            {/* Progress Bar */}
                            <View className="mt-3 mb-2">
                                <Text className="font-quicksand-bold text-primary mb-2">Order Progress</Text>
                                <View style={{ height: 7, borderRadius: 6, backgroundColor: "#D7D7D7", overflow: 'hidden' }}>
                                    <View
                                        style={{
                                            width: `${((order.status + 1) / order.steps.length) * 100}%`,
                                            height: 7,
                                            backgroundColor: "#7A9608",
                                            borderRadius: 6,
                                        }}
                                    />
                                </View>
                            </View>

                            {/* Stepper */}
                            <View className="mt-2">
                                <Text className="font-quicksand-bold text-primary mb-2">Order Progress</Text>
                                {order.steps.map((s, sIdx) => (
                                    <View key={s.name + s.time} className="flex-row items-center mb-3">
                                        <View>
                                            <Ionicons
                                                name={
                                                    sIdx <= order.status
                                                        ? "checkmark-circle"
                                                        : "ellipse-outline"
                                                }
                                                size={22}
                                                color={sIdx <= order.status ? "#7A9608" : "#C8C8C8"}
                                            />
                                            {sIdx !== order.steps.length - 1 && (
                                                <View style={{ width: 2, height: 18, backgroundColor: "#D7D7D7", alignSelf: 'center' }} />
                                            )}
                                        </View>
                                        <View className="ml-3">
                                            <Text className="font-quicksand-bold text-primary">{s.name}</Text>
                                            <Text className="text-xs text-[#79798A]">{s.time}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <BottomNavBuyer />
        </SafeAreaView>
    );
}
