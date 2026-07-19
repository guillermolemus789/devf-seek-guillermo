import { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';

function ChatMessages() {
  const { state } = useChat();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [state.messages]);

  if (state.messages.length === 0) {
    return (
      <section className="empty-chat">
        <h2>Bienvenido a DevfSeek</h2>

        <p>
          Escribe una pregunta para comenzar una conversación
          local con DeepSeek R1.
        </p>
      </section>
    );
  }

  return (
    <section className="messages">
      {state.messages.map((message) => (
        <article
          key={message.id}
          className={`message message-${message.role}`}
        >
          <div className="message-label">
            {message.role === 'user'
              ? 'Tú'
              : 'DeepSeek R1'}
          </div>

          <div className="message-content">
            {message.content ||
              (message.role === 'assistant'
                ? 'Pensando...'
                : '')}
          </div>
        </article>
      ))}

      <div ref={bottomRef} />
    </section>
  );
}

export default ChatMessages;