import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CharacterKey, CHARACTERS } from '@/constants/characters';
import { LanguageKey } from '@/constants/languages';

export interface SavedMessage {
    id: string;
    text: string;
    characterId: CharacterKey;
    timestamp: number;
}

interface AppState {
    selectedCharacterId: CharacterKey;
    selectedLanguage: LanguageKey;
    currentMessage: string;
    isLoading: boolean;
    reminderEnabled: boolean;
    savedMessages: SavedMessage[];
    isViewingSaved: boolean;

    setSelectedCharacter: (id: CharacterKey) => void;
    setSelectedLanguage: (id: LanguageKey) => void;
    setCurrentMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    toggleReminder: () => void;
    saveMessage: (text: string, characterId: CharacterKey) => void;
    viewSavedMessage: (message: SavedMessage) => void;
    clearViewingSaved: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            selectedCharacterId: 'guru',
            selectedLanguage: 'en',
            currentMessage: "Good Night, friend. May your dreams be filled with peace and wonder.",
            isLoading: false,
            reminderEnabled: true,
            savedMessages: [],
            isViewingSaved: false,

            setSelectedCharacter: (id) => set({ selectedCharacterId: id }),
            setSelectedLanguage: (id) => set({ selectedLanguage: id }),
            setCurrentMessage: (message) => set({ currentMessage: message }),
            setLoading: (loading) => set({ isLoading: loading }),
            toggleReminder: () => set((state) => ({ reminderEnabled: !state.reminderEnabled })),
            saveMessage: (text, characterId) => set((state) => {
                // Avoid duplicates
                if (state.savedMessages.some(m => m.text === text)) return state;

                const newMessage: SavedMessage = {
                    id: Date.now().toString(),
                    text,
                    characterId,
                    timestamp: Date.now(),
                };
                return { savedMessages: [newMessage, ...state.savedMessages] };
            }),
            viewSavedMessage: (message) => set({
                currentMessage: message.text,
                selectedCharacterId: message.characterId,
                isViewingSaved: true
            }),
            clearViewingSaved: () => set({ isViewingSaved: false }),
        }),
        {
            name: 'good-night-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                selectedCharacterId: state.selectedCharacterId,
                selectedLanguage: state.selectedLanguage,
                currentMessage: state.currentMessage,
                savedMessages: state.savedMessages,
            }),
        }
    )
);
