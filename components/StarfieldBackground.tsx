import React, { useMemo } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    useSharedValue,
    withDelay
} from 'react-native-reanimated';
import { Colors } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

const STAR_COUNT = 40;

const Star = ({ index }: { index: number }) => {
    const opacity = useSharedValue(Math.random());

    React.useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.2, { duration: 2000 + Math.random() * 3000 }),
                withTiming(0.8, { duration: 2000 + Math.random() * 3000 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const pos = useMemo(() => ({
        top: Math.random() * height,
        left: Math.random() * width,
        size: Math.random() * 3 + 1,
    }), []);

    return (
        <Animated.View
            style={[
                styles.star,
                animatedStyle,
                {
                    top: pos.top,
                    left: pos.left,
                    width: pos.size,
                    height: pos.size,
                    borderRadius: pos.size / 2,
                }
            ]}
        />
    );
};

export const StarfieldBackground = () => {
    return (
        <View style={styles.container}>
            {[...Array(STAR_COUNT)].map((_, i) => (
                <Star key={i} index={i} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.background,
    },
    star: {
        position: 'absolute',
        backgroundColor: '#FFF',
    },
});
