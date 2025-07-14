import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Check, 
  X 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onRename: (newTitle: string) => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  isActive,
  onSelect,
  onDelete,
  onRename
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(chat.title);

  const handleRename = () => {
    if (editTitle.trim()) {
      onRename(editTitle.trim());
    } else {
      setEditTitle(chat.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setEditTitle(chat.title);
      setIsEditing(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Ora';
    if (diffInHours < 24) return `${diffInHours}h fa`;
    if (diffInHours < 48) return 'Ieri';
    return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div className={`
      group relative p-3 rounded-lg cursor-pointer transition-all duration-200
      ${isActive 
        ? 'bg-gradient-to-r from-cosmic-600/30 to-nebula-600/30 cosmic-border cosmic-glow' 
        : 'hover:bg-stellar-800/50 border border-transparent hover:border-stellar-600/30'
      }
    `} onClick={onSelect}>
      <div className="flex items-start gap-3">
        <div className={`
          mt-1 w-8 h-8 rounded-full flex items-center justify-center shrink-0
          ${isActive 
            ? 'bg-gradient-to-br from-cosmic-500 to-nebula-500' 
            : 'bg-stellar-700/50'
          }
        `}>
          <MessageSquare className="w-4 h-4 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2 mb-1">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleRename}
                className="h-6 text-sm bg-stellar-800 border-stellar-600"
                autoFocus
              />
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={handleRename}
              >
                <Check className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={() => {
                  setEditTitle(chat.title);
                  setIsEditing(false);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <h3 className={`
              text-sm font-medium truncate mb-1
              ${isActive ? 'text-white' : 'text-stellar-200'}
            `}>
              {chat.title}
            </h3>
          )}

          {chat.lastMessage && (
            <p className={`
              text-xs truncate mb-2
              ${isActive ? 'text-stellar-300' : 'text-stellar-400'}
            `}>
              {chat.lastMessage}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className={`
              text-xs
              ${isActive ? 'text-stellar-300' : 'text-stellar-500'}
            `}>
              {formatTimestamp(chat.timestamp)}
            </span>
            
            {chat.messageCount > 0 && (
              <span className={`
                text-xs px-2 py-1 rounded-full
                ${isActive 
                  ? 'bg-cosmic-500/30 text-cosmic-200' 
                  : 'bg-stellar-700/50 text-stellar-400'
                }
              `}>
                {chat.messageCount}
              </span>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => {
              setIsEditing(true);
              setEditTitle(chat.title);
            }}>
              <Edit3 className="w-3 h-3 mr-2" />
              Rinomina
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onDelete}
              className="text-red-400 focus:text-red-300"
            >
              <Trash2 className="w-3 h-3 mr-2" />
              Elimina
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};