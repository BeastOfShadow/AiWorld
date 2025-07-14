import React, { useState, useRef, useEffect } from "react";
import {
  Send,
} from "lucide-react";

const ChatAreaInputArea = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  isLoading,
  inputRef,
}) => {
  return (

    <div className="p-6 bg-gray-900/60 backdrop-blur-xl border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <div className="bg-gray-800 rounded-xl border border-gray-700 focus-within:border-blue-500 transition-colors">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Scrivi un messaggio ad AIWorld..."
                className="w-full bg-transparent text-white placeholder-gray-400 p-4 resize-none focus:outline-none min-h-[60px] max-h-32"
                rows={1}
              />
            </div>
            <div className="flex items-center justify-between mt-2 px-2">
              <p className="text-xs text-gray-500">
                Premi Invio per inviare, Shift+Invio per andare a capo
              </p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  {inputValue.length}/2000
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white p-3 rounded-xl transition-all disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAreaInputArea;