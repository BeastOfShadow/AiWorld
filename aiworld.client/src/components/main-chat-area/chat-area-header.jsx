import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  Star,
  Share2,
  Download,
} from "lucide-react";

const ChatAreaHeader = ({ CurrentChat, SetSidebarOpen, SidebarOpen }) => {
  return (
    <div className="h-16 bg-gray-900/60 backdrop-blur-xl border-b border-gray-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        {!SidebarOpen && (
          <button
            onClick={() => SetSidebarOpen(true)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Star className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-white">
              {CurrentChat?.title || "Seleziona una chat"}
            </h2>
            <p className="text-sm text-gray-400">
              {CurrentChat?.modelUsed || "Nessun modello selezionato"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
          <Download className="w-4 h-4" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ChatAreaHeader;