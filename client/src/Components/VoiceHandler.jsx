import 'regenerator-runtime/runtime';
import { useState, useEffect, useCallback, memo } from "react";
import { getAnswer, systemContexts } from "../OpenaiService";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { db } from "../Firebase/Config";
import { collection, addDoc } from "firebase/firestore";
import Micro from '../assets/micro.png';
import WorkingSpace from './WorkingSpace'; // Import the WorkingSpace component

const VoiceHandler = () => {
  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [userName, setUserName] = useState("");
  const [hasAskedName, setHasAskedName] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responseAudio, setResponseAudio] = useState("");
  const [synth, setSynth] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // For controlling what is shown: Chatbot vs. Working Space
  const [isChatComplete, setIsChatComplete] = useState(false);

  // Function to handle text-to-speech
  const speakResponse = useCallback(
    (text) => {
      if (synth) {
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = synth.getVoices();
        utterance.voice = voices.find((voice) => voice.name.includes("Google UK English Female")) || voices[0];
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false); // Stop animation after speaking
        synth.speak(utterance);
      }
    },
    [synth]
  );

  // Function to play audio
  const playAudio = useCallback((audioUrl) => {
    const audio = new Audio(audioUrl);
    setIsSpeaking(true);
    audio.onended = () => setIsSpeaking(false); // Stop animation after audio ends
    audio.play();
  }, []);

  // Start listening function
  const startListening = useCallback(() => {
    SpeechRecognition.startListening({ continuous: true });
  }, []);

  // Save user name to Firebase
  const saveUserName = async (name) => {
    try {
      await addDoc(collection(db, "users"), { name });
      console.log("User name saved:", name);
    } catch (error) {
      console.error("Error saving name to Firebase:", error);
    }
  };

  // Process input and responses
  const processInput = useCallback(() => {
    const handleInput = async () => {
      if (!listening && transcript?.length > 0) {
        if (!hasAskedName) {
          // Handle asking for name
          const userName = transcript.trim();
          setUserName(userName);
          saveUserName(userName);
          speakResponse(`Hello ${userName}, how can I help you today?`);
          setHasAskedName(true);
        } else {
          // Handle other queries after name is provided
          try {
            setResponseText("Thinking...");
            const { answerText, answerAudio } = await getAnswer(systemContexts.friend, transcript);
            setResponseText(answerText);

            if (answerAudio) {
              // If answerAudio is available, use it
              playAudio(answerAudio);
            } else {
              // If no audio, use text-to-speech
              speakResponse(answerText);
            }
          } catch (error) {
            console.error("Error fetching response: ", error);
            setResponseText("Oops, something went wrong. Try again!");
          }
        }
        resetTranscript();
      }
    };
    handleInput();
  }, [listening, hasAskedName, transcript, playAudio, resetTranscript, speakResponse]);

  useEffect(() => {
    const speechSynth = window.speechSynthesis;
    setSynth(speechSynth);
  }, []);

  useEffect(processInput, [listening, processInput]);

  useEffect(() => {
    if (!hasAskedName) {
      speakResponse("Hello! What's your name?");
    }
  }, [hasAskedName, speakResponse]);

  useEffect(() => {
    if (responseText && !isSpeaking) {
      // Transition to the WorkingSpace once the chatbot completes its response
      setIsChatComplete(true);
    }
  }, [responseText, isSpeaking]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div>
        {!browserSupportsSpeechRecognition && <span>{`Browser doesn't support speech recognition.`}</span>}
        {browserSupportsSpeechRecognition && (
          <>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button
              onTouchStart={startListening}
              onMouseDown={startListening}
              onTouchEnd={SpeechRecognition.stopListening}
              onMouseUp={SpeechRecognition.stopListening}
            >
              Hold to talk
            </button>
            <p>{transcript}</p>
          </>
        )}
      </div>

      {/* Microphone Image Section */}
      <div className={`flex items-center justify-center ${isSpeaking ? "animate-pulse" : ""}`}>
        <img
          src={Micro}
          alt="Microphone"
          className="w-32 h-32"
        />
      </div>

      {/* Chatbot Response */}
      <div className="text-center">
        <p className="text-xl text-blue-600">{userName && `Hello ${userName}, how can I assist you today?`}</p>
        <p className="text-lg text-gray-700">{responseText && `AI says: ${responseText}`}</p>
      </div>

      {/* Transition to WorkingSpace after chat */}
      {isChatComplete && <WorkingSpace question="What would you like to do next?" response={responseText} />}
    </div>
  );
};

export default memo(VoiceHandler);
