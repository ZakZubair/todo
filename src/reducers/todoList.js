import { REHYDRATE } from 'redux-persist/lib/constants';
import uuid from 'uuid/v4';

const initialState = [];

const todoList = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload && action.payload.todoList) {
        return [
          ...state,
          ...action.payload.todoList,
        ];
      }
      return state;
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: uuid(),
          name: action.name,
          description: action.description,
          checked: action.checked,
          dateCreated: action.dateCreated,
          dateUpdated: action.dateUpdated,
        },
      ];
    case 'EDIT_TODO':
      return state.map((todo) => ((todo.id === action.id)
        ? {
          ...todo,
          name: action.name,
          description: action.description,
          dateUpdated: action.dateUpdated,
        }
        : todo));
    case 'DELETE_TODO':
      return state.filter((todo) => todo.id !== action.id);
    case 'TOGGLE_TODO':
      return state.map((todo) => ((todo.id === action.id)
        ? { ...todo, checked: !todo.checked }
        : todo));
    default:
      return state;
  }
};

export default todoList;
