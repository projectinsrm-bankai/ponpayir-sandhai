import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomNavBuyer from "@/components/BottomNavBuyer";

const monthStats = [
    {
        icon: <Ionicons name="wallet-outline" size={24} color="#7A9608" />,
        label: "Total Spent",
        value: "$320.50",
        bg: "#F8FFDE"
    },
    {
        icon: <Ionicons name="pricetag-outline" size={24} color="#1976D2" />,
        label: "Bids Placed",
        value: "15",
        bg: "#E6F0FA"
    },
    {
        icon: <Ionicons name="checkmark-done-circle-outline" size={24} color="#4CAF50" />,
        label: "Orders Delivered",
        value: "12",
        bg: "#E6F5EA"
    },
    {
        icon: <MaterialIcons name="stars" size={24} color="#FFCB22" />,
        label: "Best Auction",
        value: "#1234279",
        bg: "#FFFBEA"
    },
];

const activities = [
    {
        time: "21 Oct, 19:32",
        icon: <Ionicons name="cube-outline" size={20} color="#7A9608" />,
        text: "Order #142286 delivered"
    },
    {
        time: "20 Oct, 17:45",
        icon: <Ionicons name="pricetag-outline" size={20} color="#1976D2" />,
        text: "Bid placed for Potato Auction #124878"
    },
    {
        time: "19 Oct, 15:21",
        icon: <Ionicons name="cash-outline" size={20} color="#4CAF50" />,
        text: "Payment successful for Order #139002"
    },
    {
        time: "18 Oct, 12:50",
        icon: <MaterialIcons name="star-border" size={20} color="#FFCB22" />,
        text: "Top buyer badge received"
    },
];

export default function ReportsPage() {
    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-3 mb-1">
                <Text className="text-2xl font-quicksand-bold text-primary">Reports</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 14 }}>
                {/* Stats Cards */}
                <View className="flex-row flex-wrap justify-between mb-5">
                    {monthStats.map((x, idx) => (
                        <View
                            key={x.label}
                            className="w-[47%] mb-4 rounded-xl p-4"
                            style={{
                                backgroundColor: x.bg,
                                elevation: 2,
                                minWidth: 140,
                                shadowColor: "#BCD657",
                                shadowRadius: 6,
                            }}
                        >
                            <View className="mb-2">{x.icon}</View>
                            <Text className="font-quicksand-bold text-[#7A9608] text-base mb-1">{x.value}</Text>
                            <Text className="font-quicksand text-[#737323] text-xs">{x.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Activity Timeline */}
                <View className="rounded-xl border border-dashed border-[#BCD657] bg-[#EAF6BC] p-4 mb-6">
                    <Text className="font-quicksand-bold text-primary mb-3 text-lg">This Month's Activity</Text>
                    {activities.map((act, i) => (
                        <View key={i} className="flex-row items-center mb-3">
                            <View className="mr-3">{act.icon}</View>
                            <View className="flex-1">
                                <Text className="font-quicksand text-[#444] text-base">{act.text}</Text>
                                <Text className="font-quicksand text-xs text-[#B5B80A] mt-0.5">{act.time}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Download Statement */}
                <Pressable
                    className="w-full h-12 rounded-xl bg-[#B5B80A] justify-center items-center shadow-md"
                    style={{ elevation: 2 }}
                    onPress={() => { /* Statement download logic */ }}
                >
                    <Text className="text-white font-quicksand-bold text-lg">Download Statement</Text>
                </Pressable>
                <View style={{ height: 32 }} />
            </ScrollView>
            <BottomNavBuyer />
        </SafeAreaView>
    );
}
