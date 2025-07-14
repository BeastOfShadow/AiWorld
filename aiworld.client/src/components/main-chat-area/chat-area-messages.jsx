import React, { useState, useRef, useEffect } from "react";
import {
  Star,
} from "lucide-react";

const ChatAreaMessages = ({
  CurrentMessages,
  IsLoading,
  RenderMessage,
  MessagesEndRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        {CurrentMessages.map(RenderMessage)}

        {IsLoading && (
          <div className="flex justify-start mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-800 rounded-2xl px-4 py-3 border border-gray-700">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={MessagesEndRef} />
      </div>
    </div>
  );
};

export default ChatAreaMessages;