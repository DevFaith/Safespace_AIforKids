import React, { useState } from 'react';
import { getAnswer, systemContexts, queries } from '../OpenaiService';

const AISuggestions = ({ addTask }) => {
  const [aiResponse, setAiResponse] = useState('');
  const [aiAudio, setAiAudio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState('');

  const handleAISuggestion = async () => {
    if (!selectedSubject || !selectedQuestion) {
      alert('Please select a subject and a question.');
      return;
    }

    setLoading(true);
    const context = systemContexts[selectedSubject];

    try {
      const { answerText, answerAudio } = await getAnswer(context, selectedQuestion);
      setAiResponse(answerText);
      setAiAudio(answerAudio);
    } catch (error) {
      console.error("Error getting AI suggestion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="subject">Choose a subject:</label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="">Select a subject</option>
          {Object.keys(systemContexts).map((subject) => (
            <option key={subject} value={subject}>
              {subject.charAt(0).toUpperCase() + subject.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="question">Choose a question:</label>
        <select
          id="question"
          value={selectedQuestion}
          onChange={(e) => setSelectedQuestion(e.target.value)}
        >
          <option value="">Select a question</option>
          {queries.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAISuggestion} disabled={loading}>
        {loading ? 'Loading...' : 'Get AI Task Suggestion'}
      </button>
      {aiResponse && (
        <div>
          <p>AI Suggestion: {aiResponse}</p>
          {aiAudio && (
            <audio controls autoPlay>
              <source src={aiAudio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          )}
          <button onClick={() => addTask(aiResponse)}>Add Suggested Task</button>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;
