import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Paperclip, 
  Smile, 
  RotateCcw, 
  Share,
  Download,
  Globe,
  Sparkles
} from 'lucide-react';
import { MessageBubble } from './MessageBubble';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatAreaProps {
  chatId: string | null;
  onNewChat: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chatId, onNewChat }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Messaggi di esempio
  useEffect(() => {
    if (chatId) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: 'Ciao! Sono AIWorld, il tuo assistente AI personale. Come posso aiutarti oggi?',
          timestamp: new Date(2024, 0, 15, 10, 0)
        },
        {
          id: '2',
          role: 'user',
          content: 'Dimmi qualcosa sui pianeti del sistema solare',
          timestamp: new Date(2024, 0, 15, 10, 1)
        },
        {
          id: '3',
          role: 'assistant',
          content: 'Il sistema solare è composto da otto pianeti principali che orbitano attorno al Sole. Partendo dal più vicino al Sole:\n\n1. **Mercurio** - Il pianeta più piccolo e più vicino al Sole\n2. **Venere** - Il pianeta più caldo, spesso chiamato "stella del mattino"\n3. **Terra** - Il nostro pianeta, l\'unico conosciuto che ospita la vita\n4. **Marte** - Il "pianeta rosso", oggetto di molte missioni spaziali\n5. **Giove** - Il gigante gassoso più grande del sistema solare\n6. **Saturno** - Famoso per i suoi spettacolari anelli\n7. **Urano** - Un gigante di ghiaccio che ruota "sdraiato"\n8. **Nettuno** - Il pianeta più lontano, con venti che superano i 2000 km/h\n\nCosa ti interessa sapere di più su questi mondi affascinanti?',
          timestamp: new Date(2024, 0, 15, 10, 2)
        }
      ]);
    } else {
      setMessages([]);
    }
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simula risposta dell'AI
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Questa è una risposta simulata dall\'AI. Nel sistema completo, qui verrebbe integrata la chiamata al backend per ottenere la risposta da un modello AI locale come Ollama o Llama.cpp.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-scroll al nuovo messaggio
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  if (!chatId) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-cosmic-500 to-nebula-500 flex items-center justify-center animate-pulse-glow">
            <Globe className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cosmic-300 to-nebula-300 bg-clip-text text-transparent">
            Benvenuto in AIWorld
          </h2>
          <p className="text-stellar-400 mb-6">
            Il tuo assistente AI personale è pronto per esplorare qualsiasi argomento insieme a te.
          </p>
          <Button 
            onClick={onNewChat}
            className="bg-gradient-to-r from-cosmic-600 to-nebula-600 hover:from-cosmic-500 hover:to-nebula-500 cosmic-glow"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Inizia una nuova conversazione
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-stellar-700/50 stellar-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cosmic-500 to-nebula-500 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-stellar-100">AIWorld Assistant</h2>
              <p className="text-xs text-stellar-400">Online • Modello locale</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && (
            <MessageBubble 
              message={{
                id: 'loading',
                role: 'assistant',
                content: '',
                timestamp: new Date(),
                isTyping: true
              }} 
            />
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-stellar-700/50 stellar-card">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Scrivi il tuo messaggio..."
              className="pr-24 min-h-[60px] resize-none bg-stellar-800/50 border-stellar-600/30 focus:border-cosmic-500 transition-colors"
              rows={1}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Smile className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
                className="h-8 w-8 p-0 bg-gradient-to-r from-cosmic-600 to-nebula-600 hover:from-cosmic-500 hover:to-nebula-500 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-stellar-500">
            <span>Premi Invio per inviare, Shift + Invio per andare a capo</span>
            <span>{inputMessage.length}/2000</span>
          </div>
        </div>
      </div>
    </div>
  );
};