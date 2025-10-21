// components/ProductCard.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  title: string;
  farmer: string;
  price: string;
  image: { uri: string } | any;
  width: number;
};

export default function ProductCard({ title, farmer, price, image, width }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, { width }]}
    >
      <Image source={image} style={[styles.image, { width }]} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.farmer}>Farmer: {farmer}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  image: {
    height: undefined,
    aspectRatio: 1,
    resizeMode: "cover",
    borderRadius: 12,
  },
  info: {
    padding: 10,
    backgroundColor: "transparent",
  },
  title: {
    fontFamily: "Quicksand-SemiBold",
    color: "#1E1E1E",
    fontSize: 14,
    marginBottom: 6,
  },
  farmer: {
    fontFamily: "Quicksand-Regular",
    color: "#6B6B6B",
    fontSize: 12,
  },
  price: {
    fontFamily: "Quicksand-Medium",
    color: "#7A9608",
    marginTop: 8,
    fontSize: 12,
  },
});
