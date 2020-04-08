import { REHYDRATE } from 'redux-persist/lib/constants';
import { v4 as uuid } from 'uuid';
import * as types from '../constants/actionTypes';

const initialState = {
  todoItems: [],
};

const todoList = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      if (action.payload && action.payload.todoItems) {
        return {
          ...state,
          todoItems: action.payload.todoItems,
        };
      }
      return state;
    case types.ADD_TODO: {
      const newItem = {
        id: uuid(),
        name: action.name,
        description: action.description,
        checked: action.checked,
        dateCreated: action.dateCreated,
        dateUpdated: action.dateUpdated,
      };
      const todoItems = [...state.todoItems];

      todoItems.unshift(newItem);

      return {
        ...state,
        todoItems,
      };
    }
    case types.EDIT_TODO: {
      const {
        id, name, description, dateUpdated,
      } = action;

      const todoItems = [...state.todoItems];

      const index = todoItems.findIndex((todo) => todo.id === id);

      todoItems[index].name = name;
      todoItems[index].description = description;
      todoItems[index].dateUpdated = dateUpdated;

      return {
        ...state,
        todoItems,
      };
    }
    case types.DELETE_TODO: {
      const { id } = action;
      const todoItems = state.todoItems.filter((todo) => todo.id !== id);

      return {
        ...state,
        todoItems,
      };
    }
    case types.TOGGLE_TODO: {
      const { id } = action;
      const todoItems = [...state.todoItems];

      const index = todoItems.findIndex((todo) => todo.id === id);

      todoItems[index].checked = !todoItems[index].checked;

      return {
        ...state,
        todoItems,
      };
    }
    default:
      return state;
  }
};

export default todoList;
