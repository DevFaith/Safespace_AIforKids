// import { useState } from 'react';
// import { getAnswer, systemContexts } from '../OpenaiService';

// const AISuggestions = ({ addTask }) => {
//   const [aiResponse, setAiResponse] = useState('');
//   const [aiAudio, setAiAudio] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [selectedSubject, setSelectedSubject] = useState('');
//   const [selectedQuestion, setSelectedQuestion] = useState('');

//   // Example placeholder queries
//   const queries = [
//     'What is the capital of France?',
//     'Explain Newton’s laws of motion.',
//     'Describe the water cycle.',
//   ];

//   const handleAISuggestion = async () => {
//     if (!selectedSubject || !selectedQuestion) {
//       alert('Please select a subject and a question.');
//       return;
//     }

//     setLoading(true);
//     const context = systemContexts[selectedSubject];

//     if (!context) {
//       alert('Invalid subject selected.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const { answerText, answerAudio } = await getAnswer(context, selectedQuestion);
//       setAiResponse(answerText);
//       setAiAudio(answerAudio);
//     } catch (error) {
//       console.error('Error getting AI suggestion:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {/* Subject Selection */}
//       <div>
//         <label htmlFor="subject">Choose a subject:</label>
//         <select
//           id="subject"
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//         >
//           <option value="">Select a subject</option>
//           {systemContexts &&
//             Object.keys(systemContexts).map((subject) => (
//               <option key={subject} value={subject}>
//                 {subject.charAt(0).toUpperCase() + subject.slice(1)}
//               </option>
//             ))}
//         </select>
//       </div>

//       {/* Question Selection */}
//       <div>
//         <label htmlFor="question">Choose a question:</label>
//         <select
//           id="question"
//           value={selectedQuestion}
//           onChange={(e) => setSelectedQuestion(e.target.value)}
//         >
//           <option value="">Select a question</option>
//           {queries.map((question, index) => (
//             <option key={index} value={question}>
//               {question}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Button to Trigger AI Suggestion */}
//       <button onClick={handleAISuggestion} disabled={loading}>
//         {loading ? 'Loading...' : 'Get AI Task Suggestion'}
//       </button>

//       {/* AI Response Display */}
//       {aiResponse && (
//         <div>
//           <p>AI Suggestion: {aiResponse}</p>
//           {aiAudio && (
//             <audio controls autoPlay>
//               <source src={aiAudio} type="audio/mp3" />
//               Your browser does not support the audio element.
//             </audio>
//           )}
//           <button onClick={() => addTask(aiResponse)}>Add Suggested Task</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AISuggestions;
function AISuggestions() {
  return (
    <div>AISuggestions</div>
  )
}
export default AISuggestions