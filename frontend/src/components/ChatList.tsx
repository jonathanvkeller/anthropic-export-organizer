import React, { useState } from 'react';
import styled from 'styled-components';
import { useChatContext } from '../context/ChatContext';
import { useSearch } from '../hooks/useSearch';

const List = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 300px;
  overflow: auto;
`;

export const ChatList: React.FC = () => {
  const { chats, renameChat, deleteChat } = useChatContext();
  const { results, search, loading } = useSearch(chats);
  const data = results.length > 0 ? results : chats;
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    await search(query);
  };

  return (
    <div>
      <h3>Chats</h3>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      <List>
        {data.map((c) => !c.deleted && (
          <li key={c.id}>
            {c.title}
            <button onClick={() => renameChat(c.id, prompt('Title', c.title) || c.title)}>Rename</button>
            <button onClick={() => deleteChat(c.id)}>Delete</button>
          </li>
        ))}
      </List>
    </div>
  );
};
