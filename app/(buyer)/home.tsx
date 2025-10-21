import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBuyer from "@/components/BottomNavBuyer";
import {router} from "expo-router";

const filters = [
  { name: "Category", value: "All" },
  { name: "Price", value: "Any" },
  { name: "Freshness", value: "All" }
];

const products = [
  {
    name: "Organic Tomatoes",
    farmer: "Rajesh",
    price: "$2.50/kg",
    freshness: "Fresh",
    category: "Vegetable",
    img: "https://images.pexels.com/photos/13272119/pexels-photo-13272119.jpeg?auto=compress&w=200&h=200"
  },
  {
    name: "Potato",
    farmer: "Priya",
    price: "$1.80/kg",
    freshness: "Normal",
    category: "Vegetable",
    img: "https://images.pexels.com/photos/2094122/pexels-photo-2094122.jpeg?auto=compress&w=200&h=200"
  },
  {
    name: "Carrot",
    farmer: "Suresh",
    price: "$3.20/kg",
    freshness: "Fresh",
    category: "Vegetable",
    img: "https://images.pexels.com/photos/65174/pexels-photo-65174.jpeg?auto=compress&w=200&h=200"
  },
  {
    name: "Betroot",
    farmer: "Meena",
    price: "$4.50/500g",
    freshness: "Organic",
    category: "Vegetable",
    img: "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg?auto=compress&w=200&h=200"
  },
];

export default function BuyerHome() {
  return (
      <SafeAreaView className="flex-1 bg-primary-cream">
        <ScrollView contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 14 }}>
          {/* Title and Avatar */}
          <View className="flex-row items-center justify-center mb-2 mt-1">
            <Ionicons name="person-circle" size={30} color="#B5B80A" style={{ marginRight: 10 }} />
            <Text className="text-xl font-quicksand-bold text-primary">BUYER</Text>
          </View>

          {/* Filter Row */}
          <View className="flex-row justify-between mb-3">
            {filters.map((f, idx) => (
                <Pressable
                    key={f.name}
                    className="flex-row items-center bg-[#F8FFDE] border border-[#BCD657] rounded-lg px-3 py-2"
                    style={{ flex: 1, marginRight: idx < filters.length - 1 ? 10 : 0, elevation: 2 }}
                >
                  <Text className="font-quicksand-bold text-primary">{f.name}</Text>
                  <Ionicons name="chevron-down-outline" size={16} color="#7A9608" style={{ marginLeft: 4 }} />
                </Pressable>
            ))}
          </View>

          {/* Search Bar */}
          <TextInput
              className="border border-dashed border-[#7A9608] rounded-xl px-5 py-3 mb-4 text-primary font-quicksand bg-white shadow-sm"
              placeholder="search products"
              placeholderTextColor="#7A9608"
          />

          {/* Product grid with overlays/tags */}
          <View className="flex-row flex-wrap -mx-2 mb-8">
            {products.map((prod, idx) => (
                <Pressable
                    key={prod.name + idx}
                    className="bg-white m-2 p-2 rounded-2xl shadow-md"
                    style={{
                      width: '45%',
                      elevation: 3,
                      shadowColor: "#BCD657",
                      shadowRadius: 16,
                    }}
                    onPress={() => router.push("../(buyer)/auctions")}
                >
                  {/* Image container */}
                  <View style={{ position: "relative", marginBottom: 8 }}>
                    <Image
                        source={{ uri: prod.img }}
                        style={{ width: "100%", height: 110, borderRadius: 18 }}
                        resizeMode="cover"
                    />
                    {/* Tags: freshness and category */}
                    <View style={{
                      position: "absolute", left: 8, top: 8,
                      backgroundColor: "#BCD657",
                      borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2,
                    }}>
                      <Text className="text-xs font-quicksand-bold text-white">{prod.freshness}</Text>
                    </View>
                    <View style={{
                      position: "absolute", right: 8, top: 8,
                      backgroundColor: "#7A9608",
                      borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2,
                    }}>
                      <Text className="text-xs font-quicksand-bold text-white">{prod.category}</Text>
                    </View>
                  </View>
                  {/* Main info */}
                  <Text className="font-quicksand-bold text-primary text-base mb-1">{prod.name}</Text>
                  <Text className="font-quicksand text-[#86865C]">Farmer: {prod.farmer}</Text>
                  <Text className="font-quicksand-bold text-[#BAA034] mt-1">{prod.price}</Text>
                </Pressable>
            ))}
          </View>
          <View style={{ height: 24 }} />
        </ScrollView>
        <BottomNavBuyer />
      </SafeAreaView>
  );
}
