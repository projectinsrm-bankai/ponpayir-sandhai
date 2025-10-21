import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function AuctionEntry() {
  const [showInfo, setShowInfo] = useState(false);
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [activeTab, setActiveTab] = useState("auctions");

  const product = {
    title: "Auction Entry",
    desc: "A tomato is an edible, fleshy berry from the nightshade family of plants, native to western South America but now grown globally.",
    basePrice: "₹1,200",
    total: "kg 500",
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.title}</Text>
        <View style={styles.liveWrap}>
          <View style={styles.redDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descBox}>
        <Text style={styles.descText}>{product.desc}</Text>
      </View>

      {/* Base Price */}
      <View style={styles.cardRow}>
        <View style={styles.dottedCard}>
          <Text style={styles.cardLabel}>Base Price</Text>
          <Text style={styles.cardValue}>{product.basePrice}</Text>
        </View>
        <View style={styles.dottedCard}>
          <Text style={styles.cardLabel}>Total available</Text>
          <Text style={styles.cardValue}>{product.total}</Text>
        </View>
      </View>

      {/* Bid Header */}
      <View style={styles.bidHeader}>
        <Text style={styles.bidTitle}>Bid</Text>
        <TouchableOpacity onPress={() => setShowInfo(!showInfo)}>
          <Text style={styles.infoIcon}>ⓘ</Text>
        </TouchableOpacity>
      </View>

      {/* Info Box */}
      {showInfo && (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            The app uses the knapsack approach to help the farmer pick bidders
            who offer the highest total profit without exceeding the allowed
            weight or capacity. Each bid has a{" "}
            <Text style={styles.highlight}>weight (quantity)</Text> and a{" "}
            <Text style={styles.highlight}>value (profit)</Text>, and the system
            selects the best combination of bids that maximizes earnings within
            the limit.
          </Text>
        </View>
      )}

      {/* Scrollable Bid List */}
      <ScrollView
        style={styles.bidScroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >
        <BidItem
          name="You"
          price="₹1,500"
          qty="250 kg"
          time="10:30 AM"
          avatar="https://randomuser.me/api/portraits/men/42.jpg"
        />
        <BidItem
          name="Arun"
          price="₹1,400"
          qty="250 kg"
          time="10:25 AM"
          avatar="https://randomuser.me/api/portraits/men/44.jpg"
        />
        <BidItem
          name="Kiran"
          price="₹1,350"
          qty="300 kg"
          time="10:20 AM"
          avatar="https://randomuser.me/api/portraits/men/50.jpg"
        />
        <BidItem
          name="Suresh"
          price="₹1,300"
          qty="200 kg"
          time="10:15 AM"
          avatar="https://randomuser.me/api/portraits/men/38.jpg"
        />
      </ScrollView>

      {/* Input Fields */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter your price"
          placeholderTextColor="#888"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Weight needed"
          placeholderTextColor="#888"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
      </View>

      {/* Fixed Button */}
      <View style={styles.fixedButtonWrap}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Add Auction BID</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <NavItem
          label="Home"
          icon="https://cdn-icons-png.flaticon.com/512/1946/1946436.png"
          active={activeTab === "home"}
          onPress={() => setActiveTab("home")}
        />
        <NavItem
          label="Auctions"
          icon="https://cdn-icons-png.flaticon.com/512/2963/2963387.png"
          active={activeTab === "auctions"}
          onPress={() => setActiveTab("auctions")}
        />
        <NavItem
          label="Orders"
          icon="https://cdn-icons-png.flaticon.com/512/833/833524.png"
          active={activeTab === "orders"}
          onPress={() => setActiveTab("orders")}
        />
        <NavItem
          label="Notification"
          icon="https://cdn-icons-png.flaticon.com/512/1827/1827345.png"
          active={activeTab === "notify"}
          onPress={() => setActiveTab("notify")}
        />
        <NavItem
          label="Profile"
          icon="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
          active={activeTab === "profile"}
          onPress={() => setActiveTab("profile")}
        />
      </View>
    </SafeAreaView>
  );
}

/* Bid Card */
function BidItem({ name, price, qty, time, avatar }) {
  return (
    <View style={styles.bidCard}>
      <View>
        <Text style={styles.bidName}>{name}</Text>
        <Text style={styles.bidPrice}>{price}</Text>
        <Text style={styles.bidQty}>{qty}</Text>
        <Text style={styles.bidTime}>{time}</Text>
      </View>
      <Image source={{ uri: avatar }} style={styles.avatar} />
    </View>
  );
}

/* Nav Item */
function NavItem({ label, icon, active, onPress }) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      {active ? (
        <View style={styles.activePill}>
          <Image source={{ uri: icon }} style={[styles.navIcon, { tintColor: "#7A9608" }]} />
        </View>
      ) : (
        <Image source={{ uri: icon }} style={styles.navIcon} />
      )}
      <Text style={[styles.navText, active && { color: "#7A9608", fontFamily: "Quicksand-Medium" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* Styles */
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8FFDE",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginTop: 10,
  },
  backArrow: {
    fontSize: 16,
    color: "#1E1E1E",
  },
  headerTitle: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 16,
    color: "#1E1E1E",
  },
  liveWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  redDot: {
    width: 8,
    height: 8,
    backgroundColor: "red",
    borderRadius: 5,
    marginRight: 5,
  },
  liveText: {
    color: "#6B6B6B",
    fontFamily: "Quicksand-Regular",
    fontSize: 12,
  },
  descBox: {
    backgroundColor: "#EAF6BC",
    marginHorizontal: 14,
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
  },
  descText: {
    fontFamily: "Quicksand-Regular",
    color: "#333",
    fontSize: 13,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginTop: 12,
  },
  dottedCard: {
    flex: 1,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D4D5D6",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 4,
  },
  cardLabel: {
    fontFamily: "Quicksand-Regular",
    color: "#6B6B6B",
    fontSize: 13,
  },
  cardValue: {
    fontFamily: "Quicksand-Bold",
    color: "#1E1E1E",
    fontSize: 14,
    marginTop: 5,
  },
  bidHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 14,
    marginTop: 20,
  },
  bidTitle: {
    fontFamily: "Quicksand-SemiBold",
    fontSize: 15,
    color: "#1E1E1E",
  },
  infoIcon: {
    fontSize: 18,
    color: "#1E1E1E",
  },
  infoBox: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D4D5D6",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 14,
    marginTop: 10,
    padding: 10,
  },
  infoText: {
    fontFamily: "Quicksand-Regular",
    color: "#333",
    fontSize: 13,
    lineHeight: 18,
  },
  highlight: {
    color: "#7A9608",
    fontFamily: "Quicksand-Medium",
  },
  bidScroll: {
    marginHorizontal: 14,
    marginTop: 8,
  },
  bidCard: {
    backgroundColor: "#EAF6BC",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bidName: {
    fontFamily: "Quicksand-Bold",
    color: "#1E1E1E",
    fontSize: 14,
  },
  bidPrice: {
    fontFamily: "Quicksand-Bold",
    color: "#1E1E1E",
    marginTop: 4,
  },
  bidQty: {
    fontFamily: "Quicksand-Regular",
    color: "#6B6B6B",
    fontSize: 13,
    marginTop: 2,
  },
  bidTime: {
    fontFamily: "Quicksand-Regular",
    color: "#7A9608",
    fontSize: 12,
    marginTop: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 14,
    marginBottom: 68,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginHorizontal: 4,
    paddingHorizontal: 10,
    fontFamily: "Quicksand-Regular",
  },
  fixedButtonWrap: {
    position: "absolute",
    bottom: 80,
    left: 14,
    right: 14,
  },
  btn: {
    backgroundColor: "#7A9608",
    borderRadius: 10,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#FFFFFF",
    fontFamily: "Quicksand-Bold",
    fontSize: 15,
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navIcon: {
    width: 22,
    height: 22,
    tintColor: "#8A8A8A",
    resizeMode: "contain",
    marginBottom: 4,
  },
  navText: {
    fontFamily: "Quicksand-Regular",
    fontSize: 11,
    color: "#666",
  },
  activePill: {
    backgroundColor: "#EAF6BC",
    borderRadius: 10,
    width: 56,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#D5E8A8",
  },
});
