const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
    "Content-Type": "application/json",
};

const getAudioResponse = async (text) => {
    const apiUrl = "https://api.openai.com/v1/audio/speech";

    const body = JSON.stringify({
        model: "tts-1",
        input: text,
        voice: "alloy",
    });

    try {
        console.log(`Sending audio request to: ${apiUrl}`);
        const response = await fetch(apiUrl, { method: "POST", headers, body });
        console.log(`Audio response status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`Audio API request failed: ${response.statusText}`);
        }
        const audioBlob = await response.blob();
        console.log("AUDIO BLOB:", audioBlob);
        return URL.createObjectURL(audioBlob);
    } catch (error) {
        console.error("Error fetching audio response:", error);
        throw error;
    }
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
        console.log(`Sending text request to: ${apiUrl}`);
        const response = await fetch(apiUrl, { method: "POST", headers, body });
        console.log(`Text response status: ${response.status}`);
        if (!response.ok) {
            throw new Error(`Text API request failed: ${response.statusText}`);
        }
        const resJSON = await response.json();
        console.log("RES JSON:", resJSON);
        const ans = resJSON.choices[0].message.content;
        console.log("ANS JSON:", ans);
        return ans;
    } catch (error) {
        console.error("Error fetching text response:", error);
        throw error;
    }
};

export const getAnswer = async (context, query) => {
    try {
        console.log("Getting text answer...");
        const answerText = await getTextResponse(context, query);
        console.log("ANS TXT:", answerText);
        console.log("Getting audio answer...");
        const answerAudio = await getAudioResponse(answerText);
        return { answerText, answerAudio };
    } catch (error) {
        console.error("Error getting answer:", error);
        return { answerText: '', answerAudio: '' }; // Return empty values in case of error
    }
};

export const systemContexts = {
    astrophysics: "you are a science tutor astute in astrophysics for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    biology: "you are a biology tutor for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    chemistry: "you are a chemistry tutor for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    earth: "you are an earth science tutor for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    history: "you are a history tutor for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    math: "you are a math tutor for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    physics: "you are a physics tutor for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    social: "you are a social studies tutor for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    therapy: "you are a therapist for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    tutoring: "you are a tutor for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    writing: "you are a writing tutor for young minds. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
    friend: "you are a friend to a young person. You are asked a question by a student. Respond as you would to a student in a classroom. Format your response as a spoken answer in JSON format.",
}

export const queries = [
    "I am curious about Saturn's noon titan. Do you think we will find life there? What other places might there be life in the solar system?",
    "What is the difference between a star and a planet?",
    "How do we know the age of the universe?",
    "What is the difference between a meteor and a meteorite?",
    "What is the difference between a comet and an asteroid?",
    "What is the difference between a galaxy and a solar system?",
    "What is the difference between a black hole and a wormhole?",
    // for a friend
    "I am feeling really sad today. I don't know what to do.",
];
