import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TextInput, Pressable, Image, Switch } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {router} from "expo-router";
import BottomNav from "@/components/BottomNav";
// import * as ImagePicker from 'expo-image-picker'; // Add for real upload logic

const PRODUCTS = ["Tomato", "Potato", "Other"];

export default function AuctionEntry() {
    const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [deliveryAvailable, setDeliveryAvailable] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {/* Back Navigation */}
                <Pressable className="mb-2">
                    <Ionicons name="arrow-back-outline" size={28} color="#7A9608" />
                </Pressable>
                <Text className="text-4xl font-quicksand-bold text-primary mb-4">Auction Form</Text>

                {/* Product Dropdown */}
                <View className="mb-3">
                    <Pressable
                        className="border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent"
                        onPress={() => setShowDropdown(!showDropdown)}
                    >
                        <Text className="font-quicksand">{selectedProduct}</Text>
                        <Ionicons name={showDropdown ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#7A9608" style={{ position: 'absolute', right: 10, top: 18 }} />
                    </Pressable>
                    {showDropdown && (
                        <View className="absolute left-0 right-0 mt-1 z-10 bg-white rounded-lg border border-[#BCD657]">
                            {PRODUCTS.map((name) => (
                                <Pressable
                                    key={name}
                                    className="px-4 py-3 border-b border-[#EAF6BC]"
                                    onPress={() => { setSelectedProduct(name); setShowDropdown(false); }}
                                >
                                    <Text className="font-quicksand text-primary">{name}</Text>
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>

                {/* Speech To Text Area */}
                <View className="border border-dashed border-[#444444] rounded-lg px-4 py-3 mb-3 bg-white flex-row gap-x-3 items-center">
                    <Pressable className="bg-[#CADB85] w-16 h-16 rounded-xl justify-center items-center mr-3">
                        <MaterialIcons name="keyboard-voice" size={28} color="#7A9608" />
                        <Text className="font-quicksand-bold text-[#7A9608] text-xs mt-1">Speech</Text>
                    </Pressable>
                    <View className="flex-1">
                        <TextInput
                            className="font-quicksand bg-transparent"
                            placeholder="Tap mic and speak about your product"
                            placeholderTextColor="#80875c"
                            multiline
                            style={{ minHeight: 46 }}
                        />
                    </View>
                </View>

                {/* Image Upload */}
                <View className="flex-row items-center mb-3 gap-x-3">
                    <Pressable /* onPress={pickImage} */ className="flex-row items-center">
                        <Image
                            source={{ uri: "https://images.pexels.com/photos/13272119/pexels-photo-13272119.jpeg?auto=compress&w=100&h=100" }}
                            style={{ width: 50, height: 40, borderRadius: 12, marginRight: 8 }}
                        />
                        <View>
                            <Text className="text-sm font-quicksand-bold text-primary">Upload clear image</Text>
                            <Text className="text-xs text-[#80875c]">used for grading</Text>
                        </View>
                    </Pressable>
                </View>

                {/* Video Upload */}
                <View className="flex-row items-center mb-4 gap-x-3">
                    <Pressable /* onPress={pickVideo} */ className="flex-row items-center">
                        <Ionicons name="videocam-outline" size={36} color="#7A9608" style={{ marginRight: 8 }} />
                        <View>
                            <Text className="text-sm font-quicksand-bold text-primary">Upload product video</Text>
                            <Text className="text-xs text-[#80875c]">show freshness, quality</Text>
                        </View>
                    </Pressable>
                </View>
                <Text className="text-2xl font-quicksand-bold text-primary mb-4">Product Details</Text>

                {/* Product Description */}
                <View className="mb-4">
                    <TextInput
                        className="border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent font-quicksand mb-2"
                        placeholder="How many days old is the product?"
                        placeholderTextColor="#444444"
                        keyboardType="number-pad"
                    />
                    <TextInput
                        className="border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent font-quicksand mb-2"
                        placeholder="How Many Kgs is available for sales?"
                        placeholderTextColor="#444444"
                        keyboardType="number-pad"
                    />
                    <TextInput
                        className="border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent font-quicksand mb-2"
                        placeholder="What is the minimum price you want to set per kg"
                        placeholderTextColor="#444444"
                        keyboardType="number-pad"
                    />
                    <View className="flex-row items-center">
                        <Text className="font-quicksand text-primary mr-3">Delivery Available?</Text>
                        <Switch
                            value={deliveryAvailable}
                            onValueChange={setDeliveryAvailable}
                            thumbColor={deliveryAvailable ? "#7A9608" : "#EAF6BC"}
                            trackColor={{ false: "#EAF6BC", true: "#BCD657" }}
                        />
                        <Text className="font-quicksand text-primary ml-2">{deliveryAvailable ? "Yes" : "No"}</Text>
                    </View>
                </View>

                {/* Grade and T&C + Submit */}
                <View className="border border-dashed border-[#444444] rounded-lg px-4 py-3 mb-3 bg-transparent items-center">
                    <Text className="font-quicksand-bold text-primary text-base">GRADE SET BY THE MODEL ITSELF</Text>
                </View>
                <View className="flex-row items-center mb-4 mt-1">
                    <Ionicons name="checkmark-circle" size={22} color="#7A9608" />
                    <Text className="ml-2 font-quicksand-bold text-primary">accept the terms and conditions</Text>
                </View>

            </ScrollView>
            <Pressable className="h-12 rounded-lg bg-primary justify-center items-center mb-6" onPress={() => router.push("../(farmer)/auctionlive")}>
                <Text className="text-white font-quicksand-bold text-base">Register for Auction</Text>
            </Pressable>
            {/* Bottom Nav Bar */}
            <BottomNav />
        </SafeAreaView>
    );
}
