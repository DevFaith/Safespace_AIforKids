import  { useState, useEffect } from "react";
import VoiceHandler from "./Components/VoiceHandler";
import WorkingSpace from "./Components/WorkingSpace";
import AISuggestions from "./Components/AISuggestions";

const App = () => {
  const [user, setUser] = useState(null); // Store user info
  const [question, setQuestion] = useState(""); // AI's current question
  const [response, setResponse] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!user) {
      setQuestion("Hi there! What's your name?");
    }
  }, [user]);

  const handleVoiceInput = async (userInput) => {
    setIsSpeaking(true);

    // Handle onboarding questions
    if (!user) {
      if (!user?.name) {
        setUser({ name: userInput });
        setQuestion("Nice to meet you! How old are you?");
      } else if (!user?.age) {
        setUser((prev) => ({ ...prev, age: userInput }));
        setQuestion("Great! Let's get started! Ask me anything.");
      }
      setIsSpeaking(false);
      return;
    }

    // If user is set, process AI question
    const res = await fetch("http://localhost:5000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userInput }),
    });
    const data = await res.json();

    setResponse(data.answer);
    setIsSpeaking(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      
      <div className="flex-1 flex justify-center items-center">
        <VoiceHandler isSpeaking={isSpeaking} onClick={() => handleVoiceInput(prompt("Speak your answer:"))} />
      </div>
      <div className="w-full h-1/4 bg-white p-4">
        <WorkingSpace question={question} response={response} />
      </div>
      <AISuggestions />
    </div>
  );
};

export default App;
