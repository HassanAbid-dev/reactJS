import React from "react";
import { useState } from "react";

const App = () => {
  const [color, setColor] = useState("olive-300");
  const gradient_background = () => {
    setColor("gradient-to-r from-blue-500 to-purple-500");
  };
  return (
    <>
      <div
        className={`w-full h-screen bg-${color} flex justify-center items-end gap-5 duration-100`}
      >
        <div className="flex flex-wrap justify-center items-end gap-3 p-2 mb-10 bg-white rounded-lg">
          <button
            className="bg-red-700  text-white py-2 px-4 rounded"
            onClick={() => setColor("red-700")}
          >
            Red
          </button>
          <button
            className="bg-black text-white py-2 px-4 rounded"
            onClick={() => setColor("black")}
          >
            Black
          </button>
          <button
            className="bg-green-700 text-white py-2 px-4 rounded"
            onClick={() => setColor("green-700")}
          >
            Green
          </button>
          <button
            className="bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => setColor("blue-700")}
          >
            Blue
          </button>
          <button
            className="bg-purple-700 text-white py-2 px-4 rounded"
            onClick={() => setColor("purple-700")}
          >
            Purple
          </button>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded"
            onClick={() => gradient_background()}
          >
            Gradient Background
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
