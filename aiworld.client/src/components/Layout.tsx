import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-stellar-950 flex relative overflow-hidden">
      {/* Sfondo animato */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-900/20 via-nebula-900/10 to-stellar-900/30" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cosmic-500/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-nebula-500/10 rounded-full blur-3xl animate-float" />
      </div>

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-stellar-800/80 hover:bg-stellar-700/80 backdrop-blur-sm"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-40
        w-80 transition-transform duration-300 ease-in-out
      `}>
        <Sidebar 
          currentChatId={currentChatId}
          onChatSelect={setCurrentChatId}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Overlay per mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col relative">
        <ChatArea 
          chatId={currentChatId}
          onNewChat={() => setCurrentChatId(null)}
        />
      </div>
    </div>
  );
};