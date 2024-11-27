const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
};

const getTextResponse = async (systemContext, question) => {
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const body = JSON.stringify({
        model: "gpt-4",
        messages: [
            { role: "system", content: systemContext },
            { role: "user", content: question },
        ],
    });

    try {
        const response = await fetch(apiUrl, { method: "POST", headers, body });
        if (!response.ok) {
            throw new Error(`Text API request failed: ${response.statusText}`);
        }
        const resJSON = await response.json();
        return resJSON.choices[0].message.content; // Return only the text response
    } catch (error) {
        console.error("Error fetching text response:", error);
        throw error;
    }
};

const getAudioResponse = async (text) => {
    const apiUrl = "https://api.openai.com/v1/audio/speech";

    const body = JSON.stringify({
        model: "tts-1",
        input: text,
        voice: "alloy",
    });

    try {
        const response = await fetch(apiUrl, { method: "POST", headers, body });
        if (!response.ok) {
            throw new Error(`Audio API request failed: ${response.statusText}`);
        }
        const audioBlob = await response.blob();
        return URL.createObjectURL(audioBlob); // Return audio URL
    } catch (error) {
        console.error("Error fetching audio response:", error);
        throw error;
    }
};

export const getAnswer = async (context, query) => {
    try {
        const answerText = await getTextResponse(context, query);
        const answerAudio = await getAudioResponse(answerText);
        return { answerText, answerAudio };
    } catch (error) {
        console.error("Error getting answer:", error);
        return { answerText: '', answerAudio: '' }; // Return empty values in case of error
    }
};

export const systemContexts = {
    friend: "You are a helpful and friendly chatbot designed for children. Respond to questions in a way that is easy for kids to understand. Keep answers short, friendly, and engaging.",
};
