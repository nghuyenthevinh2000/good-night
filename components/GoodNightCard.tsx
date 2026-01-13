import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    runOnJS
} from 'react-native-reanimated';
import { Colors, Typography } from '@/constants/theme';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.3;

interface Props {
    message: string;
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
}

export const GoodNightCard = ({ message, onSwipeRight, onSwipeLeft }: Props) => {
    const translateX = useSharedValue(0);

    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX;
        })
        .onEnd((event) => {
            if (translateX.value > SWIPE_THRESHOLD) {
                translateX.value = withSpring(width, {}, () => {
                    runOnJS(onSwipeRight)();
                    translateX.value = 0;
                });
            } else if (translateX.value < -SWIPE_THRESHOLD) {
                translateX.value = withSpring(-width, {}, () => {
                    runOnJS(onSwipeLeft)();
                    translateX.value = 0;
                });
            } else {
                translateX.value = withSpring(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
        opacity: 1 - Math.abs(translateX.value) / width,
    }));

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.cardContainer, animatedStyle]}>
                <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
                    <Text style={styles.messageText}>{message}</Text>
                </BlurView>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        aspectRatio: 0.8,
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    blurContainer: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(26, 24, 37, 0.4)',
    },
    messageText: {
        color: Colors.text,
        fontSize: 24,
        fontFamily: Typography.headline,
        textAlign: 'center',
        lineHeight: 34,
    }
});
