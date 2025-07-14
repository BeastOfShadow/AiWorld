import React, { useState, useRef, useEffect } from "react";

import ChatAreaHeader from "./chat-area-header.jsx";
import ChatAreaMessages from "./chat-area-messages.jsx";
import ChatAreaInputArea from "./chat-area-input-area.jsx";

const ChatArea = ({
  currentChat,
  isLoading,
  handleSendMessage,
  inputValue,
  setInputValue,
  sidebarOpen,
  setSidebarOpen,
  renderMessage,
  messagesEndRef,
  inputRef,
  currentMessages = [],
}) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <ChatAreaHeader
        CurrentChat={currentChat}
        SetSidebarOpen={setSidebarOpen}
        SidebarOpen={sidebarOpen}
      />

      {/* Messages */}
      <ChatAreaMessages
        CurrentMessages={currentMessages}
        IsLoading={isLoading}
        RenderMessage={renderMessage}
        MessagesEndRef={messagesEndRef}
      />

      {/* Input Area */}
      <ChatAreaInputArea
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        inputRef={inputRef}
      />
    </div>
  );
};

export default ChatArea;
