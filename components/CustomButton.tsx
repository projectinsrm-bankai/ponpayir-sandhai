import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    containerStyle?: string;
    textStyle?: string;
    isLoading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    containerStyle = '',
    textStyle = '',
    isLoading = false,
    disabled = false,
    variant = 'primary',
}) => {
    const getButtonStyles = () => {
        switch (variant) {
            case 'secondary':
                return 'bg-[#CAE368]';
            case 'outline':
                return 'border-2 border-[#7A9608] bg-transparent';
            default:
                return 'bg-[#7A9608]';
        }
    };

    const getTextStyles = () => {
        switch (variant) {
            case 'outline':
                return 'text-[#7A9608]';
            default:
                return 'text-white';
        }
    };

    return (
        <Pressable
            className={`h-12 rounded-xl ${getButtonStyles()} justify-center items-center ${disabled ? 'opacity-50' : ''
                } ${containerStyle}`}
            onPress={onPress}
            disabled={disabled || isLoading}
        >
            {isLoading ? (
                <ActivityIndicator
                    size="small"
                    color={variant === 'outline' ? '#7A9608' : 'white'}
                />
            ) : (
                <Text className={`font-quicksand-bold text-base ${getTextStyles()} ${textStyle}`}>
                    {title}
                </Text>
            )}
        </Pressable>
    );
};

export default CustomButton;
