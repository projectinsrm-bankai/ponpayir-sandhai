import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import {router} from "expo-router";
import React from "react";

export default function BuyerSignUp() {
    return (
        <KeyboardAvoidingView
            className="flex-1 bg-primary-cream px-6"
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="flex-1 justify-center">
                {/* Header */}
                <View className="items-center mb-4 mt-2">
                    <Text className="text-xl font-quicksand-bold text-primary mb-2">BUYER</Text>
                    <Pressable className="absolute right-0 top-1">
                        <Ionicons name="help-circle-outline" size={22} color="#7A9608" />
                    </Pressable>
                </View>

                {/* Input Fields */}
                <View className="gap-y-3 mb-2">
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
                    <TextInput
                        className="border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent font-quicksand"
                        placeholder="password again"
                        placeholderTextColor="#444444"
                        secureTextEntry
                    />
                    <TextInput
                        className="border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent font-quicksand"
                        placeholder="phone number"
                        placeholderTextColor="#444444"
                        keyboardType="phone-pad"
                    />
                    {/* OTP Row */}
                    <View className="flex-row items-center justify-between border border-dashed border-[#444444] rounded-lg px-4 py-3">
                        <Text className="font-quicksand-bold text-base">xxx-xxx</Text>
                        <Pressable>
                            <Text className="font-quicksand-bold text-base text-[#444444]">Resend OTP</Text>
                        </Pressable>
                    </View>
                </View>

                {/* Register Button */}
                <Pressable className="mt-3 h-12 rounded-lg bg-primary justify-center items-center">
                    <Text className="text-white font-quicksand-bold text-base">Register</Text>
                </Pressable>

                {/* Or Continue with */}
                <View className="items-center mt-7">
                    <Text className="font-quicksand-bold text-primary mb-2">Or Continue with</Text>
                    <Pressable className="w-2/3 h-8 rounded-lg bg-[#CAE368] flex flex-row justify-center items-center">
                        {/* Substitute with a Google SVG or Local Icon if desired */}
                        <Ionicons name="logo-google" size={20} color="#606918" />
                        <Text className="ml-2 font-quicksand-bold text-[#606918]">GOOGLE</Text>
                    </Pressable>
                </View>
                <View className="flex-row justify-center mt-6">
                    <Text className="font-quicksand text-[#444444]">Have account? </Text>
                    <Pressable onPress={() => router.push("/buyer/sign-in")}>
                        <Text className="font-quicksand-bold text-primary">Sign In</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
