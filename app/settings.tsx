import { StyleSheet, Text, View, ScrollView, Pressable, Modal, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography } from '@/constants/theme';
import { CHARACTERS, CharacterKey } from '@/constants/characters';
import { LANGUAGES } from '@/constants/languages';
import { useAppStore } from '@/store/useAppStore';
import { Ionicons } from '@expo/vector-icons';
import { useNotifications } from '@/hooks/useNotifications';
import { useEffect, useState } from 'react';

export default function SettingsScreen() {
    const router = useRouter();
    const {
        selectedCharacterId,
        setSelectedCharacter,
        selectedLanguage,
        setSelectedLanguage,
        reminderEnabled,
        toggleReminder
    } = useAppStore();
    const { scheduleDailyReminder, cancelNotifications } = useNotifications();
    const [isLanguagePickerVisible, setLanguagePickerVisible] = useState(false);

    const currentLanguage = LANGUAGES.find(l => l.id === selectedLanguage) || LANGUAGES[0];

    useEffect(() => {
        if (reminderEnabled) {
            scheduleDailyReminder('23:00');
        } else {
            cancelNotifications();
        }
    }, [reminderEnabled]);

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

                <Text style={styles.sectionTitle}>App Preferences</Text>

                <View style={styles.settingsGroup}>
                    <Pressable
                        style={[styles.settingRow, styles.groupedSettingTop]}
                        onPress={toggleReminder}
                    >
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingLabel}>Daily Reminder</Text>
                            <Text style={styles.settingSubLabel}>Oriental Medicine best sleep time (11:00 PM)</Text>
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

                    <View style={[styles.settingRow, styles.groupedSettingBottom]}>
                        <View style={styles.settingInfo}>
                            <Text style={[styles.settingLabel, { marginBottom: 0 }]}>Message language</Text>
                        </View>
                        <Pressable
                            style={styles.dropdownTrigger}
                            onPress={() => setLanguagePickerVisible(true)}
                        >
                            <Text style={styles.dropdownValue}>{currentLanguage.nativeName}</Text>
                            <Ionicons name="chevron-down" size={18} color={Colors.textMuted} />
                        </Pressable>
                    </View>
                </View>

                <Modal
                    visible={isLanguagePickerVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setLanguagePickerVisible(false)}
                >
                    <Pressable
                        style={styles.modalOverlay}
                        onPress={() => setLanguagePickerVisible(false)}
                    >
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Select Language</Text>
                                <Pressable onPress={() => setLanguagePickerVisible(false)}>
                                    <Ionicons name="close" size={24} color={Colors.text} />
                                </Pressable>
                            </View>
                            <FlatList
                                data={LANGUAGES}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <Pressable
                                        style={[
                                            styles.languageOption,
                                            selectedLanguage === item.id && styles.languageOptionSelected
                                        ]}
                                        onPress={() => {
                                            setSelectedLanguage(item.id);
                                            setLanguagePickerVisible(false);
                                        }}
                                    >
                                        <View style={styles.languageInfo}>
                                            <Text style={styles.languageNamePrimary}>{item.nativeName}</Text>
                                            <Text style={styles.languageNameSecondary}>{item.name}</Text>
                                        </View>
                                        {selectedLanguage === item.id && (
                                            <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                                        )}
                                    </Pressable>
                                )}
                                contentContainerStyle={styles.languageList}
                            />
                        </View>
                    </Pressable>
                </Modal>

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
    settingsGroup: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        backgroundColor: Colors.surface,
    },
    groupedSettingTop: {
        marginBottom: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    groupedSettingBottom: {
        marginBottom: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
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
    },
    dropdownTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    dropdownValue: {
        color: Colors.text,
        fontSize: 15,
        fontFamily: Typography.body,
        marginRight: 6,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.surface,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        maxHeight: '70%',
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    modalTitle: {
        color: Colors.text,
        fontSize: 18,
        fontFamily: Typography.bodyBold,
    },
    languageList: {
        padding: 16,
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 8,
    },
    languageOptionSelected: {
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
    },
    languageInfo: {
        flex: 1,
    },
    languageNamePrimary: {
        color: Colors.text,
        fontSize: 16,
        fontFamily: Typography.bodyBold,
        marginBottom: 2,
    },
    languageNameSecondary: {
        color: Colors.textMuted,
        fontSize: 13,
        fontFamily: Typography.body,
    }
});
