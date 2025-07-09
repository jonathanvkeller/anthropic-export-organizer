import { ChatProvider } from './context/ChatContext';
import { DarkTheme } from './context/Theme';
import { FolderList } from './components/FolderList';
import { ChatList } from './components/ChatList';
import { ImportChats } from './components/ImportChats';
import { ConfigScreen } from './components/ConfigScreen';
import './App.css';

function App() {
  return (
    <DarkTheme>
      <ChatProvider>
        <h1>Anthropic Export Organizer</h1>
        <ConfigScreen />
        <ImportChats />
        <div style={{ display: 'flex', gap: '2rem' }}>
          <FolderList />
          <ChatList />
        </div>
      </ChatProvider>
    </DarkTheme>
  );
}

export default App;
