import React, { useState } from 'react';
import styled from 'styled-components';
import { useChatContext } from '../context/ChatContext';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const FolderList: React.FC = () => {
  const { folders, addFolder, renameFolder, deleteFolder } = useChatContext();
  const [newName, setNewName] = useState('');

  return (
    <div>
      <h3>Folders</h3>
      <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="New folder" />
      <button onClick={() => { if (newName) { addFolder(newName); setNewName(''); } }}>Add</button>
      <List>
        {folders.map((f) => (
          <li key={f.id}>
            {f.name}
            <button onClick={() => renameFolder(f.id, prompt('Name', f.name) || f.name)}>Rename</button>
            <button onClick={() => deleteFolder(f.id)}>Delete</button>
          </li>
        ))}
      </List>
    </div>
  );
};
