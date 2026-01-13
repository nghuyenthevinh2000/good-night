import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '@/constants/theme';
import { CHARACTERS, CharacterKey } from '@/constants/characters';
import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
    const router = useRouter();
    const {
        selectedCharacterId,
        setSelectedCharacter,
        reminderEnabled,
        toggleReminder
    } = useAppStore();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="close-outline" size={28} color={Colors.text} />
                </Pressable>
                <Text style={styles.title}>Agent Characters</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Choose your mood</Text>

                {CHARACTERS.map((character) => (
                    <Pressable
                        key={character.id}
                        style={[
                            styles.characterCard,
                            selectedCharacterId === character.id && styles.selectedCard
                        ]}
                        onPress={() => setSelectedCharacter(character.id)}
                    >
                        <Text style={styles.characterIcon}>{character.icon}</Text>
                        <View style={styles.characterInfo}>
                            <Text style={styles.characterName}>{character.name}</Text>
                            <Text style={styles.characterDesc}>{character.description}</Text>
                        </View>
                        <View style={styles.radio}>
                            {selectedCharacterId === character.id && (
                                <View style={styles.radioInner} />
                            )}
                        </View>
                    </Pressable>
                ))}

                <Text style={styles.sectionTitle}>Reminders</Text>
                <Pressable
                    style={styles.settingRow}
                    onPress={toggleReminder}
                >
                    <View style={styles.settingInfo}>
                        <Text style={styles.settingLabel}>Daily Good Night</Text>
                        <Text style={styles.settingSubLabel}>Receive a notification at 10:00 PM</Text>
                    </View>
                    <View style={[
                        styles.toggle,
                        reminderEnabled && styles.toggleActive
                    ]}>
                        <View style={[
                            styles.toggleThumb,
                            reminderEnabled && styles.toggleThumbActive
                        ]} />
                    </View>
                </Pressable>

                <View style={styles.footerSpacing} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
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
    scrollContent: {
        padding: 24,
    },
    sectionTitle: {
        color: Colors.textMuted,
        fontSize: 14,
        fontFamily: Typography.body,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 20,
    },
    characterCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: 20,
        borderRadius: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedCard: {
        borderColor: Colors.primary,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
    },
    characterIcon: {
        fontSize: 28,
        marginRight: 16,
    },
    characterInfo: {
        flex: 1,
    },
    characterName: {
        color: Colors.text,
        fontSize: 16,
        fontFamily: Typography.bodyBold,
        marginBottom: 4,
    },
    characterDesc: {
        color: Colors.textMuted,
        fontSize: 13,
        fontFamily: Typography.body,
    },
    radio: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: Colors.textMuted,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Colors.primary,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: 20,
        borderRadius: 20,
        marginBottom: 16,
    },
    settingInfo: {
        flex: 1,
    },
    settingLabel: {
        color: Colors.text,
        fontSize: 16,
        fontFamily: Typography.bodyBold,
        marginBottom: 4,
    },
    settingSubLabel: {
        color: Colors.textMuted,
        fontSize: 13,
        fontFamily: Typography.body,
    },
    toggle: {
        width: 44,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#3F3F46',
        padding: 2,
    },
    toggleActive: {
        backgroundColor: Colors.primary,
    },
    toggleThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFF',
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
    },
    footerSpacing: {
        height: 100,
    }
});
