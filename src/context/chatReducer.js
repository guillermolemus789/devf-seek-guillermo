export const initialState = {
  messages: [],
  draft: '',
};

export function chatReducer(state, action) {
  switch (action.type) {
    case 'SET_DRAFT':
      return {
        ...state,
        draft: action.payload,
      };

    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case 'UPDATE_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((message) =>
          message.id === action.payload.id
            ? {
                ...message,
                content: action.payload.content,
              }
            : message
        ),
      };

    case 'CLEAR_HISTORY':
      return {
        ...state,
        messages: [],
        draft: '',
      };

    default:
      return state;
  }
}