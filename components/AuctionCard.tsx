import { AuctionProduct } from '@/lib/auctionDB';
import { auctionUtils } from '@/lib/auctionUtils';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

interface AuctionCardProps {
    auction: AuctionProduct;
    onPress?: () => void;
    showStatus?: boolean;
}

export default function AuctionCard({ auction, onPress, showStatus = true }: AuctionCardProps) {
    const statusColor = auctionUtils.getAuctionStatusColor(auction);
    const statusText = auctionUtils.getAuctionStatusText(auction);
    const timeInfo = auctionUtils.isAuctionActive(auction)
        ? auction.auctionEndTime
            ? auctionUtils.getTimeUntilEnd(auction.auctionEndTime)
            : "Active"
        : auctionUtils.isAuctionPending(auction)
            ? auctionUtils.getTimeUntilStart(auction.auctionStartTime)
            : statusText;

    return (
        <Pressable
            className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200"
            onPress={onPress}
        >
            <View className="flex-row">
                {/* Product Media */}
                <View className="w-20 h-20 rounded-lg bg-gray-100 mr-3">
                    {auction.imageUrl ? (
                        <Image
                            source={{ uri: auction.imageUrl }}
                            className="w-full h-full rounded-lg"
                            resizeMode="cover"
                        />
                    ) : auction.videoUrl ? (
                        <View className="w-full h-full rounded-lg bg-gray-200 justify-center items-center">
                            <Ionicons name="videocam-outline" size={24} color="#9CA3AF" />
                        </View>
                    ) : (
                        <View className="w-full h-full rounded-lg bg-gray-200 justify-center items-center">
                            <Ionicons name="image-outline" size={24} color="#9CA3AF" />
                        </View>
                    )}

                    {/* Media Type Indicator */}
                    {auction.videoUrl && (
                        <View className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1">
                            <Ionicons name="play" size={12} color="white" />
                        </View>
                    )}
                </View>

                {/* Auction Details */}
                <View className="flex-1">
                    <View className="flex-row justify-between items-start mb-1">
                        <Text className="font-quicksand-bold text-lg text-primary flex-1">
                            {auction.productName}
                        </Text>
                        {showStatus && (
                            <View
                                className="px-2 py-1 rounded-full"
                                style={{ backgroundColor: `${statusColor}20` }}
                            >
                                <Text
                                    className="text-xs font-quicksand-bold"
                                    style={{ color: statusColor }}
                                >
                                    {statusText}
                                </Text>
                            </View>
                        )}
                    </View>

                    <Text className="text-sm text-gray-600 mb-2">
                        {auctionUtils.formatQuantity(auction.quantityKg)} • {auction.daysOld} days old
                    </Text>

                    <View className="flex-row justify-between items-center mb-2">
                        <Text className="font-quicksand-bold text-lg text-primary">
                            {auctionUtils.formatPrice(auction.minimumPricePerKg)}/kg
                        </Text>
                        {auction.currentBid && (
                            <Text className="font-quicksand-bold text-green-600">
                                Current: {auctionUtils.formatPrice(auction.currentBid)}
                            </Text>
                        )}
                    </View>

                    <View className="flex-row justify-between items-center">
                        <Text className="text-xs text-gray-500">
                            {timeInfo}
                        </Text>
                        <View className="flex-row items-center">
                            {auction.deliveryAvailable && (
                                <View className="flex-row items-center mr-2">
                                    <Ionicons name="car-outline" size={12} color="#7A9608" />
                                    <Text className="text-xs text-primary ml-1">Delivery</Text>
                                </View>
                            )}
                            {auction.videoUrl && (
                                <View className="flex-row items-center">
                                    <Ionicons name="videocam-outline" size={12} color="#7A9608" />
                                    <Text className="text-xs text-primary ml-1">Video</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {auction.grade && (
                        <View className="mt-2">
                            <Text className="text-xs text-gray-500">
                                Grade: <Text className="font-quicksand-bold text-primary">{auction.grade}</Text>
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </Pressable>
    );
}
