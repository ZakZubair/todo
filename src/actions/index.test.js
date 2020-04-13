import * as actions from './index';
import * as types from '../constants/actionTypes';

describe('todoList actions', () => {
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

describe('VCR actions', () => {
  it('startRecording action', () => {
    const expectedAction = {
      type: types.CAPTURE_RECORDING,
    };

    expect(actions.captureRecording()).toEqual(expectedAction);
  });

  it('stopRecording action', () => {
    const expectedAction = {
      type: types.STOP_RECORDING,
    };

    expect(actions.stopRecording()).toEqual(expectedAction);
  });

  it('playRecording action', () => {
    const expectedAction = {
      type: types.PLAY_RECORDING,
    };

    expect(actions.playRecording()).toEqual(expectedAction);
  });

  it('clearRecording action', () => {
    const expectedAction = {
      type: types.CLEAR_RECORDING,
    };

    expect(actions.clearRecording()).toEqual(expectedAction);
  });
});
