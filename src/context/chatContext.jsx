import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import {
  chatReducer,
  initialState,
} from './chatReducer.js';

const ChatContext = createContext(null);

function getInitialState() {
  try {
    const savedMessages = localStorage.getItem(
      'devfseek-messages'
    );

    if (!savedMessages) {
      return initialState;
    }

    return {
      ...initialState,
      messages: JSON.parse(savedMessages),
    };
  } catch (error) {
    console.error(
      'No se pudo leer el historial:',
      error
    );

    return initialState;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(
    chatReducer,
    initialState,
    getInitialState
  );

  useEffect(() => {
    localStorage.setItem(
      'devfseek-messages',
      JSON.stringify(state.messages)
    );
  }, [state.messages]);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error(
      'useChat debe utilizarse dentro de ChatProvider'
    );
  }

  return context;
}