import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CharacterKey, CHARACTERS } from '@/constants/characters';

interface AppState {
    selectedCharacterId: CharacterKey;
    currentMessage: string;
    isLoading: boolean;
    reminderEnabled: boolean;

    setSelectedCharacter: (id: CharacterKey) => void;
    setCurrentMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    toggleReminder: () => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            selectedCharacterId: 'romantic',
            currentMessage: "Good Night, BMad. May your dreams be filled with peace and wonder.",
            isLoading: false,
            reminderEnabled: true,

            setSelectedCharacter: (id) => set({ selectedCharacterId: id }),
            setCurrentMessage: (message) => set({ currentMessage: message }),
            setLoading: (loading) => set({ isLoading: loading }),
            toggleReminder: () => set((state) => ({ reminderEnabled: !state.reminderEnabled })),
        }),
        {
            name: 'good-night-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({
                selectedCharacterId: state.selectedCharacterId,
                currentMessage: state.currentMessage
            }),
        }
    )
);
