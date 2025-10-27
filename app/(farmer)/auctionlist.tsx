import AuctionCard from '@/components/AuctionCard';
import BottomNav from '@/components/BottomNav';
import { auctionDB, AuctionProduct } from '@/lib/auctionDB';
import { useAuth } from '@/lib/authContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, RefreshControl, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuctionList() {
    const { user } = useAuth();
    const [auctions, setAuctions] = useState<AuctionProduct[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');

    const loadAuctions = () => {
        // For demo purposes, use a default farmer ID if no user is logged in
        const farmerId = user?.id || 'demo-farmer-1';

        let farmerAuctions = auctionDB.getAuctionsByFarmer(farmerId);

        // Apply filter
        switch (filter) {
            case 'pending':
                farmerAuctions = farmerAuctions.filter(auction => auction.status === 'pending');
                break;
            case 'active':
                farmerAuctions = farmerAuctions.filter(auction => auction.status === 'active');
                break;
            case 'completed':
                farmerAuctions = farmerAuctions.filter(auction => auction.status === 'completed');
                break;
            default:
                // Show all auctions
                break;
        }

        // Sort by creation date (newest first)
        farmerAuctions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        setAuctions(farmerAuctions);
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadAuctions();
        setRefreshing(false);
    };

    useEffect(() => {
        loadAuctions();
    }, [user, filter]);

    const handleAuctionPress = (auction: AuctionProduct) => {
        // Navigate to auction details or live auction
        router.push({
            pathname: '../(farmer)/auctionlive',
            params: { auctionId: auction.auctionId }
        });
    };

    const getFilterButtonStyle = (filterType: typeof filter) => {
        return filter === filterType
            ? "bg-primary px-4 py-2 rounded-full mr-2"
            : "bg-gray-200 px-4 py-2 rounded-full mr-2";
    };

    const getFilterTextStyle = (filterType: typeof filter) => {
        return filter === filterType
            ? "text-white font-quicksand-bold text-sm"
            : "text-gray-600 font-quicksand text-sm";
    };

    return (
        <SafeAreaView className="flex-1 bg-primary-cream">
            {/* Header */}
            <View className="px-4 py-4 bg-white border-b border-gray-200">
                <View className="flex-row items-center justify-between mb-4">
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back-outline" size={24} color="#7A9608" />
                    </Pressable>
                    <Text className="text-xl font-quicksand-bold text-primary">My Auctions</Text>
                    <Pressable onPress={() => router.push('../(farmer)/application')}>
                        <Ionicons name="add-outline" size={24} color="#7A9608" />
                    </Pressable>
                </View>

                {/* Filter Buttons */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Pressable onPress={() => setFilter('all')} className={getFilterButtonStyle('all')}>
                        <Text className={getFilterTextStyle('all')}>All</Text>
                    </Pressable>
                    <Pressable onPress={() => setFilter('pending')} className={getFilterButtonStyle('pending')}>
                        <Text className={getFilterTextStyle('pending')}>Pending</Text>
                    </Pressable>
                    <Pressable onPress={() => setFilter('active')} className={getFilterButtonStyle('active')}>
                        <Text className={getFilterTextStyle('active')}>Active</Text>
                    </Pressable>
                    <Pressable onPress={() => setFilter('completed')} className={getFilterButtonStyle('completed')}>
                        <Text className={getFilterTextStyle('completed')}>Completed</Text>
                    </Pressable>
                </ScrollView>
            </View>

            {/* Auction List */}
            <ScrollView
                className="flex-1 px-4 py-4"
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {auctions.length === 0 ? (
                    <View className="flex-1 justify-center items-center py-20">
                        <Ionicons name="golf-outline" size={64} color="#9CA3AF" />
                        <Text className="text-lg font-quicksand-bold text-gray-500 mt-4">
                            No auctions found
                        </Text>
                        <Text className="text-sm text-gray-400 mt-2 text-center">
                            {filter === 'all'
                                ? "Create your first auction to get started"
                                : `No ${filter} auctions found`
                            }
                        </Text>
                        <Pressable
                            className="bg-primary px-6 py-3 rounded-lg mt-4"
                            onPress={() => router.push('../(farmer)/application')}
                        >
                            <Text className="text-white font-quicksand-bold">Create Auction</Text>
                        </Pressable>
                    </View>
                ) : (
                    auctions.map((auction) => (
                        <AuctionCard
                            key={auction.id}
                            auction={auction}
                            onPress={() => handleAuctionPress(auction)}
                            showStatus={true}
                        />
                    ))
                )}
            </ScrollView>

            {/* Bottom Nav Bar */}
            <BottomNav />
        </SafeAreaView>
    );
}
