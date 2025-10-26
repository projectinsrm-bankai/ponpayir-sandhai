// app/(auth)/farmer/sign-up.tsx
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { images } from "@/constants";
import { useAuth } from "@/lib/authContext";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";
import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import '../../globals.css';

const FarmerSignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: '',
        farmName: '',
        farmLocation: '',
    });
    const [error, setError] = useState('');
    const { register, isLoading } = useAuth();

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSignUp = async () => {
        if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim() || !formData.fullName.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setError('');
        const result = await register({
            username: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password,
            fullName: formData.fullName.trim(),
            phone: formData.phone.trim() || undefined,
            farmName: formData.farmName.trim() || undefined,
            farmLocation: formData.farmLocation.trim() || undefined,
            crops: [],
            isVerified: false,
        }, 'farmer');

        if (result.success) {
            router.replace("/(farmer)/home");
        } else {
            setError(result.message);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView className="bg-white h-full" keyboardShouldPersistTaps="handled">
                <View className="w-full relative" style={{ height: Dimensions.get('screen').height / 3 }}>
                    <ImageBackground source={images.loginGraphic} className="size-full rounded-b-lg" resizeMode="stretch" />
                    <Image source={images.logo} className="self-center size-32 absolute -bottom-8 z-10" />
                </View>

                <View className="px-6 pt-10">
                    <View className="items-center mb-6">
                        <Text className="text-xl font-quicksand-bold text-primary mb-2">FARMER SIGN UP</Text>
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
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChangeText={(value) => handleInputChange('fullName', value)}
                        autoCapitalize="words"
                    />

                    <CustomInput
                        placeholder="Username"
                        value={formData.username}
                        onChangeText={(value) => handleInputChange('username', value)}
                        autoCapitalize="none"
                    />

                    <CustomInput
                        placeholder="Email"
                        value={formData.email}
                        onChangeText={(value) => handleInputChange('email', value)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <CustomInput
                        placeholder="Phone (Optional)"
                        value={formData.phone}
                        onChangeText={(value) => handleInputChange('phone', value)}
                        keyboardType="phone-pad"
                    />

                    <CustomInput
                        placeholder="Farm Name (Optional)"
                        value={formData.farmName}
                        onChangeText={(value) => handleInputChange('farmName', value)}
                        autoCapitalize="words"
                    />

                    <CustomInput
                        placeholder="Farm Location (Optional)"
                        value={formData.farmLocation}
                        onChangeText={(value) => handleInputChange('farmLocation', value)}
                        autoCapitalize="words"
                    />

                    <CustomInput
                        placeholder="Password"
                        value={formData.password}
                        onChangeText={(value) => handleInputChange('password', value)}
                        secureTextEntry
                    />

                    <CustomInput
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChangeText={(value) => handleInputChange('confirmPassword', value)}
                        secureTextEntry
                    />

                    <CustomButton
                        title="Sign Up"
                        onPress={handleSignUp}
                        isLoading={isLoading}
                        containerStyle="mt-6"
                    />

                    <View className="flex-row justify-center mt-6">
                        <Text className="font-quicksand text-[#444444]">Already have an account? </Text>
                        <Pressable onPress={() => router.push("/farmer/sign-in")}>
                            <Text className="font-quicksand-bold text-primary">Sign In</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default FarmerSignUp;