import React from "react";
import { Settings, Share2, Moon, Sun } from "lucide-react";

const SidebarFooter = ({ isDarkMode, setIsDarkMode, setShowSettings }) => {
  return (
    <div className="p-4 border-t border-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
        >
          {isDarkMode ? (
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