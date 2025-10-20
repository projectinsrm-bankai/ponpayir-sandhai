import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function FarmerDashboard() {
    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/* Header */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-xl font-quicksand-bold text-primary">FARMER</Text>
                    <Pressable>
                        <Ionicons name="help-circle-outline" size={24} color="#7A9608" />
                    </Pressable>
                </View>
                <Text className="text-lg font-quicksand-bold text-primary mb-2">Good Morning, Somu</Text>

                {/* Announcement */}
                <View className="rounded-md bg-[#FFEABF] px-4 py-2 border-l-4 border-[#F4C542] mb-4 flex-row items-center">
                    <MaterialIcons name="campaign" size={18} color="#F4C542" />
                    <Text className="ml-2 text-[#887723] font-quicksand">Reminder: Auction for seasonal produce opens today at 4pm!</Text>
                </View>

                {/* Stats Cards */}
                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1 rounded-xl bg-[#EAF6BC] p-4 border border-[#BCD657]">
                        <Text className="text-xs text-[#576423] mb-1">Total Earnings</Text>
                        <Text className="text-xl font-quicksand-bold text-primary">₹12,500</Text>
                    </View>
                    <View className="flex-1 rounded-xl bg-[#EAF6BC] p-4 border border-[#BCD657]">
                        <Text className="text-xs text-[#576423] mb-1">Avg Transaction</Text>
                        <Text className="text-xl font-quicksand-bold text-primary">₹250</Text>
                    </View>
                </View>

                {/* Auction Action & Quick Status */}
                <View className="bg-[#F8FFDE] border border-dashed border-[#444444] rounded-xl p-4 mb-4 items-center">
                    <Text className="mb-2 font-quicksand-semibold text-primary text-base">Start Auction Entry</Text>
                    <Pressable className="w-2/3 h-12 rounded-lg bg-primary justify-center items-center mb-2">
                        <Text className="text-white font-quicksand-bold text-lg tracking-wide">Enter</Text>
                    </Pressable>
                    <Text className="text-xs text-[#7A9608] mt-1">3 auctions active • Next close: 6:00pm</Text>
                </View>

                {/* Recent Auctions Snapshot */}
                <View className="bg-white p-4 rounded-lg shadow-sm border mb-4">
                    <Text className="font-quicksand-bold text-[#576423] mb-2">Recent Auctions</Text>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-primary">Tomato</Text>
                        <Text className="text-[#447900]">Sold: 500kg</Text>
                        <Text className="text-xs text-[#7A9608]">₹24,500</Text>
                    </View>
                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-primary">Potato</Text>
                        <Text className="text-[#447900]">Sold: 280kg</Text>
                        <Text className="text-xs text-[#7A9608]">₹15,500</Text>
                    </View>
                    <Text className="text-xs text-[#80875c] mt-1">View auction details in Auctions tab.</Text>
                </View>

                {/* Quick Pending Orders */}
                <View className="mb-5">
                    <Text className="font-quicksand-bold text-[#576423] mb-2">Pending Orders</Text>
                    <View className="flex-row justify-between items-center py-2 border-b">
                        <Text className="text-primary">Order #13329</Text>
                        <Text className="text-xs text-[#F29F05]">Awaiting Shipment</Text>
                    </View>
                    <View className="flex-row justify-between items-center py-2">
                        <Text className="text-primary">Order #13318</Text>
                        <Text className="text-xs text-[#F29F05]">Processing</Text>
                    </View>
                </View>

                {/* Feedback */}
                <View className="mb-4">
                    <Text className="font-quicksand-bold text-[#576423] mb-2">Feedback</Text>
                    {[
                        { rating: 5, percent: 40 },
                        { rating: 4, percent: 30 },
                        { rating: 3, percent: 15 },
                        { rating: 2, percent: 10 },
                        { rating: 1, percent: 5 }
                    ].map((f, i) => (
                        <View key={i} className="flex-row items-center mb-2">
                            <Text className="w-8 text-[#444444] text-base">{f.rating}</Text>
                            <View className="flex-1 h-4 bg-[#EAF6BC] rounded-lg overflow-hidden">
                                <View style={{ width: `${f.percent}%` }} className="h-4 rounded-lg bg-primary" />
                            </View>
                            <Text className="ml-2 text-primary">{f.percent}%</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Modern Bottom Bar Navigation */}
            <View className="flex-row bg-[#F8FFDE] border-t border-[#EAF6BC] py-2 px-1 justify-between items-center">
                <Pressable className="items-center flex-1">
                    <Ionicons name="home" size={24} color="#7A9608" />
                    <Text className="text-xs mt-1 text-primary">Home</Text>
                </Pressable>
                <Pressable className="items-center flex-1">
                    <Ionicons name="analytics-outline" size={22} color="#7A9608" />
                    <Text className="text-xs mt-1 text-primary">Reports</Text>
                </Pressable>
                <Pressable className="items-center flex-1">
                    <Ionicons name="pricetag-outline" size={22} color="#7A9608" />
                    <Text className="text-xs mt-1 text-primary">Auctions</Text>
                </Pressable>
                <Pressable className="items-center flex-1">
                    <Ionicons name="list" size={22} color="#7A9608" />
                    <Text className="text-xs mt-1 text-primary">Orders</Text>
                </Pressable>
                <Pressable className="items-center flex-1">
                    <Ionicons name="notifications-outline" size={22} color="#7A9608" />
                    <Text className="text-xs mt-1 text-primary">Notification</Text>
                </Pressable>
                <Pressable className="items-center flex-1">
                    <Ionicons name="person-outline" size={22} color="#7A9608" />
                    <Text className="text-xs mt-1 text-primary">Profile</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}
