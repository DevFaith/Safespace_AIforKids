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

    const response = await fetch(apiUrl, { method: "POST", headers, body });
    let audioBlob = await response.blob();
    console.log("AUDIO BLOB:", audioBlob);
    return URL.createObjectURL(audioBlob);
};
// Make a POST request using the Fetch API
const getTextResponse = async (systemContext, question) => fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    body: JSON.stringify({
        model: "gpt-4o",
        response_format: {
            type: "json_object",
        },
        messages: [
            {
                role: "system",
                content: systemContext
            },
            {
                role: "user",
                content: question,
            },
        ],
    }), headers
})
    .then(async (response) => {
        if (!response.ok) throw new Error(response.body);
        const resJSON = await response.json();
        console.log("RES JSON:", resJSON);
        let ans = JSON.parse(resJSON.choices[0].message.content).response;
        console.log("ANS JSON:", ans);
        return ans;
    })
    .catch((error) => console.error("Error:", error));

export const getAnswer = async (context, query) => {
    const answerText = await getTextResponse(context, query)
    console.log("ANS TXT:", answerText);
    const answerAudio = await getAudioResponse(answerText)
    return ({ answerText, answerAudio, })
}
