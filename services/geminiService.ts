
import { GoogleGenAI, Chat } from '@google/genai';
import { AIMA_SYSTEM_INSTRUCTION } from '../constants';

let ai: GoogleGenAI | null = null;

const getAIInstance = () => {
    if (!ai) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};

export const initializeChat = (): Chat => {
    const aiInstance = getAIInstance();
    return aiInstance.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: AIMA_SYSTEM_INSTRUCTION,
        },
    });
};

export const getAimaResponse = async (chat: Chat, prompt: string): Promise<string> => {
    try {
        const result = await chat.sendMessage({ message: prompt });
        const responseText = result.text;
        if (!responseText) {
            throw new Error('Empty response from API');
        }
        return responseText;
    } catch (error) {
        console.error("Error getting response from Gemini:", error);
        throw new Error("Failed to get a response from Aima.");
    }
};
