import { REHYDRATE } from 'redux-persist/lib/constants';
import reducer from './todoList';
import * as types from '../constants/actionTypes';

describe('todoList reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      todoItems: [],
    });
  });

  describe('should handle REHYDRATE', () => {
    it('should rehydrated the persisted state', () => {
      const rehydrateAction = {
        type: REHYDRATE,
        payload: {
          todoItems: ['Persisted todo items'],
        },
      };

      const initialState = { todoItems: [] };
      const updatedState = reducer(initialState, rehydrateAction);
      expect(updatedState.todoItems.length).toBe(1);
    });

    it('should rehydrated keep initial state', () => {
      const rehydrateAction = {
        type: REHYDRATE,
        payload: null,
      };

      const initialState = { todoItems: [] };
      const updatedState = reducer(initialState, rehydrateAction);
      expect(updatedState).toEqual(initialState);
    });
  });

  it('should handle ADD_TODO', () => {
    const addTodoAction = {
      type: types.ADD_TODO,
      todoItems: {
        name: 'Added title',
        description: 'Added description',
        checked: false,
        dateCreated: '',
        dateUpdated: '',
      },
    };

    const initialState = {
      todoItems: [
        {
          name: 'Existing title',
          description: 'Existing description',
          checked: true,
          dateCreated: '',
          dateUpdated: '',
        },
      ],
    };

    const updatedState = reducer(initialState, addTodoAction);
    expect(updatedState.todoItems.length).toBe(2);
  });

  it('should handle EDIT_TODO', () => {
    const editTodoAction = {
      type: types.EDIT_TODO,
      id: 'def456',
      name: 'Edited title',
      description: 'Edited description',
      checked: false,
      dateUpdated: '',
    };

    const initialState = {
      todoItems: [
        {
          id: 'abc123',
          name: 'Existing title',
          description: 'Existing description',
          checked: true,
          dateCreated: '',
        },
        {
          id: 'def456',
          name: 'Existing title 2',
          description: 'Existing description 2',
          checked: false,
          dateCreated: '',
          dateUpdated: '',
        },
      ],
    };

    const updatedState = reducer(initialState, editTodoAction);
    expect(updatedState.todoItems.find((todo) => todo.id === 'def456').description).toBe(
      'Edited description',
    );
  });

  it('should handle DELETE_TODO', () => {
    const removeTodoAction = {
      type: types.DELETE_TODO,
      id: 'abc123',
    };

    const initialState = {
      todoItems: [
        { id: 'abc123', description: 'To remove' },
        { id: 'cde456', description: 'To keep' },
      ],
    };

    const updatedState = reducer(initialState, removeTodoAction);
    expect(updatedState.todoItems.findIndex((todo) => todo.id === '123')).toBe(-1);
  });

  it('should handle TOGGLE_TODO', () => {
    const toggleTodoAction = {
      type: types.TOGGLE_TODO,
      id: 'abc123',
    };

    const initialState = {
      todoItems: [{ id: 'abc123', checked: false }],
    };
    const updatedState = reducer(initialState, toggleTodoAction);
    expect(
      updatedState.todoItems.find((todo) => todo.id === 'abc123').checked,
    ).toBeTruthy();
  });
});
