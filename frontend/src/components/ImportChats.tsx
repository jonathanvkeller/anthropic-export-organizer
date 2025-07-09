import React, { useRef, useState } from 'react';
import { useChatContext } from '../context/ChatContext';
import type { ChatEntry } from "../types";

export const ImportChats: React.FC = () => {
  const { importChats } = useChatContext();
  const fileRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    const files = fileRef.current?.files;
    if (!files?.length) return;
    setLoading(true);
    setError(null);
    try {
      const text = await files[0].text();
      const parsed: ChatEntry[] = JSON.parse(text);
      importChats(parsed);
    } catch (e) {
      setError('Failed to import');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" ref={fileRef} accept="application/json" />
      <button onClick={handleImport}>Import</button>
      {loading && <span>Loading...</span>}
      {error && <span>{error}</span>}
    </div>
  );
};
