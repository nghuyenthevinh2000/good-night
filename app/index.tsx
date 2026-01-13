import { useRef } from 'react';
import { StyleSheet, View, Pressable, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StarfieldBackground } from '@/components/StarfieldBackground';
import { GoodNightCard } from '@/components/GoodNightCard';
import { useAppStore } from '@/store/useAppStore';
import { useGoodNightMessage } from '@/hooks/useGoodNightMessage';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export default function MainScreen() {
    const router = useRouter();
    const { currentMessage, isLoading, isViewingSaved, clearViewingSaved, saveMessage, selectedCharacterId } = useAppStore();
    const { fetchNewMessage } = useGoodNightMessage();
    const viewShotRef = useRef<ViewShot>(null);

    const handleShare = async () => {
        try {
            // Save the message first
            saveMessage(currentMessage, selectedCharacterId);

            if (viewShotRef.current && viewShotRef.current.capture) {
                const uri = await viewShotRef.current.capture();
                await Sharing.shareAsync(uri, {
                    dialogTitle: 'Share your good night wish ✨',
                    mimeType: 'image/png',
                    UTI: 'public.png'
                });
            }
        } catch (error) {
            console.error("Error sharing/saving image:", error);
        }
    };

    return (
        <View style={styles.container}>
            <StarfieldBackground />

            <View style={styles.content}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={Colors.primary} />
                ) : (
                    <View style={{ position: 'relative', width: '100%' }}>
                        <ViewShot ref={viewShotRef} options={{ format: "png", quality: 1.0, result: "tmpfile" }} style={{ width: '100%' }}>
                            <GoodNightCard
                                message={currentMessage}
                                onSwipeRight={fetchNewMessage}
                                onSwipeLeft={handleShare}
                            />
                        </ViewShot>
                        <View style={styles.hintContainer} pointerEvents="none">
                            <Text style={styles.hintText}>Swipe left to save & share • Swipe right for new</Text>
                        </View>
                        {isViewingSaved && (
                            <Pressable
                                style={styles.returnButton}
                                onPress={clearViewingSaved}
                            >
                                <Ionicons name="arrow-back" size={16} color={Colors.text} />
                                <Text style={styles.returnText}>Back to Current</Text>
                            </Pressable>
                        )}
                    </View>
                )}
            </View>

            <View style={styles.fabContainer}>
                <Pressable
                    style={styles.fabButton}
                    onPress={() => router.push('/saved')}
                >
                    <Ionicons name="bookmark-outline" size={24} color={Colors.text} />
                </Pressable>

                <Pressable
                    style={styles.fabButton}
                    onPress={() => router.push('/settings')}
                >
                    <Ionicons name="settings-outline" size={24} color={Colors.text} />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 50,
        right: 30,
        flexDirection: 'row',
        gap: 16,
    },
    fabButton: {
        backgroundColor: 'rgba(26, 24, 37, 0.8)',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    returnButton: {
        position: 'absolute',
        top: -60,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(99, 102, 241, 0.3)',
    },
    returnText: {
        color: Colors.text,
        fontSize: 14,
        fontFamily: Typography.bodyBold,
        marginLeft: 8,
    },
    hintContainer: {
        position: 'absolute',
        bottom: 25,
        width: '100%',
        alignItems: 'center',
    },
    hintText: {
        color: Colors.textMuted,
        fontSize: 12,
        fontFamily: Typography.body,
        opacity: 0.6,
    }
});
