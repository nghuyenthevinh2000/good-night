import { Share, Alert } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { generateGoodNightMessage } from '@/services/ai';

export const useGoodNightMessage = () => {
    const {
        selectedCharacterId,
        setCurrentMessage,
        setLoading
    } = useAppStore();

    const fetchNewMessage = async () => {
        setLoading(true);
        try {
            const message = await generateGoodNightMessage(selectedCharacterId);
            setCurrentMessage(message);
        } catch (error) {
            Alert.alert("Error", "Could not get a new good night message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const shareMessage = async (message: string) => {
        try {
            await Share.share({
                message: `${message}\n\nSent with Good Night App ✨`,
            });
        } catch (error) {
            console.error("Error sharing message:", error);
        }
    };

    return {
        fetchNewMessage,
        shareMessage
    };
};
