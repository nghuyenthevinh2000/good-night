import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CharacterKey, CHARACTERS } from '@/constants/characters';
import { LanguageKey } from '@/constants/languages';

interface AppState {
    selectedCharacterId: CharacterKey;
    selectedLanguage: LanguageKey;
    currentMessage: string;
    isLoading: boolean;
    reminderEnabled: boolean;

    setSelectedCharacter: (id: CharacterKey) => void;
    setSelectedLanguage: (id: LanguageKey) => void;
    setCurrentMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    toggleReminder: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            selectedCharacterId: 'romantic',
            selectedLanguage: 'en',
            currentMessage: "Good Night, BMad. May your dreams be filled with peace and wonder.",
            isLoading: false,
            reminderEnabled: true,

            setSelectedCharacter: (id) => set({ selectedCharacterId: id }),
            setSelectedLanguage: (id) => set({ selectedLanguage: id }),
            setCurrentMessage: (message) => set({ currentMessage: message }),
            setLoading: (loading) => set({ isLoading: loading }),
            toggleReminder: () => set((state) => ({ reminderEnabled: !state.reminderEnabled })),
        }),
        {
            name: 'good-night-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                selectedCharacterId: state.selectedCharacterId,
                selectedLanguage: state.selectedLanguage,
                currentMessage: state.currentMessage
            }),
        }
    )
);
