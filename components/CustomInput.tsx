import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    label?: string;
    error?: string;
    containerStyle?: string;
    inputStyle?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    placeholder = '',
    value = '',
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    label,
    error,
    containerStyle = '',
    inputStyle = '',
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View className={`mb-4 ${containerStyle}`}>
            {label && (
                <Text className="text-base font-quicksand-medium text-gray-700 mb-2 px-2">
                    {label}
                </Text>
            )}
            <View className="relative">
                <TextInput
                    className={`border border-dashed border-[#444444] rounded-lg px-4 py-3 bg-transparent font-quicksand text-base ${inputStyle}`}
                    placeholder={placeholder}
                    placeholderTextColor="#444444"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                />
                {secureTextEntry && (
                    <Pressable
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        onPress={togglePasswordVisibility}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off' : 'eye'}
                            size={20}
                            color="#444444"
                        />
                    </Pressable>
                )}
            </View>
            {error && (
                <Text className="text-red-500 text-sm font-quicksand-medium mt-1 px-2">
                    {error}
                </Text>
            )}
        </View>
    );
};

export default CustomInput;
