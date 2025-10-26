// app/(auth)/farmer/sign-in.tsx
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { images } from "@/constants";
import { useAuth } from "@/lib/authContext";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import '../../globals.css';

const FarmerSignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isLoading } = useAuth();

    const handleSignIn = async () => {
        if (!username.trim() || !password.trim()) {
            setError('Please fill in all fields');
            return;
        }

        setError('');
        const result = await login(username.trim(), password, 'farmer');

        if (result.success) {
            router.replace("/(farmer)/home");
        } else {
            setError(result.message);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 2.25 }}>
                    <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode="stretch" />
                    <Image source={images.logo} className="self-center size-48 absolute -bottom-16 z-10" />
                </View>

                <View className="px-6 pt-20">
                    <View className="items-center mb-6">
                        <Text className="text-xl font-quicksand-bold text-primary mb-2">FARMER</Text>
                        <Pressable className="absolute right-0">
                            <Ionicons name="help-circle-outline" size={22} color="#7A9608" />
                        </Pressable>
                    </View>

                    {error ? (
                        <View className="mb-4 p-3 bg-red-100 rounded-lg">
                            <Text className="text-red-600 font-quicksand-medium text-center">{error}</Text>
                        </View>
                    ) : null}

                    <CustomInput
                        placeholder="username or email"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />

                    <CustomInput
                        placeholder="password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <CustomButton
                        title="Sign In"
                        onPress={handleSignIn}
                        isLoading={isLoading}
                        containerStyle="mt-6"
                    />

                    <View className="items-center mt-6">
                        <Text className="font-quicksand-bold text-primary mb-2">Or Continue with</Text>
                        <Pressable className="w-2/3 h-8 rounded-lg bg-[#CAE368] flex flex-row justify-center items-center">
                            <Ionicons name="logo-google" size={20} color="#606918" />
                            <Text className="ml-2 font-quicksand-bold text-[#606918]">GOOGLE</Text>
                        </Pressable>
                    </View>

                    <View className="flex-row justify-center mt-6">
                        <Text className="font-quicksand text-[#444444]">No account? </Text>
                        <Pressable onPress={() => router.push("/farmer/sign-up")}>
                            <Text className="font-quicksand-bold text-primary">Sign Up</Text>
                        </Pressable>
                    </View>

                    <View className="flex-row justify-center mt-6">
                        <Text className="font-quicksand text-[#444444]">Bypass </Text>
                        <Pressable onPress={() => router.push("../../(farmer)/home")}>
                            <Text className="font-quicksand-bold text-primary">Go on</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default FarmerSignIn;
