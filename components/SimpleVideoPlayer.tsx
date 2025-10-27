import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Dimensions, Modal, Pressable, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface SimpleVideoPlayerProps {
    videoUrl: string;
    title?: string;
}

export default function SimpleVideoPlayer({ videoUrl, title = "Product Video" }: SimpleVideoPlayerProps) {
    const [showPlayer, setShowPlayer] = useState(false);
    const isLocalFile = videoUrl.startsWith('file://');
    const isNetworkUrl = videoUrl.startsWith('http');
    const screenWidth = Dimensions.get('window').width;

    const getVideoHtml = () => {
        if (isNetworkUrl) {
            // For network URLs, create a simple HTML video player
            return `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { margin: 0; padding: 20px; background: #000; }
                        video { width: 100%; height: auto; }
                        .controls { color: white; text-align: center; margin-top: 10px; }
                    </style>
                </head>
                <body>
                    <video controls autoplay>
                        <source src="${videoUrl}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <div class="controls">Tap to play/pause</div>
                </body>
                </html>
            `;
        } else {
            // For local files, show a message
            return `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { 
                            margin: 0; 
                            padding: 40px 20px; 
                            background: #f0f0f0; 
                            font-family: Arial, sans-serif;
                            text-align: center;
                        }
                        .message { 
                            background: white; 
                            padding: 30px; 
                            border-radius: 10px; 
                            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        }
                        .icon { font-size: 48px; margin-bottom: 20px; }
                        .title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px; }
                        .subtitle { color: #666; margin-bottom: 20px; }
                        .file-info { 
                            background: #f8f9fa; 
                            padding: 15px; 
                            border-radius: 5px; 
                            font-family: monospace; 
                            font-size: 12px;
                            word-break: break-all;
                        }
                    </style>
                </head>
                <body>
                    <div class="message">
                        <div class="icon">🎥</div>
                        <div class="title">Video Available</div>
                        <div class="subtitle">This is a local video file that has been uploaded successfully.</div>
                        <div class="file-info">${videoUrl}</div>
                    </div>
                </body>
                </html>
            `;
        }
    };

    const handlePlayVideo = () => {
        if (isNetworkUrl) {
            setShowPlayer(true);
        } else {
            Alert.alert(
                "Local Video File",
                "This is a local video file from your device. In a production app, this would open in a native video player.\n\nFile: " + videoUrl.split('/').pop(),
                [
                    {
                        text: "View in Browser",
                        onPress: () => setShowPlayer(true)
                    },
                    { text: "Cancel", style: "cancel" }
                ]
            );
        }
    };

    return (
        <>
            <View className="mb-3">
                <Text className="text-sm font-quicksand-bold text-gray-600 mb-2">🎥 {title}</Text>
                <Pressable
                    className="w-full h-48 rounded-lg bg-gray-200 justify-center items-center border-2 border-dashed border-gray-400"
                    onPress={handlePlayVideo}
                >
                    <Ionicons
                        name={isNetworkUrl ? "play-circle" : "videocam"}
                        size={48}
                        color={isNetworkUrl ? "#3B82F6" : "#7A9608"}
                    />
                    <Text className="text-primary font-quicksand-bold mt-2">
                        {isNetworkUrl ? "Play Video" : "Video Available"}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1 text-center px-4">
                        {isNetworkUrl ? "Network Video" : "Local File"}
                    </Text>
                    <View className="mt-2 px-4 py-2 bg-primary rounded-lg">
                        <Text className="text-white text-xs font-quicksand-bold text-center">
                            Tap to {isNetworkUrl ? "Play" : "View"}
                        </Text>
                    </View>
                </Pressable>
            </View>

            {/* Video Player Modal */}
            <Modal
                visible={showPlayer}
                transparent
                animationType="slide"
                onRequestClose={() => setShowPlayer(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: screenWidth * 0.95,
                        height: screenWidth * 0.6,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        overflow: 'hidden'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: '#f0f0f0'
                        }}>
                            <Text className="font-quicksand-bold text-primary">
                                {title}
                            </Text>
                            <Pressable
                                onPress={() => setShowPlayer(false)}
                                style={{
                                    padding: 5,
                                    backgroundColor: '#ff4444',
                                    borderRadius: 15,
                                    width: 30,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Ionicons name="close" size={16} color="white" />
                            </Pressable>
                        </View>

                        <WebView
                            source={{ html: getVideoHtml() }}
                            style={{ flex: 1 }}
                            allowsInlineMediaPlayback={true}
                            mediaPlaybackRequiresUserAction={false}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
}
