import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  RefreshCw, 
  User, 
  Globe 
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isTyping = message.isTyping;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
  };

  if (isTyping) {
    return (
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8 bg-gradient-to-br from-cosmic-500 to-nebula-500">
          <AvatarFallback>
            <Globe className="w-4 h-4 text-white" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 max-w-3xl">
          <div className="stellar-card p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cosmic-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-nebula-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
              <div className="w-2 h-2 bg-stellar-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              <span className="text-sm text-stellar-400 ml-2">AIWorld sta scrivendo...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <Avatar className={`w-8 h-8 ${
        isUser 
          ? 'bg-gradient-to-br from-stellar-600 to-stellar-700' 
          : 'bg-gradient-to-br from-cosmic-500 to-nebula-500'
      }`}>
        <AvatarFallback>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Globe className="w-4 h-4 text-white" />
          )}
        </AvatarFallback>
      </Avatar>

      <div className={`flex-1 max-w-3xl ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`
          stellar-card p-4 rounded-lg relative group
          ${isUser 
            ? 'bg-gradient-to-br from-cosmic-600/20 to-nebula-600/20 cosmic-border' 
            : 'bg-stellar-800/50 border border-stellar-700/50'
          }
        `}>
          {/* Contenuto del messaggio */}
          <div className="prose prose-sm prose-invert max-w-none">
            {message.content.split('\n').map((line, index) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return (
                  <h4 key={index} className="text-stellar-100 font-semibold mb-2">
                    {line.slice(2, -2)}
                  </h4>
                );
              }
              if (line.match(/^\d+\.\s/)) {
                return (
                  <p key={index} className="text-stellar-200 mb-1 pl-2">
                    {line}
                  </p>
                );
              }
              return (
                <p key={index} className="text-stellar-200 mb-2 last:mb-0">
                  {line || <br />}
                </p>
              );
            })}
          </div>

          {/* Timestamp */}
          <div className={`text-xs text-stellar-500 mt-2 ${isUser ? 'text-right' : ''}`}>
            {formatTime(message.timestamp)}
          </div>

          {/* Action buttons per messaggi AI */}
          {!isUser && (
            <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-7 px-2 text-stellar-400 hover:text-stellar-200"
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-stellar-400 hover:text-green-400"
              >
                <ThumbsUp className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-stellar-400 hover:text-red-400"
              >
                <ThumbsDown className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-stellar-400 hover:text-cosmic-400"
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};