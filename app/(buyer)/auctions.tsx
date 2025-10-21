import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomNavBuyer from "@/components/BottomNavBuyer";
import {router} from "expo-router";

const product = {
  name: "Organic Tomatoes",
  farmer: "Rajesh",
  price: "$2.50/kg",
  freshness: "Fresh",
  place: "Trichy",
  video: true,
  img: "https://images.pexels.com/photos/13272119/pexels-photo-13272119.jpeg?auto=compress&w=600&h=400",
  desc: "A tomato is an edible, fleshy berry from the nightshade family of plants, native to western South America but now grown globally.",
  timeLeft: "2h"
};

const tabs = ["Description", "Place", "Video"];

export default function ProductDetail() {
  const activeTab = tabs[0]; // Set from state if needed

  return (
      <SafeAreaView className="flex-1 bg-primary-cream">
        <ScrollView contentContainerStyle={{ padding: 0 }}>
          {/* Header */}
          <View className="flex-row items-center px-4 py-3 bg-[#F8FFDE]">
            <Pressable>
              <Ionicons name="arrow-back-outline" size={28} color="#7A9608" />
            </Pressable>
            <Text className="text-xl font-quicksand-bold text-primary ml-3">Product Details</Text>
          </View>

          {/* Raised product image card */}
          <View style={{
            margin: 20, borderRadius: 22, overflow: "hidden",
            shadowColor: "#BCD657", shadowRadius: 14, elevation: 4
          }}>
            <Image
                source={{ uri: product.img }}
                style={{ width: "100%", height: 175 }}
                resizeMode="cover"
            />
            {/* Product Info Overlay */}
            <View style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              backgroundColor: "rgba(248,255,222,0.94)", padding: 18
            }}>
              <Text className="font-quicksand-bold text-primary text-lg">{product.name}</Text>
              <Text className="font-quicksand text-[#67671A] mb-1">Farmer: {product.farmer}</Text>
              <Text className="font-quicksand text-[#576423] mb-1">{product.price}</Text>
            </View>
          </View>

          {/* Segmented tabs */}
          <View className="flex-row justify-center items-center mb-2">
            {tabs.map((tab, idx) => (
                <Pressable
                    key={tab}
                    className={`px-5 py-2 mx-2 rounded-lg ${activeTab === tab ? "bg-[#7A9608]" : "bg-[#F8FFDE] border border-[#BCD657]"}`}
                    style={{ elevation: activeTab === tab ? 2 : 0 }}
                >
                  <Text className={`font-quicksand-bold ${activeTab === tab ? "text-white" : "text-[#7A9608]"}`}>{tab}</Text>
                </Pressable>
            ))}
          </View>

          {/* Description/Place/Video Panel */}
          <View className="px-7 py-5 rounded-xl bg-gradient-to-b from-[#EAF6BC] to-[#F8FFDE] shadow-sm mb-5 mt-1">
            {/* Tab-specific content; here, description */}
            <View className="flex-row items-center mb-3">
              <View className="bg-[#7A9608] rounded-full p-2 mr-3">
                <Ionicons name="checkmark" size={18} color="#fff" />
              </View>
              <Text className="font-quicksand-bold text-primary">Description</Text>
              <Text className="ml-2 text-xs text-[#B5B80A] font-quicksand">{product.timeLeft} left</Text>
            </View>
            <Text className="text-[#576423] font-quicksand" style={{ lineHeight: 22 }}>
              {product.desc}
            </Text>
          </View>

          {/* Entry Button */}
          <View className="px-8">
            <View className="border border-dashed border-[#BCD657] p-5 rounded-xl bg-[#F8FFDE] items-center mb-6">
              <Text className="font-quicksand-bold text-primary mb-2">Start Entry for this Auction</Text>
              <Pressable className="w-2/3 h-12 rounded-xl bg-[#7A9608] justify-center items-center shadow-md" style={{ elevation: 2 }} onPress={() => router.push("../auctionentry")}>
                <Text className="text-white font-quicksand-bold text-lg">Enter</Text>
              </Pressable>
            </View>
          </View>
          <View style={{ height: 24 }} />
        </ScrollView>
        <BottomNavBuyer />
      </SafeAreaView>
  );
}
