const { GoogleGenerativeAI } = require("@google/generative-ai");

// Fetch API key from environment or use a placeholder if you want to run it directly
// Note: You will need to export your key in the terminal before running this script if you rely on process.env
// e.g., export EXPO_PUBLIC_GEMINI_API_KEY="your_key_here"
const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY || GEMINI_API_KEY === 'PLACEHOLDER') {
    console.error("Please set EXPO_PUBLIC_GEMINI_API_KEY environment variable.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function listModels() {
    try {
        console.log("Listing available models...");
        // Since the JS SDK doesn't expose listModels directly on the main class in all versions, 
        // we might just try to generate content with a known fallback like 'gemini-pro' first to test connectivity,
        // but let's try to hit the REST API endpoint manually if the SDK doesn't support it cleanly,
        // FIXME: The JS SDK *does* support getting a model, but listing them is often done via direct API calls or specific manager classes depending on version.
        // Let's assume standard behavior or just print what we can find.

        // Actually, the SDK doesn't have a direct `listModels` method on the `GoogleGenerativeAI` instance in the current version docs typically.
        // It is usually on a `ModelServiceClient` or similar in other languages.
        // For the quick fix, let's just try to generate with 'gemini-pro' and 'gemini-1.5-flash' and see which succeeds.

        const modelsToTest = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-pro", "gemini-1.0-pro"];

        for (const modelName of modelsToTest) {
            console.log(`Testing model: ${modelName}`);
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello, are you there?");
                const response = await result.response;
                console.log(`SUCCESS: ${modelName} responded: ${response.text()}`);
            } catch (error) {
                console.log(`FAILED: ${modelName} - ${error.message}`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
