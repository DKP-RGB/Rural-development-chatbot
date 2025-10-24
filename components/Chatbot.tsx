import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sendMessageStream } from '../services/geminiService';
import type { Message, GroundingSource } from '../types';
import { ChatIcon, CloseIcon, SendIcon, MinimizeIcon, MaximizeIcon, SpeakerOnIcon, SpeakerOffIcon } from './icons/UIIcons';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      content: "<p>Hello! I'm the RD Assistant. How can I help you learn about USDA Rural Development programs today?</p>",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speak = useCallback((text: string, messageId: string) => {
    if (!isTtsEnabled || !window.speechSynthesis) return;

    const cleanText = text.replace(/<[^>]*>?/gm, '');
    if (cleanText.trim() === '') return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.onstart = () => {
      setSpeakingMessageId(messageId);
    };
    utterance.onend = () => {
      setSpeakingMessageId(null);
    };
    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [isTtsEnabled]);
  
  const handleTtsToggle = () => {
    if (isTtsEnabled && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    }
    setIsTtsEnabled(prev => !prev);
  };

  const handleSendMessage = useCallback(async () => {
    const message = input.trim();
    if (message === '' || isLoading) return;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    }

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: message };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const modelMessageId = (Date.now() + 1).toString();
    const initialModelMessage: Message = { id: modelMessageId, role: 'model', content: '' };
    setMessages((prev) => [...prev, initialModelMessage]);

    try {
      let fullResponse = '';
      const stream = sendMessageStream(message);
      const EXPAND_THRESHOLD = 400;

      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if(chunkText) {
          fullResponse += chunkText;
          if (fullResponse.length > EXPAND_THRESHOLD && !isExpanded) {
            setIsExpanded(true);
          }
          setMessages((prev) =>
            prev.map((msg) => (msg.id === modelMessageId ? { ...msg, content: fullResponse } : msg))
          );
        }
      }
      
      setMessages((prev) =>
        prev.map((msg) => (msg.id === modelMessageId ? { ...msg, content: fullResponse } : msg))
      );

    } catch (error) {
       setMessages((prev) =>
        prev.map((msg) => (msg.id === modelMessageId ? { ...msg, content: '<p>Sorry, I encountered an error. Please try again later.</p>' } : msg))
      );
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, isExpanded]);

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setSpeakingMessageId(null);
    }
  }

  useEffect(() => {
    // Prevent body scroll when the chat is fully expanded (modal-like behavior)
    if (isOpen && isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isExpanded]);
  
  useEffect(() => {
      return () => {
           if (window.speechSynthesis) {
              window.speechSynthesis.cancel();
              setSpeakingMessageId(null);
          }
      }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'model' && lastMessage.content && !isLoading) {
      speak(lastMessage.content, lastMessage.id);
    }
  }, [messages, isLoading, speak]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
       e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-[99] transition-opacity duration-500 ease-in-out
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => isExpanded ? setIsExpanded(false) : handleClose()}
        aria-hidden="true"
      />

      <div className={`fixed bottom-0 right-0 m-6 transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-20 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#002d54] text-white p-4 rounded-full shadow-lg hover:bg-[#004a87] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002d54] flex items-center"
          aria-label="Open chat"
        >
          <ChatIcon />
          <span className="ml-2 font-semibold">Chat with RD Assistant</span>
        </button>
      </div>
      
      {/* Main Chat Window */}
      <div
        className={`
          fixed z-[100] flex flex-col bg-white rounded-lg shadow-2xl
          transition-all duration-500 ease-in-out
          ${isOpen
            ? 'opacity-100'
            : 'opacity-0 scale-95 pointer-events-none origin-bottom-right'
          }
          ${isExpanded
            ? 'w-[90vw] max-w-3xl h-[80vh] bottom-[10vh] right-[5vw]'
            : 'w-[90vw] max-w-md h-[70vh] bottom-4 right-4'
          }
        `}
      >
        <header className="flex items-center justify-between p-4 bg-[#002d54] text-white rounded-t-lg flex-shrink-0">
          <h3 className="font-bold text-lg">RD Assistant</h3>
          <div className="flex items-center space-x-2">
            <button onClick={handleTtsToggle} aria-label={isTtsEnabled ? 'Disable voice output' : 'Enable voice output'} className="hover:bg-white/20 p-1 rounded">
                {isTtsEnabled ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
            </button>
            {isExpanded ? (
              <button onClick={() => setIsExpanded(false)} aria-label="Minimize chat" className="flex items-center hover:bg-white/20 p-1 rounded">
                <MinimizeIcon />
                <span className="text-xs ml-1 font-semibold hidden sm:inline">Minimize</span>
              </button>
            ) : (
              <button onClick={() => setIsExpanded(true)} aria-label="Maximize chat" className="flex items-center hover:bg-white/20 p-1 rounded">
                <MaximizeIcon />
                <span className="text-xs ml-1 font-semibold hidden sm:inline">Maximize</span>
              </button>
            )}
            <button onClick={handleClose} aria-label="Close chat" className="hover:bg-white/20 p-1 rounded">
              <CloseIcon />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg transition-all duration-300 ${msg.role === 'user' ? 'bg-[#00a69c] text-white' : 'bg-gray-200 text-gray-900'} ${speakingMessageId === msg.id ? 'shadow-lg ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-50' : ''}`}>
                  {msg.role === 'model' && msg.content ? (
                    <div
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  )}
                  {msg.role === 'model' && msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-300">
                          <h4 className="text-xs font-bold mb-1">Sources:</h4>
                          <ul className="space-y-1">
                              {msg.sources.map((source, index) => (
                                  <li key={index} className="text-xs">
                                      <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                          {index + 1}. {source.title}
                                      </a>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                  </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder='Ask a question...'
              className="flex-1 bg-transparent px-4 py-2 text-sm text-gray-900 focus:outline-none"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || input.trim() === ''}
              className="p-2 rounded-full bg-[#002d54] text-white disabled:bg-gray-400 hover:bg-[#004a87] transition-colors ml-1"
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            This chatbot provides information based on USDA Rural Development resources and does not collect personal data.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Chatbot;