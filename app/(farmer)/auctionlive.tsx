import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Pressable, Image, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {router} from "expo-router";
import BottomNav from "@/components/BottomNav";

function ProfitCapacitySummary({ totalProfit, capacityUsed, capacityLimit }: { totalProfit: number; capacityUsed: number; capacityLimit: number }) {
    return (
        <View className="border border-dashed border-[#BCD657] rounded-xl p-4 mb-4 bg-white flex-row justify-between">
            <View>
                <Text className="text-xs text-gray-400">Total Profit</Text>
                <Text className="text-lg font-quicksand-bold text-primary">₹{totalProfit.toLocaleString()}</Text>
            </View>
            <View>
                <Text className="text-xs text-gray-400">Capacity Used</Text>
                <Text className="text-lg font-quicksand-bold text-primary">{capacityUsed} / {capacityLimit} kg</Text>
            </View>
        </View>
    );
}

export default function AuctionLivePage() {
    const [showInfo, setShowInfo] = useState(false);

    const bids = [
        { name: "You", amount: 1500, quantity: 250, time: "10:30 AM", avatar: "https://randomuser.me/api/portraits/men/30.jpg", place: "Trichy" },
        { name: "Arun", amount: 1400, quantity: 250, time: "10:25 AM", avatar: "https://randomuser.me/api/portraits/men/35.jpg", place: "Salem" },
        { name: "Priya", amount: 1300, quantity: 250, time: "10:20 AM", avatar: "https://randomuser.me/api/portraits/women/43.jpg", place: "Madurai" },
    ];

    // Knapsack calculation is assumed done externally:
    // Here we just sum all bids since example bids fit in capacity
    const capacityLimit = 500;
    const capacityUsed = bids.reduce((sum, bid) => sum + bid.quantity, 0);
    const totalProfit = bids.reduce((sum, bid) => sum + bid.amount, 0);

    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/* Top Bar */}
                <View className="flex-row items-center justify-between mb-2">
                    <Pressable>
                        <Ionicons name="arrow-back-outline" size={28} color="#222" />
                    </Pressable>
                    <Text className="font-quicksand-bold text-xl">Auction Entry</Text>
                    <View className="flex-row items-center">
                        <View className="w-3 h-3 rounded-full bg-red-500 mr-1" />
                        <Text className="text-xs font-quicksand-bold text-red-500">Live</Text>
                    </View>
                </View>

                {/* Product Description */}
                <Text className="text-[#7A9608] font-quicksand mb-3 mt-1" style={{ fontSize: 14 }}>
                    A tomato is an edible, fleshy berry from the nightshade family of plants, native to western South America but now grown globally.
                </Text>

                {/* Base Price & Total Available */}
                <View className="flex-row justify-between border border-dashed border-[#BCD657] rounded-xl px-4 py-3 mb-4 bg-white">
                    <View>
                        <Text className="text-xs text-gray-400">Base Price</Text>
                        <Text className="text-lg font-quicksand-bold text-primary">₹1,200</Text>
                    </View>
                    <View>
                        <Text className="text-xs text-gray-400">Total available</Text>
                        <Text className="text-lg font-quicksand-bold text-primary">kg 500</Text>
                    </View>
                </View>

                {/* Bid Section Header */}
                <View className="flex-row items-center mb-1">
                    <Text className="font-quicksand-bold text-lg mr-2">Bid</Text>
                    <Pressable onPress={() => setShowInfo(true)}>
                        <Ionicons name="help-circle-outline" size={18} color="#888" />
                    </Pressable>
                </View>

                {/* Bids */}
                {bids.map((b, i) => (
                    <View key={i} className="flex-row items-center mb-2 rounded-lg" style={{ backgroundColor: b.name === "You" ? "#EAF6BC" : "#F8FFDE" }}>
                        <Image
                            source={{ uri: b.avatar }}
                            style={{ width: 58, height: 58, borderRadius: 13, margin: 8, backgroundColor: "#ddd" }}
                        />
                        <View className="flex-1">
                            <Text className="font-quicksand-bold text-[#7A9608] text-base">{b.name} - {b.place}</Text>
                            <Text className="text-lg font-quicksand-bold text-primary">₹{b.amount.toLocaleString()}</Text>
                            <Text className="text-xs text-[#80875c]">{b.quantity} kg</Text>
                            <Text className="text-xs text-[#bababa]">{b.time}</Text>
                        </View>
                    </View>
                ))}

                {/* Profit & Capacity Summary */}
                <ProfitCapacitySummary totalProfit={totalProfit} capacityUsed={capacityUsed} capacityLimit={capacityLimit} />

                {/* Summary Button */}
                <Pressable className="w-full h-12 rounded-lg bg-primary justify-center items-center my-4" onPress={() => router.push("../(farmer)/auctions")}>
                    <Text className="text-white font-quicksand-bold text-base">Checkout Auctions</Text>
                </Pressable>
            </ScrollView>

            {/* Info Popup */}
            <Modal
                visible={showInfo}
                transparent
                animationType="fade"
                onRequestClose={() => setShowInfo(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)'
                }}>
                    <View style={{
                        backgroundColor: '#F8FFDE',
                        padding: 24,
                        borderRadius: 16,
                        maxWidth: 320,
                        shadowColor: "#000",
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 0, height: 3 }
                    }}>
                        <Text className="font-quicksand-bold text-[#7A9608] mb-3">How bidding works</Text>
                        <Text className="text-[#444444] mb-2 font-quicksand" style={{ fontSize: 14 }}>
                            The app uses the knapsack approach to help the farmer pick bidders who offer the highest total profit without exceeding the allowed weight or capacity. Each bid has a weight (quantity) and a value (profit), and the system selects the best combination of bids that maximizes earnings within the limit.
                        </Text>
                        <Pressable className="mt-3 items-center" onPress={() => setShowInfo(false)}>
                            <Text className="text-primary font-quicksand-bold">Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Bottom Nav Bar */}
            <BottomNav />
        </SafeAreaView>
    );
}
