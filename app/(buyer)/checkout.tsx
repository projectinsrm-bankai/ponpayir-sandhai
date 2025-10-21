import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {router} from "expo-router";

const items = [
  {
    name: "Organic Rice",
    img: "https://images.pexels.com/photos/41957/rice-bowl-white-ceramic-41957.jpeg?auto=compress&w=80",
    qty: "1kg"
  },
  {
    name: "Organic Lentils",
    img: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=80",
    qty: "1kg"
  },
  {
    name: "Organic Wheat",
    img: "https://images.pexels.com/photos/221361/pexels-photo-221361.jpeg?auto=compress&w=80",
    qty: "1kg"
  },
];

const subtotal = 30.00;
const shipping = 5.00;
const total = subtotal + shipping;
const paymentOptions = ["Credit Card (Gateway)", "Debit Card (Gateway)", "Mobile Payment (Gateway)"];

export default function CheckoutPage() {
  const [selected, setSelected] = useState(0);
  const [agreed, setAgreed] = useState(false);

  return (
      <SafeAreaView className="flex-1 bg-primary-cream">
        <ScrollView contentContainerStyle={{ padding: 18 }}>
          {/* Header */}
          <View className="flex-row items-center mb-2">
            <Pressable>
              <Ionicons name="arrow-back-outline" size={28} color="#7A9608" />
            </Pressable>
            <Text className="mx-auto font-quicksand-bold text-xl text-[#222]">Checkout</Text>
          </View>
          <View className="h-1 bg-[#BCD657] rounded-xl mb-4" />

          {/* Order Summary */}
          <View className="mb-4">
            <Text className="font-quicksand-bold text-lg mb-2 text-primary">Order Summary</Text>
            {items.map((item, i) => (
                <View key={item.name} className="flex-row items-center mb-2">
                  <Image
                      source={{ uri: item.img }}
                      style={{ width: 38, height: 38, borderRadius: 10, marginRight: 10 }}
                  />
                  <View>
                    <Text className="font-quicksand-bold text-primary">{item.name}</Text>
                    <Text className="font-quicksand text-[#576423]">{item.qty}</Text>
                  </View>
                </View>
            ))}
            <View className="mt-2 flex-row justify-between">
              <Text className="text-[#7A9608] font-quicksand-bold">Subtotal</Text>
              <Text className="text-[#606918] font-quicksand-bold">${subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-[#7A9608] font-quicksand-bold">Shipping</Text>
              <Text className="text-[#606918] font-quicksand-bold">${shipping.toFixed(2)}</Text>
            </View>
            <View className="border border-dashed border-[#7A9608] rounded-xl flex-row justify-between mt-2 px-2 py-2 bg-[#F8FFDE]">
              <Text className="font-quicksand-bold text-[#7A9608]">Total</Text>
              <Text className="font-quicksand-bold text-primary">${total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Payment Method (just selector, not entry) */}
          <View className="mb-4">
            <Text className="font-quicksand-bold text-lg mb-2 text-primary">Payment Method</Text>
            {paymentOptions.map((option, idx) => (
                <Pressable
                    key={option}
                    onPress={() => setSelected(idx)}
                    className={`flex-row items-center justify-between px-4 py-3 mb-2 rounded-xl border ${
                        selected === idx
                            ? "border-[#7A9608] bg-[#EAF6BC]"
                            : "border-[#BCD657] bg-white"
                    }`}
                    style={{ elevation: selected === idx ? 2 : 0 }}
                >
                  <Text className={`font-quicksand-bold ${selected === idx ? "text-[#7A9608]" : "text-primary"}`}>{option}</Text>
                  {selected === idx ? (
                      <Ionicons name="radio-button-on" size={22} color="#7A9608" />
                  ) : (
                      <Ionicons name="radio-button-off" size={22} color="#BCD657" />
                  )}
                </Pressable>
            ))}
          </View>

          {/* Terms & Conditions */}
          <View className="flex-row items-center mb-5 mt-3">
            <Pressable onPress={() => setAgreed(!agreed)} className="mr-2">
              <Ionicons
                  name={agreed ? "checkmark-circle" : "ellipse-outline"}
                  size={22}
                  color={agreed ? "#7A9608" : "#BCD657"}
              />
            </Pressable>
            <Text className="font-quicksand text-[#444444]">Accept the terms and conditions</Text>
          </View>

          {/* Proceed Button */}
          <Pressable
              disabled={!agreed}
              className={`h-12 rounded-xl ${agreed ? "bg-[#B5B80A]" : "bg-[#F7F3E6]"} justify-center items-center`}
              onPress={() => router.push("../(buyer)/payment-success")}
              style={{ elevation: 3 }}

          >
            <Text className={`${agreed ? "text-white" : "text-[#7A9608]"} font-quicksand-bold text-lg`}>Proceed To Payment</Text>
          </Pressable>

          <View style={{ height: 28 }} />
        </ScrollView>
      </SafeAreaView>
  );
}
