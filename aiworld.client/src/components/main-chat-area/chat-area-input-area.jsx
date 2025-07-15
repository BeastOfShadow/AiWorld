import React, { useRef, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ChatAreaInputArea = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  isLoading,
  inputRef,
}) => {
  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      const maxHeight = 400; 
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, maxHeight)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-900/60 backdrop-blur-xl border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-xl border border-gray-700 focus-within:border-blue-500 transition-colors">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleChange}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Send a prompt to AIWorld..."
            className="w-full bg-transparent text-white placeholder-gray-400 p-4 resize-none focus:outline-none min-h-[60px] overflow-y-auto"
            rows={1}
          />

          {/* Footer con pulsante e conteggio caratteri */}
          <div className="flex items-center justify-between px-4 pb-2">
            <span className={`text-small ${inputValue.length > 2000 ? 'text-red-400' : 'text-gray-500'}`}>
              {inputValue.length}/2000
            </span>

            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className={`p-2 rounded-full transition-all flex items-center justify-center w-10 h-10
                ${!inputValue.trim() || isLoading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'}`}
            >
              <ArrowUp className="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAreaInputArea;