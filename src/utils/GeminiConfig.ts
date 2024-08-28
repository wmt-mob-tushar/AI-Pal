import * as GoogleGenerativeAI from '@google/generative-ai';
import { GEMINI_API_KEY } from "src/appUtils";
import RNFS from 'react-native-fs'

const GeminiConfig = () => {
    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(GEMINI_API_KEY);
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };
    return {
        genAI,
        generationConfig
    }
}
// : Promise<{ fileData: FileData }> 
const fileToGenerativePart = async (path: string, mimeType: string) => {
    try {
        const fileContent = await RNFS.readFile(path, 'base64');
        return {
            inlineData: {
                data: fileContent,
                mimeType,
            },
        };
    } catch (error) {
        console.error('Error reading file:', error);
        throw error;
    }
}

export {
    GeminiConfig,
    fileToGenerativePart
}

