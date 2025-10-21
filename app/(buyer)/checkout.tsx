import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const PRODUCTS = [
  {
    id: "rice",
    title: "Organic Rice",
    weight: "1kg",
    price: 12,
    image: {
      uri: "https://cdn-icons-png.flaticon.com/512/7015/7015684.png",
    },
  },
  {
    id: "lentils",
    title: "Organic Lentils",
    weight: "1kg",
    price: 10,
    image: {
      uri: "https://cdn-icons-png.flaticon.com/512/7015/7015647.png",
    },
  },
  {
    id: "wheat",
    title: "Organic Wheat",
    weight: "1kg",
    price: 8,
    image: {
      uri: "https://cdn-icons-png.flaticon.com/512/7015/7015697.png",
    },
  },
];

export default function CheckoutScreen() {
  const [selectedPayment, setSelectedPayment] = useState("credit");
  const [accepted, setAccepted] = useState(false);

  const subtotal = PRODUCTS.reduce((s, p) => s + p.price, 0);
  const shipping = 5;
  const total = subtotal + shipping;

  return (
    <SafeAreaView className="flex-1 bg-primary-cream px-4">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center justify-between py-4">
        <TouchableOpacity>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/507/507257.png",
            }}
            style={{ width: 18, height: 18, tintColor: "#000" }}
          />
        </TouchableOpacity>
        <Text className="text-lg font-quicksand-bold text-dark-100">
          Checkout
        </Text>
        <View style={{ width: 18 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View className="bg-primary-cream rounded-xl p-4 shadow-md shadow-black/10 mb-4">
          <Text className="text-lg font-quicksand-bold mb-3 text-dark-100">
            Order Summary
          </Text>

          {PRODUCTS.map((p) => (
            <View
              key={p.id}
              className="flex flex-row items-center justify-between mb-3"
            >
              <View className="flex-row items-center gap-3">
                <Image
                  source={p.image}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: "#F8FFDE",
                  }}
                />
                <View>
                  <Text className="text-base font-quicksand-semibold text-dark-100">
                    {p.title}
                  </Text>
                  <Text className="text-sm text-gray-400">{p.weight}</Text>
                </View>
              </View>
              <Text className="text-base font-quicksand-semibold text-dark-100">
                ${p.price.toFixed(2)}
              </Text>
            </View>
          ))}

          <View className="border-t border-gray-100 mt-3 pt-3">
            <View className="flex flex-row justify-between mb-2">
              <Text className="text-base text-gray-400 font-quicksand-medium">
                Subtotal
              </Text>
              <Text className="text-base font-quicksand-semibold text-dark-100">
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            <View className="flex flex-row justify-between mb-2">
              <Text className="text-base text-gray-400 font-quicksand-medium">
                Shipping
              </Text>
              <Text className="text-base font-quicksand-semibold text-dark-100">
                ${shipping.toFixed(2)}
              </Text>
            </View>
            <View className="flex flex-row justify-between border-t border-gray-100 pt-3">
              <Text className="text-lg font-quicksand-bold text-dark-100">
                Total
              </Text>
              <Text className="text-lg font-quicksand-bold text-dark-100">
                ${total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Method */}
        <View className="bg-primary-cream rounded-xl p-4 shadow-md shadow-black/10 mb-4">
          <Text className="text-lg font-quicksand-bold mb-3 text-dark-100">
            Payment Method
          </Text>

          {[
            { id: "credit", label: "Credit Card" },
            { id: "debit", label: "Debit Card" },
            { id: "mobile", label: "Mobile Payment" },
          ].map((method) => {
            const isSelected = selectedPayment === method.id;
            return (
              <TouchableOpacity
                key={method.id}
                onPress={() => setSelectedPayment(method.id)}
                className="flex flex-row items-center justify-between py-3"
              >
                <View className="flex flex-row items-center gap-3">
                  <View
                    style={[
                      styles.radioOuter,
                      {
                        borderColor: isSelected ? "#7A9608" : "#CFCFCF",
                      },
                    ]}
                  >
                    {isSelected && <View style={styles.radioInner} />}
                  </View>
                  <Text className="text-base text-dark-100 font-quicksand-medium">
                    {method.label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Terms */}
          <TouchableOpacity
            onPress={() => setAccepted((prev) => !prev)}
            className="flex flex-row items-center mt-4 gap-3"
          >
            <View
              style={[
                styles.checkbox,
                accepted && {
                  backgroundColor: "#7A9608",
                  borderColor: "#7A9608",
                },
              ]}
            />
            <Text className="text-sm text-gray-400 font-quicksand-medium">
              Accept the terms and conditions
            </Text>
          </TouchableOpacity>

          {/* Proceed button */}
          <TouchableOpacity
            disabled={!accepted}
            className="mt-5"
            style={{
              backgroundColor: "#7A9608",
              borderRadius: 12,
              paddingVertical: 14,
              opacity: accepted ? 1 : 0.5,
            }}
          >
            <Text className="text-center text-white font-quicksand-bold text-base">
              Proceed To Payments
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7A9608",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#CFCFCF",
  },
});
