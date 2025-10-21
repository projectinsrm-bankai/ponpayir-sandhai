// app/(auth)/buyer/sign-in.tsx
import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import '../../globals.css';
import { TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {router} from "expo-router";

const BuyerSignIn = () => {
    return (
        <KeyboardAvoidingView
            className="flex-1 bg-primary-cream px-6"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="flex-1 justify-center">
                <View className="items-center mb-6">
                    <Text className="text-xl font-quicksand-bold text-primary mb-2">BUYER</Text>
                    <Pressable className="absolute right-0">
                        <Ionicons name="help-circle-outline" size={22} color="#7A9608" />
                    </Pressable>
                </View>

                <View className="gap-y-3">
                    <TextInput
                        className="border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent font-quicksand"
                        placeholder="username"
                        placeholderTextColor="#444444"
                    />
                    <TextInput
                        className="border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent font-quicksand"
                        placeholder="password"
                        placeholderTextColor="#444444"
                        secureTextEntry
                    />
                </View>

                <Pressable className="mt-6 h-12 rounded-xl bg-[#7A9608] justify-center items-center" onPress={() => router.push("/(buyer)/home")}>
                    <Text className="text-white font-quicksand-bold text-base">Sign In</Text>
                </Pressable>

                <View className="items-center mt-6">
                    <Text className="font-quicksand-bold text-primary mb-2">Or Continue with</Text>
                    <Pressable className="w-2/3 h-8 rounded-lg bg-[#CAE368] flex flex-row justify-center items-center">
                        <Ionicons name="logo-google" size={20} color="#606918" />
                        <Text className="ml-2 font-quicksand-bold text-[#606918]">GOOGLE</Text>
                    </Pressable>
                </View>
                <View className="flex-row justify-center mt-6">
                    <Text className="font-quicksand text-[#444444]">No account? </Text>
                    <Pressable onPress={() => router.push("/buyer/sign-up")}>
                        <Text className="font-quicksand-bold text-primary">Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default BuyerSignIn;
