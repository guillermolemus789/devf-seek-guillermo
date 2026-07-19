import { useChat } from '../context/ChatContext';
import useOllama from '../api/useOllama';

function ChatForm() {
  const { state, dispatch } = useChat();
  const { generateResponse, loading, error } = useOllama();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!state.draft.trim()) {
      return;
    }

    await generateResponse(state.draft);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      if (state.draft.trim() && !loading) {
        generateResponse(state.draft);
      }
    }
  };

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}

      <div className="input-container">
        <textarea
          value={state.draft}
          onChange={(event) =>
            dispatch({
              type: 'SET_DRAFT',
              payload: event.target.value,
            })
          }
          onKeyDown={handleKeyDown}
          placeholder="Escribe una pregunta para DeepSeek..."
          rows="3"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !state.draft.trim()}
        >
          {loading ? 'Generando...' : 'Enviar'}
        </button>
      </div>

      <small>
        Enter para enviar. Shift + Enter para agregar otra línea.
      </small>
    </form>
  );
}

export default ChatForm;