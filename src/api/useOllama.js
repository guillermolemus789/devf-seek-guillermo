import { useState } from 'react';
import { useChat } from '../context/ChatContext';

const MODEL_NAME = 'deepseek-r1:1.5b';

function useOllama() {
  const { state, dispatch } = useChat();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateResponse = async (prompt) => {
    const cleanPrompt = prompt.trim();

    if (!cleanPrompt || loading) {
      return;
    }

    setLoading(true);
    setError(null);

    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: cleanPrompt,
      createdAt: new Date().toISOString(),
    };

    const assistantMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
    };

    dispatch({
      type: 'ADD_MESSAGE',
      payload: userMessage,
    });

    dispatch({
      type: 'ADD_MESSAGE',
      payload: assistantMessage,
    });

    dispatch({
      type: 'SET_DRAFT',
      payload: '',
    });

    let completeResponse = '';

    const conversation = state.messages
  .map((message) => {
    const role =
      message.role === 'user'
        ? 'Usuario'
        : 'Asistente';

    return `${role}: ${message.content}`;
  })
  .join('\n');

const promptWithHistory = `
Continúa la siguiente conversación en español.

${conversation}

Usuario: ${cleanPrompt}
Asistente:
`;



    try {
      const response = await fetch('/ollama/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
     body: JSON.stringify({
  model: MODEL_NAME,

  system: `
    Eres un asistente virtual útil.
    Responde siempre en español.
    Explica las respuestas de forma clara y ordenada.
    No cambies a otro idioma, excepto cuando el usuario lo solicite.
  `,

  prompt: promptWithHistory,
  stream: true,

  options: {
    num_predict: 500,
    temperature: 0.7,
  },
}),

      });

      if (!response.ok) {
        throw new Error(
          `Ollama respondió con el estado ${response.status}`
        );
      }

      if (!response.body) {
        throw new Error(
          'El navegador no recibió el cuerpo de la respuesta'
        );
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      let buffer = '';
      let finished = false;

      while (!finished) {
        const { value, done } = await reader.read();

        if (done) {
          finished = true;
        }

        buffer += decoder.decode(value || new Uint8Array(), {
          stream: !done,
        });

        const lines = buffer.split('\n');

        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) {
            continue;
          }

          try {
            const data = JSON.parse(line);

            if (data.response) {
              completeResponse += data.response;

              dispatch({
                type: 'UPDATE_MESSAGE',
                payload: {
                  id: assistantMessage.id,
                  content: completeResponse,
                },
              });
            }

            if (data.done) {
              finished = true;
            }
          } catch (parseError) {
            console.warn(
              'No se pudo interpretar una línea:',
              line,
              parseError
            );
          }
        }
      }

      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer);

          if (data.response) {
            completeResponse += data.response;

            dispatch({
              type: 'UPDATE_MESSAGE',
              payload: {
                id: assistantMessage.id,
                content: completeResponse,
              },
            });
          }
        } catch (parseError) {
          console.warn(
            'No se pudo interpretar el último fragmento:',
            parseError
          );
        }
      }

      if (!completeResponse.trim()) {
        dispatch({
          type: 'UPDATE_MESSAGE',
          payload: {
            id: assistantMessage.id,
            content: 'Ollama no devolvió contenido.',
          },
        });
      }
    } catch (requestError) {
      console.error('Error al consultar Ollama:', requestError);

      const errorMessage =
        requestError instanceof Error
          ? requestError.message
          : 'Ocurrió un error desconocido';

      setError(errorMessage);

      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: {
          id: assistantMessage.id,
          content:
            'No pude conectarme con Ollama. Verifica que esté iniciado y que el modelo esté instalado.',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    generateResponse,
    loading,
    error,
  };
}

export default useOllama;