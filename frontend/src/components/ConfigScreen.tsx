import React, { useEffect, useState } from 'react';

const KEY_STORAGE = 'aeo_api_key';

export const ConfigScreen: React.FC = () => {
  const [key, setKey] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(KEY_STORAGE);
    if (stored) setKey(stored);
  }, []);

  const save = () => {
    localStorage.setItem(KEY_STORAGE, key);
    alert('Saved');
  };

  return (
    <div>
      <h3>API Key</h3>
      <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="OpenAI/OpenRouter key" />
      <button onClick={save}>Save</button>
    </div>
  );
};
