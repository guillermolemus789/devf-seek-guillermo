import ChatForm from './components/ChatForm';
import ChatMessages from './components/ChatMessages';
import History from './components/History';

function App() {
  return (
    <div className="app-layout">
      <History />

      <main className="chat">
        <header className="chat-header">
          <div>
            <h1>DevfSeek</h1>
            <p>Chat local con Ollama y DeepSeek R1</p>
          </div>

          <span className="model-badge">
            deepseek-r1:1.5b
          </span>
        </header>

        <ChatMessages />

        <ChatForm />
      </main>
    </div>
  );
}

export default App;