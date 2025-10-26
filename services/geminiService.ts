import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { CategoryInfo, QuizQuestion } from '../types';

// Fix: Initialize the GoogleGenAI client according to the guidelines.
// This is defined outside the function to avoid re-initialization on every call.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Fix: Define a schema to ensure the Gemini API returns data in a structured JSON format.
const schema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "A catchy title about the animal category."
        },
        summary: {
            type: Type.STRING,
            description: "A simple, one-paragraph summary suitable for a young child, around 2-3 sentences."
        },
        funFact: {
            type: Type.STRING,
            description: "An interesting and easy-to-understand fun fact."
        },
        examples: {
            type: Type.ARRAY,
            description: "A list of 3-5 example animals from this category.",
            items: {
                type: Type.STRING
            }
        },
        imagePrompts: {
            type: Type.ARRAY,
            description: "A list of 5 descriptive prompts for generating photorealistic images of different example animals from the category. E.g., 'A photograph of a lion roaring in the savanna.'",
            items: {
                type: Type.STRING
            }
        }
    },
    required: ["title", "summary", "funFact", "examples", "imagePrompts"]
};

const quizSchema = {
    type: Type.OBJECT,
    properties: {
        question: {
            type: Type.STRING,
            description: "A simple multiple-choice question about the topic, suitable for a child."
        },
        options: {
            type: Type.ARRAY,
            description: "An array of 4 possible answers (strings). One must be correct.",
            items: {
                type: Type.STRING
            }
        },
        correctAnswerIndex: {
            type: Type.INTEGER,
            description: "The 0-based index of the correct answer in the 'options' array."
        }
    },
    required: ["question", "options", "correctAnswerIndex"]
};


// Fix: Implement the function to generate content using the Gemini API.
export const generateScienceContent = async (category: string): Promise<CategoryInfo> => {
    const prompt = `Tell me about ${category} in a fun and simple way for a young child. Provide a title, a short summary, a fun fact, a few examples, and 5 image generation prompts.`;

    try {
        // Fix: Call the Gemini API using the recommended `ai.models.generateContent` method.
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Use a suitable model for the task.
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        // Fix: Extract the text response and parse it as JSON.
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as CategoryInfo;

    } catch (error) {
        console.error("Error generating content from Gemini API:", error);
        throw new Error("Failed to fetch content from the API.");
    }
};

export const generateQuiz = async (categoryName: string, facts: string): Promise<QuizQuestion> => {
    const prompt = `Create one simple multiple-choice quiz question for a child based on these facts about ${categoryName}: ${facts}. The question should be easy to understand. Provide 4 options and identify the correct one.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as QuizQuestion;
    } catch (error) {
        console.error("Error generating quiz from Gemini API:", error);
        throw new Error("Failed to generate a quiz question.");
    }
};

export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: prompt }],
          },
          config: {
              responseModalities: [Modality.IMAGE],
          },
        });

        const candidate = response.candidates?.[0];
        // Safely check for content and parts to prevent TypeError
        if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
                // Safely check for inlineData and the data itself
                if (part.inlineData?.data) {
                    const base64ImageBytes: string = part.inlineData.data;
                    return `data:image/png;base64,${base64ImageBytes}`;
                }
            }
        }
        // Throw an error if no image data is found (e.g., due to safety filters)
        throw new Error("No image data found in API response. The request may have been blocked.");

    } catch (error) {
        // Log and re-throw the error to preserve details for the calling function
        console.error(`Error generating image for prompt "${prompt}":`, error);
        throw error;
    }
};