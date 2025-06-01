import React, { useState } from "react";
import { GoogleGenAI } from "@google/genai";

function formatMarkdownToHTML(text) {
  if (!text) return "";
  text = text.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  text = text.replace(/\*(?!\*)(.+?)\*/g, "<em>$1</em>");
  text = text.replace(/\n/g, "<br>");
  return text;
}

function App() {
  console.log(import.meta.env.VITE_API_KEY);
  const [text, setText] = useState("");
  const [aiAnswer, setAiAnswer] = useState("Hello! How can I help you today?");

  const ai = new GoogleGenAI({
    apiKey:import.meta.env.VITE_API_KEY
  });

  async function main(question) {
    setAiAnswer("Responding...");
    console.log("main call");
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: question,
    });
    setAiAnswer(response.text);
  }

return (
  <div className="h-screen w-[90%] max-w-4xl mx-auto flex flex-col items-center justify-start bg-gray-900 p-5 rounded-3xl shadow-xl text-white">
    
    <h1 className="text-3xl font-bold text-white mt-10 mb-5">chatBot</h1>
    
    <div className="w-full relative mb-6">
      <textarea
        placeholder="Enter your query..."
        className="bg-gray-800 text-white border-2 border-gray-700 w-full p-5 pr-24 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px] resize-none"
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></textarea>
      <button
        className="bg-indigo-600 hover:bg-indigo-500 text-white absolute right-4 bottom-4 px-4 py-2 rounded-xl transition-all duration-200 shadow-md"
        onClick={() => main(text)}
      >
        Search
      </button>
    </div>

    <div className="w-auto bg-gray-800 border-2 border-gray-700 p-6 rounded-xl shadow-md overflow-auto text-gray-200 leading-relaxed">
      <div dangerouslySetInnerHTML={{ __html: formatMarkdownToHTML(aiAnswer) }} />
    </div>

  </div>
);


}

export default App;
