import { StyleSheet, Text, View, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '@/constants/theme';
import { useAppStore, SavedMessage } from '@/store/useAppStore';
import { CHARACTERS } from '@/constants/characters';
import { Ionicons } from '@expo/vector-icons';
import { StarfieldBackground } from '@/components/StarfieldBackground';

export default function SavedMessagesScreen() {
    const router = useRouter();
    const { savedMessages, viewSavedMessage } = useAppStore();

    const handleSelectMessage = (message: SavedMessage) => {
        viewSavedMessage(message);
        router.back();
    };

    const renderItem = ({ item }: { item: SavedMessage }) => {
        const character = CHARACTERS.find(c => c.id === item.characterId);
        const date = new Date(item.timestamp).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        return (
            <Pressable
                style={styles.messageCard}
                onPress={() => handleSelectMessage(item)}
            >
                <View style={styles.cardHeader}>
                    <Text style={styles.characterIcon}>{character?.icon || '✨'}</Text>
                    <Text style={styles.dateText}>{date}</Text>
                </View>
                <Text style={styles.messageText} numberOfLines={3}>
                    {item.text}
                </Text>
                <View style={styles.cardFooter}>
                    <Text style={styles.characterName}>{character?.name}</Text>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <StarfieldBackground />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="close-outline" size={28} color={Colors.text} />
                    </Pressable>
                    <Text style={styles.title}>Saved Blessings</Text>
                </View>

                {savedMessages.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="bookmark-outline" size={64} color={Colors.textMuted} style={{ opacity: 0.3 }} />
                        <Text style={styles.emptyText}>No saved messages yet.</Text>
                        <Text style={styles.emptySubText}>Swipe left on a message to save it to your collection.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={savedMessages}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        color: Colors.text,
        fontSize: 20,
        fontFamily: Typography.bodyBold,
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    messageCard: {
        backgroundColor: 'rgba(26, 24, 37, 0.8)',
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    characterIcon: {
        fontSize: 24,
    },
    dateText: {
        color: Colors.textMuted,
        fontSize: 12,
        fontFamily: Typography.body,
    },
    messageText: {
        color: Colors.text,
        fontSize: 15,
        fontFamily: Typography.body,
        lineHeight: 22,
        marginBottom: 12,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.05)',
        paddingTop: 12,
    },
    characterName: {
        color: Colors.textMuted,
        fontSize: 13,
        fontFamily: Typography.bodyBold,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        color: Colors.text,
        fontSize: 18,
        fontFamily: Typography.bodyBold,
        marginTop: 20,
        marginBottom: 8,
    },
    emptySubText: {
        color: Colors.textMuted,
        fontSize: 14,
        fontFamily: Typography.body,
        textAlign: 'center',
        lineHeight: 20,
    }
});
