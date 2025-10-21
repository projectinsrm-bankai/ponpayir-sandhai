import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, Pressable, TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import BottomNavBuyer from "@/components/BottomNavBuyer";
import {router} from "expo-router";

const auctionInfo = {
  product: "Tomato",
  desc: "A tomato is an edible, fleshy berry from the nightshade family of plants, native to western South America but now grown globally.",
  basePrice: 1200,
  totalAvailable: 500,
  isLive: true,
};

const bids = [
  {
    user: "You",
    price: 1500,
    weight: 250,
    time: "10:30 AM",
    avatar: "https://randomuser.me/api/portraits/men/30.jpg"
  },
  {
    user: "Arun",
    price: 1400,
    weight: 250,
    time: "10:25 AM",
    avatar: "https://randomuser.me/api/portraits/men/35.jpg"
  },
];

export default function AuctionPlatform() {
  const [showInfo, setShowInfo] = useState(false);

  return (
      <SafeAreaView className="flex-1 bg-primary-cream">
        <ScrollView contentContainerStyle={{ paddingBottom: 18 }}>
          {/* Action Header */}
          <View className="flex-row justify-between items-center px-4 py-3 bg-[#F8FFDE] rounded-b-3xl shadow-sm">
            <Pressable>
              <Ionicons name="arrow-back-outline" size={28} color="#7A9608" />
            </Pressable>
            <Text className="font-quicksand-bold text-lg text-primary">Auction Entry</Text>
            <View className="flex-row items-center">
              <View className="w-3 h-3 rounded-full bg-red-500 mr-1 animate-pulse" />
              <Text className="text-xs font-quicksand-bold text-red-500">Live</Text>
            </View>
          </View>

          {/* Product Box */}
          <View className="mx-4 my-4 rounded-xl bg-gradient-to-b from-[#EAF6BC] to-[#F8FFDE] shadow-md p-5">
            <Text className="font-quicksand-bold text-primary mb-2">{auctionInfo.product}</Text>
            <Text className="text-[#7A9608] font-quicksand mb-2">{auctionInfo.desc}</Text>
            <View className="flex-row justify-between items-center mt-1 p-2 rounded-lg border border-dashed border-[#BCD657] bg-white shadow-sm">
              <View>
                <Text className="text-xs text-gray-400">Base Price</Text>
                <Text className="font-quicksand-bold text-lg text-primary">₹{auctionInfo.basePrice}</Text>
              </View>
              <View>
                <Text className="text-xs text-gray-400">Total Available</Text>
                <Text className="font-quicksand-bold text-lg text-primary">kg {auctionInfo.totalAvailable}</Text>
              </View>
            </View>
          </View>

          {/* Bid Section Title with Info popup */}
          <View className="flex-row items-center justify-between px-5 mt-3">
            <Text className="font-quicksand-bold text-[18px] text-primary">Bid</Text>
            <Pressable onPress={() => setShowInfo(true)}>
              <Ionicons name="help-circle-outline" size={22} color="#7A9608" />
            </Pressable>
          </View>

          {/* Bids List */}
          <View className="px-5 mt-2">
            {bids.map((b, idx) => (
                <View key={b.user + idx} className="flex-row items-center mb-3 bg-[#F8FFDE] rounded-xl p-3 shadow" style={{ elevation: 2 }}>
                  <Image
                      source={{ uri: b.avatar }}
                      style={{ width: 48, height: 48, borderRadius: 14, marginRight: 12, backgroundColor: "#eee" }}
                  />
                  <View className="flex-1">
                    <Text className="font-quicksand-bold text-primary text-lg">{b.user}</Text>
                    <Text className="font-quicksand-bold text-[#7A9608] text-base">₹{b.price}</Text>
                    <Text className="text-xs text-[#80875c]">{b.weight} kg</Text>
                    <Text className="text-xs text-[#bababa]">{b.time}</Text>
                  </View>
                </View>
            ))}
          </View>

          {/* Bid Entry Fields */}
          <View className="flex-row gap-x-4 px-5 mt-1 mb-3">
            <TextInput
                className="flex-1 border border-dashed border-[#7A9608] rounded-xl px-4 py-3 bg-white font-quicksand text-primary text-base"
                placeholder="Enter your price"
                placeholderTextColor="#7A9608"
                keyboardType="numeric"
            />
            <TextInput
                className="flex-1 border border-dashed border-[#7A9608] rounded-xl px-4 py-3 bg-white font-quicksand text-primary text-base"
                placeholder="Weight needed"
                placeholderTextColor="#7A9608"
                keyboardType="numeric"
            />
          </View>

          {/* Animated Add Bid Button */}
          <View className="px-5 mb-8">
            <Pressable className="w-full h-12 rounded-xl bg-[#B5B80A] justify-center items-center shadow-md" style={{ elevation: 2 }}>
              <Text className="text-white font-quicksand-bold text-lg tracking-wide">Add Auction BID</Text>
            </Pressable>
          </View>

        </ScrollView>
        <View className="px-5 mb-8">
          <Pressable className="w-full h-12 rounded-xl bg-[#B5B80A] justify-center items-center shadow-md" style={{ elevation: 2 }} onPress={() => router.push("../(buyer)/checkout")}>
            <Text className="text-white font-quicksand-bold text-lg tracking-wide">Auction Completed</Text>
          </Pressable>
        </View>
        {/* Knapsack Information Popup */}
        <Modal visible={showInfo} transparent animationType="fade" onRequestClose={() => setShowInfo(false)}>
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

        <BottomNavBuyer />
      </SafeAreaView>
  );
}
