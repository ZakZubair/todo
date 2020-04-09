import reducer from './todoList';
import * as types from '../constants/actionTypes';
import * as actions from '../actions';

describe('todoList reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      todoItems: [],
    });
  });
  it('addTodo action', () => {
    const expectedAction = {
      type: types.ADD_TODO,
      name: undefined,
      description: undefined,
      checked: undefined,
      dateCreated: undefined,
      dateUpdated: undefined,
    };

    expect(actions.addTodo('name', 'description', false, '', '')).toEqual(expectedAction);
  });

  it('editTodo action', () => {
    const expectedAction = {
      type: types.EDIT_TODO,
      id: undefined,
      name: undefined,
      description: undefined,
      dateUpdate: undefined,
    };

    expect(actions.editTodo(124, 'Update name', 'Update description', '')).toEqual(
      expectedAction,
    );
  });
  it('deleteTodo action', () => {
    const expectedAction = {
      type: types.DELETE_TODO,
      id: 1,
    };

    expect(actions.deleteTodo(1)).toEqual(expectedAction);
  });
  it('toggleTodo action', () => {
    const expectedAction = {
      type: types.TOGGLE_TODO,
      id: 2,
    };

    expect(actions.toggleTodo(2)).toEqual(expectedAction);
  });
});
