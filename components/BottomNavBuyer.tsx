import {View, Text, Pressable} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";
import {router} from "expo-router";

const BottomNav = () => {
    return (
        <View className="flex-row bg-[#F8FFDE] border-t border-[#EAF6BC] py-2 px-1 justify-between items-center">
            <Pressable className="items-center flex-1" onPress={() => router.push("/(buyer)/home")}>
                <Ionicons name="home" size={24} color="#7A9608" />
                <Text className="text-xs mt-1 text-primary">Home</Text>
            </Pressable>
            <Pressable className="items-center flex-1" onPress={() => router.push("/(buyer)/report")}>
                <Ionicons name="analytics-outline" size={22} color="#7A9608" />
                <Text className="text-xs mt-1 text-primary">Reports</Text>
            </Pressable>
            <Pressable className="items-center flex-1">
                <Ionicons name="pricetag-outline" size={22} color="#7A9608" onPress={() => router.push("/(buyer)/auctionlist")}/>
                <Text className="text-xs mt-1 text-primary">Auctions</Text>
            </Pressable>
            <Pressable className="items-center flex-1">
                <Ionicons name="list" size={22} color="#7A9608" onPress={() => router.push("/(buyer)/orders")}/>
                <Text className="text-xs mt-1 text-primary">Orders</Text>
            </Pressable>
            <Pressable className="items-center flex-1" onPress={() => router.push("/(buyer)/notifications")}>
                <Ionicons name="notifications-outline" size={22} color="#7A9608" />
                <Text className="text-xs mt-1 text-primary">Notification</Text>
            </Pressable>
            <Pressable className="items-center flex-1" onPress={() => router.push("/(buyer)/profile")}>
                <Ionicons name="person-outline" size={22} color="#7A9608" />
                <Text className="text-xs mt-1 text-primary">Profile</Text>
            </Pressable>
        </View>
    )
}
export default BottomNav
