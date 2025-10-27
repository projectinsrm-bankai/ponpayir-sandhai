import BottomNav from "@/components/BottomNav";
import { auctionDB } from "@/lib/auctionDB";
import { useAuth } from "@/lib/authContext";
import { storageDB } from "@/lib/storageDB";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PRODUCTS = ["Tomato", "Potato", "Other"];

export default function AuctionEntry() {
  const { user, demoLogin } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [daysOld, setDaysOld] = useState("");
  const [quantityKg, setQuantityKg] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoLogin = async () => {
    const result = await demoLogin('farmer');
    if (result.success) {
      Alert.alert("Success", "Demo login successful! You can now create auctions.");
    } else {
      Alert.alert("Error", result.message);
    }
  };

  const pickImage = async () => {
    // Ask for permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickVideo = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    // For demo purposes, use a default farmer ID if no user is logged in
    const farmerId = user?.id || 'demo-farmer-1';

    // Validate required fields
    if (!daysOld || !quantityKg || !minimumPrice) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (isNaN(Number(daysOld)) || isNaN(Number(quantityKg)) || isNaN(Number(minimumPrice))) {
      Alert.alert("Error", "Please enter valid numbers for days old, quantity, and minimum price");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create auction data
      const auctionData = {
        farmerId: farmerId,
        productName: selectedProduct,
        daysOld: Number(daysOld),
        quantityKg: Number(quantityKg),
        minimumPricePerKg: Number(minimumPrice),
        deliveryAvailable,
        grade: "A+", // AI-generated grade placeholder
      };

      // Create auction
      const auction = auctionDB.createAuction(auctionData);

      // Store image if selected
      if (image) {
        const imageFile = storageDB.storeFile({
          fileName: `auction-${auction.auctionId}-image.jpg`,
          fileType: 'image',
          fileSize: 0, // We don't have actual file size in this demo
          uri: image,
          auctionId: auction.auctionId,
        });
        auction.imageUrl = imageFile.uri;
      }

      // Store video if selected
      if (video) {
        const videoFile = storageDB.storeFile({
          fileName: `auction-${auction.auctionId}-video.mp4`,
          fileType: 'video',
          fileSize: 0, // We don't have actual file size in this demo
          uri: video,
          auctionId: auction.auctionId,
        });
        auction.videoUrl = videoFile.uri;
      }

      Alert.alert(
        "Success!",
        `Auction created successfully!\nAuction ID: ${auction.auctionId}\nAuction starts in 2 hours`,
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setDaysOld("");
              setQuantityKg("");
              setMinimumPrice("");
              setImage(null);
              setVideo(null);
              setDeliveryAvailable(false);
              // Navigate to auction live page
              router.push("../(farmer)/auctionlive");
            }
          }
        ]
      );

    } catch (error) {
      console.error("Error creating auction:", error);
      Alert.alert("Error", "Failed to create auction. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <SafeAreaView className="flex-1 bg-primary-cream">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Back Navigation */}
        <Pressable className="mb-2">
          <Ionicons name="arrow-back-outline" size={28} color="#7A9608" />
        </Pressable>
        <Text className="text-4xl font-quicksand-bold text-primary mb-4">Auction Form</Text>

        {/* Demo Login Button */}
        {!user && (
          <Pressable
            className="bg-blue-500 px-4 py-2 rounded-lg mb-4"
            onPress={handleDemoLogin}
          >
            <Text className="text-white font-quicksand-bold text-center">
              Demo Login (Click to test)
            </Text>
          </Pressable>
        )}

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


        {/* Image Upload */}
        <View className="flex-row items-center mb-3 gap-x-3">
          <Pressable onPress={pickImage} className="flex-row items-center">
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 60, height: 60, borderRadius: 12, marginRight: 8 }}
              />
            ) : (
              <Image
                source={{ uri: "https://images.pexels.com/photos/13272119/pexels-photo-13272119.jpeg?auto=compress&w=100&h=100" }}
                style={{ width: 50, height: 40, borderRadius: 12, marginRight: 8 }}
              />
            )}
            <View>
              <Text className="text-sm font-quicksand-bold text-primary">
                {image ? "Image Selected" : "Upload clear image"}
              </Text>
              <Text className="text-xs text-[#80875c]">
                {image ? "Tap to change image" : "used for grading"}
              </Text>
            </View>
          </Pressable>

        </View>

        {/* Video Upload */}
        <View className="flex-row items-center mb-4 gap-x-3">
          <Pressable onPress={pickVideo} className="flex-row items-center">
            {video ? (
              <View className="flex-row items-center">
                <Ionicons name="checkmark-circle" size={28} color="#7A9608" style={{ marginRight: 8 }} />
                <View>
                  <Text className="text-sm font-quicksand-bold text-primary">Video Selected</Text>
                  <Text className="text-xs text-[#80875c]">Tap to change video</Text>
                </View>
              </View>
            ) : (
              <View className="flex-row items-center">
                <Ionicons name="videocam-outline" size={36} color="#7A9608" style={{ marginRight: 8 }} />
                <View>
                  <Text className="text-sm font-quicksand-bold text-primary">Upload product video</Text>
                  <Text className="text-xs text-[#80875c]">show freshness, quality</Text>
                </View>
              </View>
            )}
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
            value={daysOld}
            onChangeText={setDaysOld}
          />
          <TextInput
            className="border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent font-quicksand mb-2"
            placeholder="How Many Kgs is available for sales?"
            placeholderTextColor="#444444"
            keyboardType="number-pad"
            value={quantityKg}
            onChangeText={setQuantityKg}
          />
          <TextInput
            className="border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent font-quicksand mb-2"
            placeholder="What is the minimum price you want to set per kg"
            placeholderTextColor="#444444"
            keyboardType="number-pad"
            value={minimumPrice}
            onChangeText={setMinimumPrice}
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
      <Pressable
        className={`h-12 rounded-lg ${isSubmitting ? 'bg-gray-400' : 'bg-primary'} justify-center items-center mb-6`}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text className="text-white font-quicksand-bold text-base">
          {isSubmitting ? "Creating Auction..." : "Register for Auction"}
        </Text>
      </Pressable>
      {/* Bottom Nav Bar */}
      <BottomNav />
    </SafeAreaView>
  );
}