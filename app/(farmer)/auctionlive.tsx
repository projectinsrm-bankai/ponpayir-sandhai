import BottomNav from "@/components/BottomNav";
import VideoPreview from "@/components/VideoPreview";
import { auctionDB, AuctionProduct, Bid, bidDB } from "@/lib/auctionDB";
import { auctionUtils } from "@/lib/auctionUtils";
import { useAuth } from "@/lib/authContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Modal, Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function ProfitCapacitySummary({ totalProfit, capacityUsed, capacityLimit }: { totalProfit: number; capacityUsed: number; capacityLimit: number }) {
    return (
        <View className="border border-dashed border-[#BCD657] rounded-xl p-4 mb-4 bg-white flex-row justify-between">
            <View>
                <Text className="text-xs text-gray-400">Total Profit</Text>
                <Text className="text-lg font-quicksand-bold text-primary">₹{totalProfit.toLocaleString()}</Text>
            </View>
            <View>
                <Text className="text-xs text-gray-400">Capacity Used</Text>
                <Text className="text-lg font-quicksand-bold text-primary">{capacityUsed} / {capacityLimit} kg</Text>
            </View>
        </View>
    );
}

export default function AuctionLivePage() {
    const { user } = useAuth();
    const { auctionId } = useLocalSearchParams();
    const [showInfo, setShowInfo] = useState(false);
    const [auction, setAuction] = useState<AuctionProduct | null>(null);
    const [bids, setBids] = useState<Bid[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Load auction data
    useEffect(() => {
        const loadAuctionData = () => {
            if (auctionId && typeof auctionId === 'string') {
                const foundAuction = auctionDB.getAuctionByAuctionId(auctionId);
                if (foundAuction) {
                    setAuction(foundAuction);
                    const auctionBids = bidDB.getBidsByAuction(auctionId);
                    setBids(auctionBids);
                } else {
                    Alert.alert("Error", "Auction not found");
                    router.back();
                }
            } else {
                // If no auctionId provided, get the most recent auction for the farmer
                const farmerId = user?.id || 'demo-farmer-1';
                const farmerAuctions = auctionDB.getAuctionsByFarmer(farmerId);
                if (farmerAuctions.length > 0) {
                    const latestAuction = farmerAuctions.sort((a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )[0];
                    setAuction(latestAuction);
                    const auctionBids = bidDB.getBidsByAuction(latestAuction.auctionId);
                    setBids(auctionBids);
                } else {
                    Alert.alert("No Auctions", "You don't have any auctions yet. Create one first!");
                    router.push("../(farmer)/application");
                }
            }
            setLoading(false);
        };

        loadAuctionData();
    }, [auctionId, user]);

    // Auto-start pending auctions when they're ready
    useEffect(() => {
        if (auction && auction.status === 'pending') {
            const now = new Date();
            const startTime = new Date(auction.auctionStartTime);

            if (now >= startTime) {
                // Auto-start the auction
                const updatedAuction = auctionDB.updateAuctionStatus(auction.auctionId, 'active');
                if (updatedAuction) {
                    setAuction(updatedAuction);
                    Alert.alert("Auction Started!", "Your auction is now live and accepting bids!");
                }
            }
        }
    }, [auction]);

    // Refresh function
    const onRefresh = () => {
        setRefreshing(true);
        if (auction) {
            const updatedAuction = auctionDB.getAuctionByAuctionId(auction.auctionId);
            if (updatedAuction) {
                setAuction(updatedAuction);
            }
            const updatedBids = bidDB.getBidsByAuction(auction.auctionId);
            setBids(updatedBids);
        }
        setRefreshing(false);
    };

    // Calculate capacity and profit
    const capacityLimit = auction?.quantityKg || 0;
    const capacityUsed = bids.reduce((sum, bid) => sum + (bid.bidAmount / (auction?.minimumPricePerKg || 1)), 0);
    const totalProfit = bids.reduce((sum, bid) => sum + bid.bidAmount, 0);

    // Get auction status info
    const isActive = auction ? auctionUtils.isAuctionActive(auction) : false;
    const isPending = auction ? auctionUtils.isAuctionPending(auction) : false;
    const statusText = auction ? auctionUtils.getAuctionStatusText(auction) : "Unknown";
    const timeInfo = auction ? (
        isActive && auction.auctionEndTime
            ? auctionUtils.getTimeUntilEnd(auction.auctionEndTime)
            : isPending
                ? auctionUtils.getTimeUntilStart(auction.auctionStartTime)
                : statusText
    ) : "";

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-primary-cream justify-center items-center">
                <Text className="text-lg font-quicksand-bold text-primary">Loading auction...</Text>
            </SafeAreaView>
        );
    }

    if (!auction) {
        return (
            <SafeAreaView className="flex-1 bg-primary-cream justify-center items-center">
                <Text className="text-lg font-quicksand-bold text-primary">Auction not found</Text>
                <Pressable
                    className="bg-primary px-6 py-3 rounded-lg mt-4"
                    onPress={() => router.push("../(farmer)/application")}
                >
                    <Text className="text-white font-quicksand-bold">Create New Auction</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            <ScrollView
                contentContainerStyle={{ padding: 16 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Top Bar */}
                <View className="flex-row items-center justify-between mb-2">
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back-outline" size={28} color="#222" />
                    </Pressable>
                    <Text className="font-quicksand-bold text-xl">Auction Live</Text>
                    <View className="flex-row items-center">
                        <View className={`w-3 h-3 rounded-full mr-1 ${isActive ? 'bg-green-500' : isPending ? 'bg-yellow-500' : 'bg-gray-500'
                            }`} />
                        <Text className={`text-xs font-quicksand-bold ${isActive ? 'text-green-500' : isPending ? 'text-yellow-500' : 'text-gray-500'
                            }`}>
                            {statusText}
                        </Text>
                    </View>
                </View>

                {/* Auction ID and Time Info */}
                <View className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                    <Text className="text-sm text-gray-600 mb-1">Auction ID: {auction.auctionId}</Text>
                    <Text className="text-sm text-gray-600">Status: {timeInfo}</Text>
                </View>

                {/* Product Description */}
                <Text className="text-[#7A9608] font-quicksand mb-3 mt-1" style={{ fontSize: 14 }}>
                    {auction.productDescription || `Fresh ${auction.productName.toLowerCase()} - ${auction.daysOld} days old, Grade ${auction.grade || 'A+'}`}
                </Text>

                {/* Base Price & Total Available */}
                <View className="flex-row justify-between border border-dashed border-[#BCD657] rounded-xl px-4 py-3 mb-4 bg-white">
                    <View>
                        <Text className="text-xs text-gray-400">Base Price</Text>
                        <Text className="text-lg font-quicksand-bold text-primary">
                            {auctionUtils.formatPrice(auction.minimumPricePerKg)}/kg
                        </Text>
                    </View>
                    <View>
                        <Text className="text-xs text-gray-400">Total available</Text>
                        <Text className="text-lg font-quicksand-bold text-primary">
                            {auctionUtils.formatQuantity(auction.quantityKg)}
                        </Text>
                    </View>
                </View>

                {/* Product Media Gallery */}
                {(auction.imageUrl || auction.videoUrl) && (
                    <View className="mb-4">
                        <Text className="text-lg font-quicksand-bold text-primary mb-3">Product Media</Text>

                        {/* Image */}
                        {auction.imageUrl && (
                            <View className="mb-3">
                                <Text className="text-sm font-quicksand-bold text-gray-600 mb-2">📸 Product Image</Text>
                                <Image
                                    source={{ uri: auction.imageUrl }}
                                    className="w-full h-48 rounded-lg"
                                    resizeMode="cover"
                                />
                            </View>
                        )}

                        {/* Video */}
                        {auction.videoUrl && (
                            <VideoPreview
                                videoUrl={auction.videoUrl}
                                title="Product Video"
                            />
                        )}
                    </View>
                )}

                {/* Bid Section Header */}
                <View className="flex-row items-center mb-1">
                    <Text className="font-quicksand-bold text-lg mr-2">Bid</Text>
                    <Pressable onPress={() => setShowInfo(true)}>
                        <Ionicons name="help-circle-outline" size={18} color="#888" />
                    </Pressable>
                </View>

                {/* Bids */}
                {bids.length === 0 ? (
                    <View className="bg-gray-100 rounded-lg p-6 mb-4 items-center">
                        <Ionicons name="people-outline" size={48} color="#9CA3AF" />
                        <Text className="text-lg font-quicksand-bold text-gray-500 mt-2">
                            No bids yet
                        </Text>
                        <Text className="text-sm text-gray-400 mt-1 text-center">
                            {isPending
                                ? "Auction hasn't started yet"
                                : isActive
                                    ? "Waiting for buyers to place bids"
                                    : "Auction has ended"
                            }
                        </Text>
                    </View>
                ) : (
                    bids.map((bid, i) => (
                        <View
                            key={bid.id}
                            className="flex-row items-center mb-2 rounded-lg p-3"
                            style={{
                                backgroundColor: bid.isWinning ? "#EAF6BC" : "#F8FFDE",
                                borderWidth: bid.isWinning ? 2 : 0,
                                borderColor: bid.isWinning ? "#7A9608" : "transparent"
                            }}
                        >
                            <View className="w-12 h-12 rounded-full bg-primary justify-center items-center mr-3">
                                <Text className="text-white font-quicksand-bold text-lg">
                                    {bid.bidderId.charAt(0).toUpperCase()}
                                </Text>
                            </View>
                            <View className="flex-1">
                                <View className="flex-row items-center justify-between">
                                    <Text className="font-quicksand-bold text-[#7A9608] text-base">
                                        Bidder {bid.bidderId}
                                    </Text>
                                    {bid.isWinning && (
                                        <View className="bg-green-500 px-2 py-1 rounded-full">
                                            <Text className="text-white text-xs font-quicksand-bold">WINNING</Text>
                                        </View>
                                    )}
                                </View>
                                <Text className="text-lg font-quicksand-bold text-primary">
                                    {auctionUtils.formatPrice(bid.bidAmount)}
                                </Text>
                                <Text className="text-xs text-[#80875c]">
                                    {auctionUtils.formatQuantity(bid.bidAmount / auction.minimumPricePerKg)} at {auctionUtils.formatPrice(auction.minimumPricePerKg)}/kg
                                </Text>
                                <Text className="text-xs text-[#bababa]">
                                    {auctionUtils.formatAuctionTime(bid.bidTime)}
                                </Text>
                            </View>
                        </View>
                    ))
                )}

                {/* Profit & Capacity Summary */}
                <ProfitCapacitySummary totalProfit={totalProfit} capacityUsed={capacityUsed} capacityLimit={capacityLimit} />

                {/* Action Buttons */}
                <View className="flex-row gap-3 my-4">
                    <Pressable
                        className="flex-1 h-12 rounded-lg bg-primary justify-center items-center"
                        onPress={() => router.push("../(farmer)/auctionlist")}
                    >
                        <Text className="text-white font-quicksand-bold text-base">View All Auctions</Text>
                    </Pressable>

                    {isActive && (
                        <Pressable
                            className="flex-1 h-12 rounded-lg bg-green-500 justify-center items-center"
                            onPress={() => {
                                // Add demo bid functionality
                                const demoBid = bidDB.createBid({
                                    auctionId: auction.auctionId,
                                    bidderId: 'demo-buyer-' + Math.random().toString(36).substr(2, 5),
                                    bidAmount: auction.minimumPricePerKg * 1.2 * (Math.random() * 50 + 10), // Random bid above minimum
                                });
                                setBids(prev => [...prev, demoBid]);
                                Alert.alert("Demo Bid Added", "A demo bid has been added to test the system!");
                            }}
                        >
                            <Text className="text-white font-quicksand-bold text-base">Add Demo Bid</Text>
                        </Pressable>
                    )}
                </View>

                {/* Demo Actions */}
                {isActive && (
                    <View className="mb-4">
                        <Pressable
                            className="w-full h-10 rounded-lg bg-blue-500 justify-center items-center mb-2"
                            onPress={() => {
                                // Generate multiple demo bids
                                const bidCount = Math.floor(Math.random() * 3) + 2; // 2-4 bids
                                const newBids: Bid[] = [];

                                for (let i = 0; i < bidCount; i++) {
                                    const demoBid = bidDB.createBid({
                                        auctionId: auction.auctionId,
                                        bidderId: 'buyer-' + Math.random().toString(36).substr(2, 5),
                                        bidAmount: auction.minimumPricePerKg * (1.1 + Math.random() * 0.5) * (Math.random() * 30 + 10),
                                    });
                                    newBids.push(demoBid);
                                }

                                setBids(prev => [...prev, ...newBids]);
                                Alert.alert("Demo Bids Added", `${bidCount} demo bids have been added!`);
                            }}
                        >
                            <Text className="text-white font-quicksand-bold text-sm">Generate Demo Bids (2-4)</Text>
                        </Pressable>
                    </View>
                )}

                {/* Auction Status Actions */}
                {isPending && (
                    <View className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-4">
                        <Text className="font-quicksand-bold text-yellow-800 mb-2">Auction Pending</Text>
                        <Text className="text-sm text-yellow-700">
                            Your auction will start in {timeInfo}. You'll be notified when it goes live.
                        </Text>
                    </View>
                )}

                {auction.status === 'completed' && (
                    <View className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
                        <Text className="font-quicksand-bold text-green-800 mb-2">Auction Completed</Text>
                        <Text className="text-sm text-green-700">
                            Final Price: {auctionUtils.formatPrice(auction.finalPrice || 0)} |
                            Winner: {auction.winningBidderId}
                        </Text>
                    </View>
                )}
            </ScrollView>

            {/* Info Popup */}
            <Modal
                visible={showInfo}
                transparent
                animationType="fade"
                onRequestClose={() => setShowInfo(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.3)'
                }}>
                    <View style={{
                        backgroundColor: '#F8FFDE',
                        padding: 24,
                        borderRadius: 16,
                        maxWidth: 320,
                        shadowColor: "#000",
                        shadowOpacity: 0.2,
                        shadowOffset: { width: 0, height: 3 }
                    }}>
                        <Text className="font-quicksand-bold text-[#7A9608] mb-3">How bidding works</Text>
                        <Text className="text-[#444444] mb-2 font-quicksand" style={{ fontSize: 14 }}>
                            The app uses the knapsack approach to help the farmer pick bidders who offer the highest total profit without exceeding the allowed weight or capacity. Each bid has a weight (quantity) and a value (profit), and the system selects the best combination of bids that maximizes earnings within the limit.
                        </Text>
                        <Pressable className="mt-3 items-center" onPress={() => setShowInfo(false)}>
                            <Text className="text-primary font-quicksand-bold">Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Bottom Nav Bar */}
            <BottomNav />
        </SafeAreaView>
    );
}

