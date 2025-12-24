'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';

import ChatWidget from '@/components/chat/chat-widget';

type ChatContextType = {
  openChat: () => void;
  closeChat: () => void;
  isOpen: boolean;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openChat = () => setIsOpen(true);
  const closeChat = () => setIsOpen(false);

  return (
    <ChatContext.Provider value={{ openChat, closeChat, isOpen }}>
      {children}
      <ChatWidget />
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
