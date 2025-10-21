import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import BottomNavBuyer from "@/components/BottomNav";

const notifications = [
    {
        type: "bid_applied",
        icon: <Ionicons name="pricetag" size={22} color="#7A9608" />,
        title: "Bid Applied",
        message: "Your bid for Auction #124312 (Tomato) was placed successfully.",
        time: "2m ago"
    },
    {
        type: "bid_completed",
        icon: <MaterialIcons name="done" size={22} color="#388E3C" />,
        title: "Bid Completed",
        message: "Your bid for Auction #123987 was successful. You got 250 kg.",
        time: "10m ago"
    },
    {
        type: "orders_received",
        icon: <Ionicons name="cube" size={22} color="#1976D2" />,
        title: "Order Received",
        message: "5 new orders received for Potato. Check and confirm delivery.",
        time: "1h ago"
    },
    {
        type: "orders_delivered",
        icon: <Ionicons name="checkmark-done-circle" size={22} color="#7A9608" />,
        title: "Order Delivered",
        message: "Your order #44321 was delivered to Arun successfully!",
        time: "3h ago"
    },
    {
        type: "bid_no_orders",
        icon: <MaterialCommunityIcons name="emoticon-sad-outline" size={22} color="#FF4545" />,
        title: "Bid Finished (No Orders)",
        message: "Auction #124876 ended with no orders placed for your bid.",
        time: "1d ago"
    },
];

export default function NotificationsPage() {
    const getBgColor = (type: string) => {
        switch (type) {
            case "bid_applied": return "#F8FFDE";
            case "bid_completed": return "#E6F5EA";
            case "orders_received": return "#E6F0FA";
            case "orders_delivered": return "#F8FFDE";
            case "bid_no_orders": return "#FFF2F2";
            default: return "#F8FFDE";
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            <View className="flex-row items-center justify-between px-4 py-3 mb-2">
                <Text className="text-2xl font-quicksand-bold text-primary">Notifications</Text>
            </View>
            <ScrollView contentContainerStyle={{ padding: 14 }}>
                <View className="rounded-xl border border-dashed border-[#BCD657] px-2 py-2 bg-[#EAF6BC]">
                    {notifications.map((n, idx) => (
                        <View
                            key={n.title + idx}
                            className="flex-row items-start px-2 py-3 mb-2 rounded-lg"
                            style={{ backgroundColor: getBgColor(n.type) }}
                        >
                            <View className="mt-1 mr-3">{n.icon}</View>
                            <View className="flex-1">
                                <Text className="font-quicksand-bold text-primary text-base mb-1">{n.title}</Text>
                                <Text className="font-quicksand text-[#737323] mb-1">{n.message}</Text>
                                <Text className="text-xs text-[#B5B80A] font-quicksand">{n.time}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <BottomNavBuyer />
        </SafeAreaView>
    );
}
