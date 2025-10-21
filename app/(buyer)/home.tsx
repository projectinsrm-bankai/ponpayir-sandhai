// app/buyer/index.tsx
import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ProductCard from "../../components/ProductCard";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 16; // px-4 on each side
const GAP = 12;
const NUM_COLS = 2;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - GAP * (NUM_COLS - 1)) / NUM_COLS;

type Product = {
  id: string;
  title: string;
  farmer: string;
  price: string;
  image: { uri: string };
};

const PRODUCTS = [
  {
    id: "1",
    title: "Organic Tomatoes",
    farmer: "Rajesh",
    price: "$2.50/kg",
    image: { uri: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=60" },
  },
  {
    id: "2",
    title: "Potato",
    farmer: "Priya",
    price: "$1.80/kg",
    image: { uri: "https://images.unsplash.com/photo-1542444459-db8e8b3d6b5b?w=800&q=60" },
  },
  {
    id: "3",
    title: "Carrot",
    farmer: "Suresh",
    price: "$3.20/kg",
    image: { uri: "https://images.unsplash.com/photo-1611078483757-8b9b0b1f63bd?w=800&q=60" },
  },
  {
    id: "4",
    title: "Beetroot",
    farmer: "Meena",
    price: "$4.50/500g",
    image: { uri: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=800&q=60" },
  },
];


export default function BuyerHome() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Category");
  const [price, setPrice] = useState("Price");
  const [freshness, setFreshness] = useState("Freshness");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.farmer.toLowerCase().includes(q) ||
        p.price.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      {/* Header */}
      <View style={styles.headerWrap}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn}>
            <Text style={styles.backArrow}>◀</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>BUYER</Text>

          <TouchableOpacity style={styles.infoBtn}>
            <Text style={styles.infoText}>i</Text>
          </TouchableOpacity>
        </View>

        {/* Filters */}
        <View style={styles.filtersRow}>
          <TouchableOpacity style={styles.filterPill}><Text style={styles.filterText}>{category} ▾</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}><Text style={styles.filterText}>{price} ▾</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}><Text style={styles.filterText}>{freshness} ▾</Text></TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <TextInput
            placeholder="search products"
            placeholderTextColor="#9A9A9A"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Text style={{ fontSize: 16 }}>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Grid */}
      <View style={styles.gridWrap}>
        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          numColumns={NUM_COLS}
          columnWrapperStyle={{ justifyContent: "space-between", marginBottom: GAP }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <ProductCard
              title={item.title}
              farmer={item.farmer}
              price={item.price}
              image={item.image}
              width={CARD_WIDTH}
            />
          )}
        />
      </View>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navLabelActive}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔨</Text>
          <Text style={styles.navLabel}>Auctions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>📦</Text>
          <Text style={styles.navLabel}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🔔</Text>
          <Text style={styles.navLabel}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8FFDE", // primary.cream from your tailwind config
  },
  headerWrap: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 12,
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 16,
    color: "#1E1E1E",
  },
  headerTitle: {
    fontFamily: "Quicksand-Bold",
    color: "#7A96008A".slice(0, 7), // fallback in case, but we'll use explicit color below

    fontSize: 16,
    letterSpacing: 0.5,
  },
  infoBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#1E1E1E",
  },

  filtersRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  filterPill: {
    backgroundColor: "#F8FFDE",
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#DBE0E5",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    elevation: 1,
  },
  filterText: {
    fontFamily: "Quicksand-Medium",
    color: "#5C5C5C",
    fontSize: 13,
  },

  searchWrap: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D4D5D6",
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Quicksand-Regular",
    fontSize: 14,
    color: "#222",
    paddingVertical: Platform.OS === "ios" ? 8 : 0,
  },
  searchIcon: {
    width: 32,
    alignItems: "center",
  },

  gridWrap: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_PADDING,
    marginTop: 12,
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    paddingVertical: 10,
    paddingHorizontal: HORIZONTAL_PADDING,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navItemActive: {
    alignItems: "center",
    flex: 1,
  },
  navIcon: {
    fontSize: 18,
  },
  navLabel: {
    fontFamily: "Quicksand-Regular",
    fontSize: 11,
    color: "#666",
    marginTop: 4,
  },
  navLabelActive: {
    fontFamily: "Quicksand-Medium",
    fontSize: 11,
    color: "#7A9608",
    marginTop: 4,
  },
});
