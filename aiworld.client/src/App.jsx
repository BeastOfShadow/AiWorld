import React, { useState, useRef, useEffect } from "react";
import {
  Star,
} from "lucide-react";

import Sidebar from "./components/sidebar/sidebar.jsx";
import ChatArea from "./components/main-chat-area/chat-area.jsx";
import { getChats, createChat } from "./functions/chats/chat-functions.jsx";

const App = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadChats = async () => {
      const chatsData = await getChats();
      setChats(chatsData);
    };

    loadChats();
  }, []);

  const [messages, setMessages] = useState([
    {
      id: 1,
      chatId: 1,
      role: "assistant",
      content:
        "Ciao! Benvenuto in **AIWorld** 🌌\n\nSono il tuo assistente AI personale. Posso aiutarti con:\n- Programmazione e sviluppo\n- Analisi dati e ricerca\n- Scrittura creativa\n- Risoluzione problemi\n\nCosa posso fare per te oggi?",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [currentChatId, setCurrentChatId] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentMessages = messages.filter(
    (msg) => msg.chatId === currentChatId
  );
  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.preview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      chatId: currentChatId,
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simula risposta AI con streaming
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        chatId: currentChatId,
        role: "assistant",
        content: `Grazie per la tua domanda! Questa è una risposta simulata dal sistema AI di AIWorld. \n\nIn una implementazione reale, qui vedrai le risposte dal modello AI locale che hai configurato (Ollama, Llama.cpp, ecc.).\n\n**Funzionalità implementate:**\n- Chat in tempo reale\n- Gestione sidebar\n- Ricerca nello storico\n- Interfaccia responsive\n- Tema spaziale\n\n*Connessione al backend in arrivo...*`,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
              ...chat,
              preview: userMessage.content.substring(0, 50) + "...",
              lastAccessed: new Date().toISOString(),
            }
            : chat
        )
      );
    }, 1500);
  };

  const createNewChat = async () => {
    const newChat = {
      title: `New Chat ${chats.length + 1}`,
      createdAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
      preview: "New conversation...",
      modelUsed: "Llama-3.1-8B",
    };
    try {
      const savedChat = await createChat(newChat); // Chiami l'API che restituisce l'oggetto con l'ID
      setChats((prev) => [savedChat, ...prev]);
      setCurrentChatId(savedChat.id); // Ora esiste l'ID
    } catch (error) {
      console.error("Errore nella creazione della chat:", error);
    }
  };

  const deleteChat = (chatId) => {
    if (chats.length === 1) return;

    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    setMessages((prev) => prev.filter((msg) => msg.chatId !== chatId));

    if (currentChatId === chatId) {
      setCurrentChatId(
        chats.find((chat) => chat.id !== chatId)?.id || chats[0]?.id
      );
    }
  };

  const startEditingChat = (chatId, currentTitle) => {
    setEditingChatId(chatId);
    setEditingTitle(currentTitle);
  };

  const saveEditingChat = () => {
    if (editingTitle.trim()) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === editingChatId
            ? { ...chat, title: editingTitle.trim() }
            : chat
        )
      );
    }
    setEditingChatId(null);
    setEditingTitle("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Adesso";
    if (diffInHours < 24) return `${diffInHours}h fa`;
    if (diffInHours < 48) return "Ieri";
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const renderMessage = (message) => {
    const isUser = message.role === "user";
    return (
      <div
        key={message.id}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}
      >
        <div className={`max-w-[80%] ${isUser ? "order-2" : "order-1"}`}>
          <div
            className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"
              }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser
                ? "bg-gradient-to-br from-blue-500 to-purple-600"
                : "bg-gradient-to-br from-purple-500 to-pink-500"
                }`}
            >
              {isUser ? (
                <div className="w-4 h-4 bg-white rounded-full"></div>
              ) : (
                <Star className="w-4 h-4 text-white" />
              )}
            </div>

            <div
              className={`rounded-2xl px-4 py-3 shadow-lg ${isUser
                ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                : "bg-gray-800 text-gray-100 border border-gray-700"
                }`}
            >
              <div className="prose prose-invert max-w-none">
                {message.content.split("\n").map((line, idx) => {
                  if (line.startsWith("**") && line.endsWith("**")) {
                    return (
                      <div key={idx} className="font-bold text-blue-300 mb-2">
                        {line.replace(/\*\*/g, "")}
                      </div>
                    );
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <div key={idx} className="ml-4 text-gray-300">
                        • {line.substring(2)}
                      </div>
                    );
                  }
                  if (line.startsWith("*") && line.endsWith("*")) {
                    return (
                      <div key={idx} className="italic text-gray-400 text-sm">
                        {line.replace(/\*/g, "")}
                      </div>
                    );
                  }
                  return line ? (
                    <div key={idx} className="mb-1">
                      {line}
                    </div>
                  ) : (
                    <div key={idx} className="mb-2"></div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 flex h-full">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          createNewChat={createNewChat}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredChats={filteredChats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          editingChatId={editingChatId}
          setEditingChatId={setEditingChatId}
          editingTitle={editingTitle}
          setEditingTitle={setEditingTitle}
          saveEditingChat={saveEditingChat}
          startEditingChat={startEditingChat}
          deleteChat={deleteChat}
          formatDate={formatDate}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        {/* Main Chat Area */}
        <ChatArea
          currentChat={currentChat}
          messages={messages}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
          inputValue={inputValue}
          setInputValue={setInputValue}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          renderMessage={renderMessage}
          messagesEndRef={messagesEndRef}
          inputRef={inputRef}
          currentMessages={currentMessages}
        />
      </div>
    </div>
  );
};

export default App;