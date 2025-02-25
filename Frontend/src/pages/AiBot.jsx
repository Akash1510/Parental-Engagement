import React, { useState } from "react";
import { motion } from "framer-motion";

const AIBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, user: true }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "I'm here to help! How can I assist you?", user: false }]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 ">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-center text-[#00B6BA] mb-4">EduConnect AI Bot</h2>
        <div className="h-64 overflow-y-auto border p-4 rounded-lg bg-gray-50 flex flex-col">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`p-2 my-1 rounded-lg max-w-xs ${msg.user ? 'bg-[#00B6BA] text-white self-end' : 'bg-gray-200 text-gray-800 self-start'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex mt-4 w-full">
          <input 
            type="text" 
            className="flex-1 p-2 border rounded-l-lg focus:outline-none text-sm sm:text-base" 
            placeholder="Ask me anything..." 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            className="bg-[#00B6BA] text-white px-3 sm:px-4 py-2 rounded-r-lg hover:bg-[#008A8E] transition text-sm sm:text-base" 
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AIBot;
