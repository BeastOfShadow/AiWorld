import React from 'react'; // Aggiungi l'import di React
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Send,
  Menu,
  X,
  Star,
  MessageCircle,
  Calendar,
  Share2,
  Download,
  Settings,
  Moon,
  Sun,
} from "lucide-react";

const SidebarChatList = ({ 
  filteredChats,
  currentChatId,
  setCurrentChatId,
  editingChatId,
  editingTitle,
  setEditingTitle,
  saveEditingChat,
  startEditingChat,
  deleteChat,
  formatDate
 }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      {filteredChats.map((chat) => (
        <div
          key={chat.id}
          className={`group p-4 cursor-pointer border-b border-gray-800/50 hover:bg-gray-800/50 transition-all ${currentChatId === chat.id
            ? "bg-gray-800/80 border-l-4 border-l-blue-500"
            : ""
            }`}
          onClick={() => setCurrentChatId(chat.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              {editingChatId === chat.id ? (
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={saveEditingChat}
                  onKeyPress={(e) =>
                    e.key === "Enter" && saveEditingChat()
                  }
                  className="w-full bg-gray-700 text-white px-2 py-1 rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  autoFocus
                />
              ) : (
                <h3 className="font-medium text-white truncate group-hover:text-blue-300 transition-colors">
                  {chat.title}
                </h3>
              )}

              <p className="text-sm text-gray-400 truncate mt-1">
                {chat.preview}
              </p>

              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {formatDate(chat.lastAccessed)}
                <span className="text-gray-600">•</span>
                <span className="text-blue-400">{chat.modelUsed}</span>
              </div>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  startEditingChat(chat.id, chat.title);
                }}
                className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
              >
                <Edit3 className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className="p-1 hover:bg-gray-700 rounded text-gray-400 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarChatList;