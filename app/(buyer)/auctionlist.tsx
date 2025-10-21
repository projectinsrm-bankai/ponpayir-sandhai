import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "@/components/BottomNav";

const auctionData = [
    {
        auctionId: "123422",
        product: "Tomato",
        productImg: "https://images.pexels.com/photos/13272119/pexels-photo-13272119.jpeg?auto=compress&w=60&h=60",
        basePrice: 25,
        orders: 8,
        capacity: "135kg",
        profit: "₹2,700",
        timeLeft: "2h",
    },
    {
        auctionId: "123423",
        product: "Potato",
        productImg: "https://images.pexels.com/photos/2094122/pexels-photo-2094122.jpeg?auto=compress&w=60&h=60",
        basePrice: 32,
        orders: 5,
        capacity: "85kg",
        profit: "₹1,360",
        timeLeft: "1h",
    },
    {
        auctionId: "123424",
        product: "Potato",
        productImg: "https://images.pexels.com/photos/2094122/pexels-photo-2094122.jpeg?auto=compress&w=60&h=60",
        basePrice: 32,
        orders: 5,
        capacity: "85kg",
        profit: "₹1,360",
        timeLeft: "1h",
    },
    // ...more auction items
];

export default function AuctionList() {
    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 mb-2">
                <Pressable>
                    <Ionicons name="arrow-back-outline" size={28} color="#7A9608" />
                </Pressable>
                <Text className="text-2xl font-quicksand-bold text-primary">Auctions</Text>
            </View>

            {/* Auction Cards */}
            <ScrollView contentContainerStyle={{ padding: 14 }}>
                <View className="rounded-xl border border-dashed border-[#BCD657] p-2 bg-[#EAF6BC]">
                    {auctionData.map((item, idx) => (
                        <View
                            key={item.auctionId + idx}
                            className="flex-row items-center px-2 py-3 mb-2 rounded-lg bg-[#F8FFDE]"
                            style={{ borderBottomWidth: 1, borderBottomColor: "#EAF6BC" }}
                        >
                            {/* Product image */}
                            <Image
                                source={{ uri: item.productImg }}
                                style={{ width: 52, height: 52, borderRadius: 12, marginRight: 10 }}
                            />

                            {/* Auction Info Vertical */}
                            <View className="flex-1">
                                <Text className="font-quicksand-bold text-primary text-base">Auction #{item.auctionId}</Text>
                                <Text className="font-quicksand text-[#487908]">{item.product} • {item.capacity}</Text>
                                <Text className="font-quicksand text-[#737323] mt-1">
                                    Orders: {item.orders} | Profit: {item.profit}
                                </Text>
                                <Text className="text-xs text-[#7A9608]">
                                    Base Price: ₹{item.basePrice}
                                </Text>
                            </View>

                            {/* Time left */}
                            <View className="items-center ml-2">
                                <Ionicons name="time-outline" size={18} color="#606918" />
                                <Text className="font-quicksand text-primary text-xs mt-1">{item.timeLeft}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Nav Bar */}
            <BottomNav />
        </SafeAreaView>
    );
}
