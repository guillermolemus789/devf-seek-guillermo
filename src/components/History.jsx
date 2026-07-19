import { useChat } from '../context/ChatContext';

function History() {
  const { state, dispatch } = useChat();

  const userQuestions = state.messages.filter(
    (message) => message.role === 'user'
  );

  const loadQuestion = (question) => {
    dispatch({
      type: 'SET_DRAFT',
      payload: question,
    });
  };

  const clearHistory = () => {
    dispatch({
      type: 'CLEAR_HISTORY',
    });
  };

  return (
    <aside className="history">
      <div className="history-header">
        <h2>Historial</h2>

        {userQuestions.length > 0 && (
          <button
            className="clear-button"
            type="button"
            onClick={clearHistory}
          >
            Limpiar
          </button>
        )}
      </div>

      {userQuestions.length === 0 ? (
        <p className="history-empty">
          Todavía no hay consultas.
        </p>
      ) : (
        <ul className="history-list">
          {userQuestions
            .slice()
            .reverse()
            .map((message) => (
              <li key={message.id}>
                <button
                  type="button"
                  onClick={() =>
                    loadQuestion(message.content)
                  }
                >
                  {message.content}
                </button>
              </li>
            ))}
        </ul>
      )}
    </aside>
  );
}

export default History;