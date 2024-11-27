import { useState, useEffect } from "react";
import { getAnswer, systemContexts } from "../OpenaiService";

const VoiceHandler = () => {
  const [isListening, setIsListening] = useState(false);
  const [question, setQuestion] = useState("");
  const [responseText, setResponseText] = useState("");
  const [responseAudio, setResponseAudio] = useState("");
  const [synth, setSynth] = useState(null);

  useEffect(() => {
    const speechSynth = window.speechSynthesis;
    setSynth(speechSynth);
  }, []);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setQuestion(speechToText);
      fetchResponse(speechToText);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const fetchResponse = async (userQuestion) => {
    try {
      setResponseText("Thinking...");
      const { answerText, answerAudio } = await getAnswer(systemContexts.friend, userQuestion);
      setResponseText(answerText);

      if (answerAudio) {
        setResponseAudio(answerAudio);
        playAudio(answerAudio);
      } else {
        speakResponse(answerText);
      }
    } catch (error) {
      setResponseText("Oops, something went wrong. Try again!");
    }
  };

  const speakResponse = (text) => {
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = synth.getVoices();
      utterance.voice = voices.find((voice) => voice.name.includes("Google UK English Female")) || voices[0];
      synth.speak(utterance);
    }
  };

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <button
        onClick={startListening}
        className={`p-4 rounded-full bg-blue-500 text-white shadow-lg ${
          isListening ? "animate-pulse" : ""
        }`}
      >
        🎤 {isListening ? "Listening..." : "Ask me a question!"}
      </button>

      <div className="text-center">
        <p className="text-xl text-blue-600">{question && `You asked: ${question}`}</p>
        <p className="text-lg text-gray-700">{responseText && `AI says: ${responseText}`}</p>
      </div>
    </div>
  );
};

export default VoiceHandler;
