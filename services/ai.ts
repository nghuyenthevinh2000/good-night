import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHARACTERS, CharacterKey } from '@/constants/characters';

// Note: In a production app, this should be handled by a backend (Cloud Function)
// to keep the API key secure. For this implementation, we'll use a placeholder
// but structure it for easy migration to a backend call.
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const generateGoodNightMessage = async (characterId: CharacterKey): Promise<string> => {
    try {
        const character = CHARACTERS.find(c => c.id === characterId) || CHARACTERS[0];
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `${character.prompt}. Keep the message concise (max 2-3 sentences). Do not use quotation marks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Error generating Gemini message:", error);
        // Fallback message
        return "Good night. May your rest be as beautiful as your soul.";
    }
};
