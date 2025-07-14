import React from "react"; // Aggiungi l'import di React
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

const SidebarFooter = ({ IsDarkMode, SetIsDarkMode }) => {
  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => SetIsDarkMode(!IsDarkMode)}
          className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          {IsDarkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
export default SidebarFooter;
