import { useState } from 'react';
import type { ChatEntry } from "../types";

export const useSearch = (chats: ChatEntry[]) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async (q: string) => {
    setQuery(q);
    setLoading(true);
    try {
      const lower = q.toLowerCase();
      const filtered = chats.filter(
        (c) => c.title.toLowerCase().includes(lower) ||
        c.messages.some((m) => m.content.some((p) => p.text.toLowerCase().includes(lower)))
      );
      setResults(filtered);
    } finally {
      setLoading(false);
    }
  };

  return { query, results, search, loading };
};
