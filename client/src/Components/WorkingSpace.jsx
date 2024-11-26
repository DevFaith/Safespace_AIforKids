import React, { useState, useRef } from "react";

const WorkingSpace = ({ question, response }) => {
  const [notes, setNotes] = useState("");
  const canvasRef = useRef(null);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gray-100 rounded-lg p-4">
      <div className="text-xl text-blue-600 font-semibold mb-4">{question}</div>
      {response && <div className="text-lg text-gray-700 mb-4">{response}</div>}

      {/* Drawing Section */}
      <canvas ref={canvasRef} width={300} height={200} className="border border-gray-300 mb-4" />

      <button
        className="px-4 py-2 bg-red-500 text-white rounded-md mb-4"
        onClick={handleClearCanvas}
      >
        Clear Drawing
      </button>

      {/* Notes Section */}
      <textarea
        className="w-full h-20 border border-gray-300 rounded-md p-2"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Take notes here..."
      ></textarea>
    </div>
  );
};

export default WorkingSpace;
