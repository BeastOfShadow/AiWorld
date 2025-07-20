import React, { useEffect, useState } from "react";
import { Plus, X, Star, } from "lucide-react";

import { getSettings, getModelName, } from "../../functions/application-settings/settings-functions"; // Assicurati di avere questa funzione per ottenere il nome del modello

const SidebarHeader = ({ createNewChat, setSidebarOpen, modelName, endpoint }) => {
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
        disabled={!modelName || !endpoint}
        className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all
          ${!modelName || !endpoint
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'}
        `}
      >
        <Plus className="w-4 h-4" />
        New Chat
      </button>
      <p className="text-xs text-red-500 mt-2">
        {!modelName && !endpoint && "Please configure both a model and an endpoint in settings to start chatting"}
        {modelName && !endpoint && "Please configure an endpoint in settings to start chatting"}
        {!modelName && endpoint && "Please configure a model in settings to start chatting"}
      </p>
      <div className="mb-3 mt-5 text-xs space-y-1">
        <p className="text-gray-400 truncate">
          Model: <span className="text-blue-300">{modelName || "Not configured"}</span>
        </p>
        <p className="text-gray-400 truncate">
          Endpoint: <span className="text-purple-300">{endpoint || "Not configured"}</span>
        </p>
      </div>
    </div>
  );
};

export default SidebarHeader;