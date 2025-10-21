// app/auction/auction.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const PADDING = 12;
const IMAGE_SIZE = width - PADDING * 2; // full-width square image with side padding

export default function AuctionDetail() {
  const [activeTab, setActiveTab] = useState<"Description" | "Place" | "Video">("Description");
  const [activeNav, setActiveNav] = useState<"home" | "auctions" | "orders" | "notify" | "profile">(
    "auctions"
  );

  const product = {
    title: "Organic Tomatoes",
    farmer: "Rajesh",
    price: "$2.50/kg",
    image: {
      // high-res Unsplash image — reliable
      uri: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=1200&q=80&auto=format&fit=crop",
    },
    description:
      "A tomato is an edible, fleshy berry from the nightshade family of plants, native to western South America but now grown globally. Juicy and bright — perfect for fresh salads.",
    timeLeft: "2h",
  };

  // icon URIs (flaticon / simple png) — used for bottom nav
  const ICONS = {
    back: "https://cdn-icons-png.flaticon.com/512/271/271220.png",
    home: "https://cdn-icons-png.flaticon.com/512/1946/1946436.png",
    auctions: "https://cdn-icons-png.flaticon.com/512/2963/2963387.png",
    orders: "https://cdn-icons-png.flaticon.com/512/833/833524.png",
    notify: "https://cdn-icons-png.flaticon.com/512/1827/1827345.png",
    profile: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* Top small back arrow area */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn}>
          <Image source={{ uri: ICONS.back }} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* Full-width image */}
        <View style={styles.imageWrap}>
          <Image
            source={product.image}
            style={styles.productImage}
            // explicit width and height to prevent collapse on all platforms
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
          />
        </View>

        {/* Info area */}
        <View style={styles.infoWrap}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.farmer}>Farmer: {product.farmer}</Text>
          <Text style={styles.price}>{product.price}</Text>

          {/* Pills row */}
          <View style={styles.pillRow}>
            {(["Description", "Place", "Video"] as const).map((t) => {
              const isActive = activeTab === t;
              return (
                <TouchableOpacity
                  key={t}
                  activeOpacity={0.85}
                  onPress={() => setActiveTab(t)}
                  style={[styles.pill, isActive && styles.pillActive]}
                >
                  <Text style={[styles.pillText, isActive && styles.pillTextActive]}>
                    {t} ▾
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Description dotted card */}
          <View style={styles.descCard}>
            <View style={styles.descHeader}>
              <View style={styles.descIconCircle}>
                <Text style={styles.checkMark}>✔</Text>
              </View>
              <Text style={styles.descHeaderText}>Description</Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.timeText}>{product.timeLeft}</Text>
            </View>

            <Text style={styles.descText}>{product.description}</Text>
          </View>

          {/* CTA dotted outer + inner green box */}
          <View style={styles.ctaOuter}>
            <View style={styles.ctaInner}>
              <Text style={styles.ctaTitle}>Start Entry for this Auction</Text>

              <TouchableOpacity style={styles.enterBtn} activeOpacity={0.9}>
                <Text style={styles.enterBtnText}>Enter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom nav bar */}
      <View style={styles.bottomNav}>
        <NavItem
          iconUri={ICONS.home}
          label="Home"
          active={activeNav === "home"}
          onPress={() => setActiveNav("home")}
        />
        <NavItem
          iconUri={ICONS.auctions}
          label="Auctions"
          active={activeNav === "auctions"}
          onPress={() => setActiveNav("auctions")}
        />
        <NavItem
          iconUri={ICONS.orders}
          label="Orders"
          active={activeNav === "orders"}
          onPress={() => setActiveNav("orders")}
        />
        <NavItem
          iconUri={ICONS.notify}
          label="Notification"
          active={activeNav === "notify"}
          onPress={() => setActiveNav("notify")}
        />
        <NavItem
          iconUri={ICONS.profile}
          label="Profile"
          active={activeNav === "profile"}
          onPress={() => setActiveNav("profile")}
        />
      </View>
    </SafeAreaView>
  );
}

function NavItem({
  iconUri,
  label,
  active,
  onPress,
}: {
  iconUri: string;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.navItem}>
      <View>{active ? <View style={styles.activePill}><Image source={{ uri: iconUri }} style={styles.activeIcon} /></View> : <Image source={{ uri: iconUri }} style={styles.icon} />}</View>
      <Text style={[styles.navLabel, active && styles.navLabelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

/* ---- styles ---- */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8FFDE", // primary cream
  },

  topBar: {
    height: 48,
    justifyContent: "center",
    paddingHorizontal: PADDING,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backIcon: {
    width: 16,
    height: 16,
    tintColor: "#17300b",
    resizeMode: "contain",
  },

  imageWrap: {
    paddingHorizontal: PADDING,
    paddingTop: 6,
  },
  productImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    resizeMode: "cover",
    backgroundColor: "#eee",
  },

  infoWrap: {
    paddingHorizontal: 14,
    paddingTop: 12,
  },

  title: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 15,
    color: "#1E1E1E",
    marginBottom: 6,
  },
  farmer: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
    color: "#6B6B6B",
  },
  price: {
    fontFamily: "Quicksand-Medium",
    color: "#7A9608",
    marginTop: 8,
  },

  pillRow: {
    flexDirection: "row",
    marginTop: 14,
    gap: 8,
  },
  pill: {
    borderWidth: 1,
    borderColor: "#D4D5D6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#F8FFDE",
  },
  pillActive: {
    backgroundColor: "#EAF6BC",
    borderColor: "#D5E8A8",
  },
  pillText: {
    fontFamily: "Quicksand-Medium",
    fontSize: 13,
    color: "#222",
  },
  pillTextActive: {
    color: "#7A9608",
  },

  descCard: {
    marginTop: 14,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D4D5D6",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 12,
  },
  descHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  descIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EAF6BC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#D5E8A8",
  },
  checkMark: {
    color: "#7A9608",
  },
  descHeaderText: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 13,
    color: "#1E1E1E",
  },
  timeText: {
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
    color: "#7A9608",
  },
  descText: {
    fontFamily: "Quicksand-Regular",
    fontSize: 13,
    color: "#333",
    lineHeight: 18,
  },

  ctaOuter: {
    marginTop: 18,
    marginHorizontal: 2,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D4D5D6",
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#F8FFDE",
  },
  ctaInner: {
    backgroundColor: "#F3F8D8",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  ctaTitle: {
    fontFamily: "Quicksand-Medium",
    color: "#1E1E1E",
    fontSize: 14,
    marginBottom: 12,
  },
  enterBtn: {
    width: 120,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#7A9608",
    alignItems: "center",
    justifyContent: "center",
  },
  enterBtnText: {
    color: "#fff",
    fontFamily: "Quicksand-Bold",
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 78 + (Platform.OS === "ios" ? 6 : 0),
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    paddingHorizontal: 12,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  navItem: {
    flex: 1,
    alignItems: "center",
  },

  activePill: {
    width: 56,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EAF6BC",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D5E8A8",
    marginBottom: 6,
  },

  activeIcon: {
    width: 20,
    height: 20,
    tintColor: "#7A9608",
    resizeMode: "contain",
  },

  icon: {
    width: 20,
    height: 20,
    tintColor: "#8A8A8A",
    resizeMode: "contain",
    marginBottom: 6,
  },

  navLabel: {
    fontFamily: "Quicksand-Regular",
    fontSize: 11,
    color: "#666",
  },
  navLabelActive: {
    fontFamily: "Quicksand-Medium",
    color: "#7A9608",
  },
});
