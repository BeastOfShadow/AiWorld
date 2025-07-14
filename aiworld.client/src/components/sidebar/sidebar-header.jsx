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

const SidebarHeader = ({ createNewChat, setSidebarOpen }) => {
  return (
    <div className="p-4 border-b border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AIWorld
            </h1>
            <p className="text-xs text-gray-400">by SyncUniverse</p>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={createNewChat}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
      >
        <Plus className="w-4 h-4" />
        New Chat
      </button>
    </div>
  );
};

export default SidebarHeader;