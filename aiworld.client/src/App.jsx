import React, { useState, useRef, useEffect } from "react";
import { X, Star, Settings, User, Sun, Moon, ChevronRight, CpuIcon, Link, Brain, AwardIcon } from "lucide-react";

import Sidebar from "./components/sidebar/sidebar.jsx";
import ChatArea from "./components/main-chat-area/chat-area.jsx";
import { getSettings, updateSettings } from "./functions/application-settings/settings-functions.jsx";
import { getChats, createChat, deleteChat } from "./functions/chats/chat-functions.jsx";
import { getModels, createModel, deleteModel } from "./functions/application-settings/models-function.jsx"
import { getEndpoints, createEndpoint, deleteEndpoint } from "./functions/application-settings/endpoints-functions.jsx";

const App = () => {
  const [chats, setChats] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [appSettings, setAppSettings] = useState({
    url: null,
    modelName: null
  });

  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedEndpointId, setSelectedEndpointId] = useState(null);

  const [activeModalSection, setActiveModalSection] = useState('general');

  const [models, setModels] = useState([]);
  const [newModel, setNewModel] = useState("");

  const addModel = async () => {
    if (newModel.trim() && !models.some(m => m.modelName === newModel.trim())) {
      const modelToAdd = {
        modelName: newModel,
        createdAt: new Date().toISOString(),
      };

      try {
        const savedModel = await createModel(modelToAdd);
        setModels([...models, savedModel]);
        setNewModel("");
      } catch (error) {
        console.error("Errore nella creazione del modello:", error);
      }
    }
  };

  const removeModel = async (modelToRemove) => {
    try {
      setModels(prevModels => prevModels.filter(m => m.id !== modelToRemove.id));
      await deleteModel(modelToRemove.id);
    } catch (error) {
      console.error("Errore nella cancellazione del modello:", error);
    }
  };

  const [endpoints, setEndpoints] = useState([]);
  const [newEndpoint, setNewEndpoint] = useState("");

  const addEndpoint = async () => {
    if (newEndpoint.trim() && !endpoints.some(m => m.url === newEndpoint.trim())) {
      const endpointToAdd = {
        url: newEndpoint,
        createdAt: new Date().toISOString(),
      };

      try {
        const savedEndpoint = await createEndpoint(endpointToAdd);
        setEndpoints([...endpoints, savedEndpoint]);
        setNewEndpoint("");
      } catch (error) {
        console.error("Errore nella creazione dell'endpoint:", error);
      }
    }
  };

  const removeEndpoint = async (modelToRemove) => {
    try {
      setEndpoints(endpoints.filter(m => m !== modelToRemove));
      await deleteEndpoint(modelToRemove.id);
    } catch (error) {
      console.error("Errore nella cancellazione dell'endpoint:", error);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      const settingsParameters = await getSettings();
      setAppSettings({
        url: settingsParameters[0]?.endpoint?.url || null,
        modelName: settingsParameters[0]?.model?.modelName || null,
      });
    };

    const fetchModels = async () => {
      const allModels = await getModels();
      setModels(allModels);
    };

    const fetchEndpoints = async () => {
      const allEndpoints = await getEndpoints();
      setEndpoints(allEndpoints);
    }

    const loadChats = async () => {
      const chatsData = await getChats();
      setChats(chatsData);
    };

    fetchSettings();
    fetchModels();
    fetchEndpoints();
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
      modelUsed: appSettings.modelName,
      preview: "New conversation...",
      createdAt: new Date().toISOString(),
      lastAccessed: new Date().toISOString(),
    };
    try {
      console.log("Invio dati:", JSON.stringify(newChat));
      const savedChat = await createChat(newChat);
      setChats((prev) => [savedChat, ...prev]);
      setCurrentChatId(savedChat.id);
    } catch (error) {
      console.error("Errore nella creazione della chat:", error);
    }
  };

  const deleteChatById = async (chatId) => {
    if (chats.length <= 0) return;

    try {
      await deleteChat(chatId);

      setChats((prev) => prev.filter((chat) => chat.id !== chatId));
      setMessages((prev) => prev.filter((msg) => msg.chatId !== chatId));

      if (currentChatId === chatId) {
        setCurrentChatId(
          chats.find((chat) => chat.id !== chatId)?.id || chats[0]?.id
        );
      }

    } catch (error) {
      console.error("Errore nella cancellazione della chat:", error);
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

    if (diffInHours < 1) return "Now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
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
          deleteChat={deleteChatById}
          formatDate={formatDate}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
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

      {/* Modale */}
      {showSettings && (
        <>
          {/* Overlay scuro */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSettings(false)}
          />

          {/* Modale migliorato */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 flex overflow-hidden">
              {/* Sidebar del modale */}
              <div className="w-1/3 bg-gray-800 p-4 border-r border-gray-700">
                <h2 className="text-lg font-semibold mb-6">Settings</h2>

                {/* <button
                  onClick={() => setActiveModalSection('profile')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg mb-2 ${activeModalSection === 'profile' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-3" />
                    <span>Profilo</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button> */}

                <button
                  onClick={() => setActiveModalSection('general')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg mb-2 ${activeModalSection === 'general' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  <div className="flex items-center">
                    <Settings className="w-4 h-4 mr-3" />
                    <span>General</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveModalSection('connection')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg mb-2 ${activeModalSection === 'connection' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  <div className="flex items-center">
                    <CpuIcon className="w-4 h-4 mr-3" />
                    <span>Connection</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveModalSection('model')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg mb-2 ${activeModalSection === 'model' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  <div className="flex items-center">
                    <Brain className="w-4 h-4 mr-3" />
                    <span>Models</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveModalSection('endpoint')}
                  className={`flex items-center justify-between w-full p-3 rounded-lg mb-2 ${activeModalSection === 'endpoint' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  <div className="flex items-center">
                    <Link className="w-4 h-4 mr-3" />
                    <span>Endpoint</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Contenuto principale */}
              <div className="w-2/3 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">
                    {activeModalSection === 'profile' && 'Profilo'}
                    {activeModalSection === 'general' && 'General Settings'}
                    {activeModalSection === 'connection' && 'Connection Setup'}
                    {activeModalSection === 'model' && 'Model Settings'}
                    {activeModalSection === 'endpoint' && 'Endpoint Settings'}
                  </h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-1 hover:bg-gray-800 rounded-full"
                  >
                    <X className="w-5 h-5 text-gray-400 hover:text-white" />
                  </button>
                </div>

                {/* Contenuto dinamico in base alla sezione */}
                <div className="space-y-6">
                  {/* {activeModalSection === 'profile' && (
                    <div>
                      <h4 className="text-md font-medium mb-4">Informazioni personali</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Nome</label>
                          <input
                            type="text"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                            placeholder="Il tuo nome"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Email</label>
                          <input
                            type="email"
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                            placeholder="tua@email.com"
                          />
                        </div>
                      </div>
                    </div>
                  )} */}

                  {activeModalSection === 'general' && (
                    <div>
                      <h4 className="text-md font-medium mb-4">Preferenes</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Theme</label>
                            <p className="text-sm text-gray-300">Choose between light or dark</p>
                          </div>
                          <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
                          >
                            {isDarkMode ? (
                              <>
                                <Sun className="w-4 h-4" />
                                <span>Light</span>
                              </>
                            ) : (
                              <>
                                <Moon className="w-4 h-4" />
                                <span>Dark</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModalSection === 'connection' && (
                    <div>
                      <h4 className="text-md font-medium mb-4">Connection Configuration</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Model Selection</label>
                          {models.length === 0 ? (
                            <p className="text-red-500 text-sm py-2">No models available. Please add models first.</p>
                          ) : (
                            <select
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                              onChange={(e) => setSelectedModelId(parseInt(e.target.value))}
                              value={selectedModelId || ""}
                            >
                              {models.map((model) => (
                                <option key={model.id} value={model.id}>
                                  {model.modelName}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Endpoint API</label>
                          {endpoints.length === 0 ? (
                            <p className="text-red-500 text-sm py-2">No endpoints available. Please add endpoints first.</p>
                          ) : (
                            <select
                              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                              onChange={(e) => setSelectedEndpointId(parseInt(e.target.value))}
                              value={selectedEndpointId || ""}
                            >
                              {endpoints.map((endpoint) => (
                                <option key={endpoint.id} value={endpoint.id}>
                                  {endpoint.url}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>

                        <div className="pt-2">
                          <button
                            onClick={async () => {
                              console.log("Saving settings with:", {
                                endpointId: selectedEndpointId,
                                modelId: selectedModelId
                              });

                              try {
                                const updated = await updateSettings({
                                  endpointId: selectedEndpointId,
                                  modelId: selectedModelId
                                });
                                setAppSettings(updated);
                                alert("Settings saved successfully!");
                                // Aggiungi qui un feedback visivo se vuoi
                              } catch (error) {
                                console.error("Failed to save settings:", error);
                              }
                            }}
                            className={`${'px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg'}`}>
                            Save Configuration
                          </button>
                        </div>

                        <div className="my-4 border-t border-gray-700" />
                        <h4 className="text-md font-medium mb-4 mt-4">Current Configuration</h4>
                        <p className="text-sm">
                          <span className="text-gray-400">Current Model: </span>
                          {appSettings.modelName || "None"}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-400">Current Endpoint: </span>
                          {appSettings.url || "None"}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeModalSection === 'model' && (
                    <div>
                      {/* <h4 className="text-md font-medium mb-4">Model Configuration</h4> */}
                      <h4 className="text-md font-medium mb-4 mt-4">Models Configuration</h4>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={newModel}
                          onChange={(e) => setNewModel(e.target.value)}
                          placeholder="e.g., Llama-3.1-8B"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                        <div>
                          <button
                            onClick={addModel}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                          >
                            Add Model
                          </button>
                        </div>

                        {/* Model list */}
                        <div>
                          <div className="my-4 border-t border-gray-700" />
                          <h4 className="text-md font-medium mb-4 mt-4">Models</h4>
                          <div
                            className="space-y-2 overflow-y-auto"
                            style={{ maxHeight: models.length > 2 ? '200px' : 'auto' }}
                          >
                            {models.length === 0 ? (
                              <p className="text-sm text-gray-400 italic">No models configurated.</p>
                            ) : (
                              models.map((model, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                                >
                                  <span>{model.modelName}</span>
                                  <button
                                    onClick={() => removeModel(model)}
                                    className="hover:text-red-500 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              )))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeModalSection === 'endpoint' && (
                    <div>
                      <h4 className="text-md font-medium mb-4">Endpoint Configuration</h4>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={newEndpoint}
                          onChange={(e) => setNewEndpoint(e.target.value)}
                          placeholder="http://localhost:11434"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                        />
                        <div>
                          <button
                            onClick={addEndpoint}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg"
                          >
                            Add Endpoint
                          </button>
                        </div>

                        {/* Endpoint list */}
                        <div>
                          <div className="my-4 border-t border-gray-700" />
                          <h4 className="text-md font-medium mb-4 mt-4">Endpoints</h4>
                          <div
                            className="space-y-2 overflow-y-auto"
                            style={{ maxHeight: endpoints.length > 2 ? '200px' : 'auto' }}
                          >
                            {endpoints.length === 0 ? (
                              <p className="text-sm text-gray-400 italic">No endpoints configurated.</p>
                            ) : (
                              endpoints.map((endpoint, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white"
                                >
                                  <span>{endpoint.url}</span>
                                  <button
                                    onClick={() => removeEndpoint(endpoint)}
                                    className="hover:text-red-500 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              )))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;