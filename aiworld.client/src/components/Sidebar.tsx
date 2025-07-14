import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Plus, 
  Search, 
  MessageSquare, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Globe 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChatItem } from './ChatItem';

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface SidebarProps {
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentChatId, 
  onChatSelect, 
  onClose 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Esplorazione del Sistema Solare',
      lastMessage: 'Dimmi di più sui pianeti esterni...',
      timestamp: new Date(2024, 0, 15, 14, 30),
      messageCount: 12
    },
    {
      id: '2',
      title: 'Intelligenza Artificiale nel Futuro',
      lastMessage: 'Come cambierà il mondo tra 10 anni?',
      timestamp: new Date(2024, 0, 14, 10, 15),
      messageCount: 8
    },
    {
      id: '3',
      title: 'Programmazione Quantistica',
      lastMessage: 'Spiegami i qubit e il quantum computing',
      timestamp: new Date(2024, 0, 13, 16, 45),
      messageCount: 15
    }
  ]);

  const filteredChats = chats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'Nuova Conversazione',
      lastMessage: '',
      timestamp: new Date(),
      messageCount: 0
    };
    setChats([newChat, ...chats]);
    onChatSelect(newChat.id);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(chats.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      onChatSelect(chats[0]?.id || '');
    }
  };

  const handleRenameChat = (chatId: string, newTitle: string) => {
    setChats(chats.map(chat =>
      chat.id === chatId ? { ...chat, title: newTitle } : chat
    ));
  };

  return (
    <div className="h-full stellar-card border-r-2 border-cosmic-600/20 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-stellar-700/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-500 to-nebula-500 flex items-center justify-center animate-pulse-glow">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-cosmic-300 to-nebula-300 bg-clip-text text-transparent">
              AIWorld
            </h1>
            <p className="text-xs text-stellar-400">Il tuo pianeta AI</p>
          </div>
        </div>

        <Button 
          onClick={handleNewChat}
          className="w-full bg-gradient-to-r from-cosmic-600 to-nebula-600 hover:from-cosmic-500 hover:to-nebula-500 text-white border-none cosmic-glow transition-all duration-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuova Chat
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-stellar-700/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stellar-400 w-4 h-4" />
          <Input
            placeholder="Cerca nelle conversazioni..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-stellar-800/50 border-stellar-600/30 focus:border-cosmic-500 transition-colors"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-2">
          {filteredChats.map((chat) => (
            <ChatItem
              key={chat.id}
              chat={chat}
              isActive={currentChatId === chat.id}
              onSelect={() => {
                onChatSelect(chat.id);
                onClose();
              }}
              onDelete={() => handleDeleteChat(chat.id)}
              onRename={(newTitle) => handleRenameChat(chat.id, newTitle)}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-stellar-700/50">
        <div className="text-center">
          <p className="text-xs text-stellar-400">
            Powered by SyncUniverse
          </p>
          <div className="mt-2 flex justify-center space-x-1">
            <div className="w-1 h-1 bg-cosmic-500 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-nebula-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-1 h-1 bg-stellar-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};