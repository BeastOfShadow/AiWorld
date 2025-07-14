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

const SidebarSearch = ({ SearchTerm, SetSearchTerm }) => {
  return (

<div className="p-4 border-b border-gray-800">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    <input
      type="text"
      placeholder="Cerca nelle chat..."
      value={SearchTerm}
      onChange={(e) => SetSearchTerm(e.target.value)}
      className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
    />
  </div>
</div>
  );
};

export default SidebarSearch;