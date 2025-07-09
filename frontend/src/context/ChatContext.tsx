import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ChatEntry, ChatFolder } from "../types";

interface ChatState {
  folders: ChatFolder[];
  chats: ChatEntry[];
  selectedChat?: string;
  addFolder: (name: string) => void;
  renameFolder: (id: string, name: string) => void;
  deleteFolder: (id: string) => void;
  addChat: (entry: ChatEntry) => void;
  renameChat: (id: string, title: string) => void;
  deleteChat: (id: string) => void;
  importChats: (entries: ChatEntry[]) => void;
}

const ChatContext = createContext<ChatState | undefined>(undefined);

const STORAGE_KEY = 'aeo_state';

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useState<ChatFolder[]>([]);
  const [chats, setChats] = useState<ChatEntry[]>([]);
  const [selectedChat, setSelectedChat] = useState<string>();

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      setFolders(parsed.folders || []);
      setChats(parsed.chats || []);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ folders, chats }));
  }, [folders, chats]);

  const addFolder = (name: string) => {
    setFolders((f) => [...f, { id: crypto.randomUUID(), name }]);
  };

  const renameFolder = (id: string, name: string) => {
    setFolders((f) => f.map((fld) => (fld.id === id ? { ...fld, name } : fld)));
  };

  const deleteFolder = (id: string) => {
    setFolders((f) => f.filter((fld) => fld.id !== id));
    setChats((c) => c.map((ch) => (ch.folderId === id ? { ...ch, folderId: undefined } : ch)));
  };

  const addChat = (entry: ChatEntry) => {
    setChats((c) => [...c, { ...entry, id: crypto.randomUUID() }]);
  };

  const renameChat = (id: string, title: string) => {
    setChats((c) => c.map((ch) => (ch.id === id ? { ...ch, title } : ch)));
  };

  const deleteChat = (id: string) => {
    setChats((c) => c.map((ch) => (ch.id === id ? { ...ch, deleted: true } : ch)));
    if (selectedChat === id) setSelectedChat(undefined);
  };

  const importChats = (entries: ChatEntry[]) => {
    setChats((existing) => {
      const ids = new Set(existing.map((e) => e.id));
      const toAdd = entries.filter((e) => !ids.has(e.id) && !e.deleted);
      return [...existing, ...toAdd];
    });
  };

  return (
    <ChatContext.Provider
      value={{ folders, chats, selectedChat, addFolder, renameFolder, deleteFolder, addChat, renameChat, deleteChat, importChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('ChatContext must be used within ChatProvider');
  return ctx;
};
