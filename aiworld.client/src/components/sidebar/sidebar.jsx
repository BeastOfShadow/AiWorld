import React from "react"; // Aggiungi l'import di React

import SidebarHeader from "./sidebar-header.jsx";
import SidebarSearch from "./sidebar-search.jsx";
import SidebarChatList from "./sidebar-chat-list.jsx";
import SidebarFooter from "./sidebar-footer.jsx";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  createNewChat,
  searchTerm,
  setSearchTerm,
  filteredChats,
  currentChatId,
  setCurrentChatId,
  editingChatId,
  setEditingChatId,
  editingTitle,
  setEditingTitle,
  saveEditingChat,
  startEditingChat,
  deleteChat,
  formatDate,
  isDarkMode,
  setIsDarkMode,
  showSettings,
  setShowSettings,
  modelName,
  endpoint
}) => {
  return (
    <div
      className={`transition-all duration-300 ${
        sidebarOpen ? "w-80" : "w-0"
      } overflow-hidden`}
    >
      <div className="w-80 h-full bg-gray-900/80 backdrop-blur-xl border-r border-gray-800 flex flex-col">
        {/* Header */}
        <SidebarHeader
          createNewChat={createNewChat}
          setSidebarOpen={setSidebarOpen}
          modelName={modelName}
          endpoint={endpoint}
        />

        {/* Search */}
        <SidebarSearch SearchTerm={searchTerm} SetSearchTerm={setSearchTerm} />

        {/* Chat List */}
        <SidebarChatList
          filteredChats={filteredChats}
          currentChatId={currentChatId}
          setCurrentChatId={setCurrentChatId}
          editingChatId={editingChatId}
          editingTitle={editingTitle}
          setEditingTitle={setEditingTitle}
          saveEditingChat={saveEditingChat}
          startEditingChat={startEditingChat}
          deleteChat={deleteChat}
          formatDate={formatDate}
        />

        {/* Footer */}
        <SidebarFooter 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          setShowSettings={setShowSettings}
        />
      </div>
    </div>
  );
};

export default Sidebar;
