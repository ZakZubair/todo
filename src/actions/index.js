import * as types from '../constants/actionTypes';

// TODO Items
export const addTodo = (todoItem) => ({
  type: types.ADD_TODO,
  name: todoItem.name,
  description: todoItem.description,
  checked: todoItem.checked,
  dateCreated: todoItem.dateCreated,
  dateUpdated: todoItem.dateUpdated,
});

export const editTodo = (todoItem) => ({
  type: types.EDIT_TODO,
  id: todoItem.id,
  name: todoItem.name,
  description: todoItem.description,
  dateUpdated: todoItem.dateUpdated,
});

export const deleteTodo = (id) => ({
  type: types.DELETE_TODO,
  id,
});

export const toggleTodo = (id) => ({
  type: types.TOGGLE_TODO,
  id,
});

// VCR Recordings
export const captureRecording = () => ({
  type: types.CAPTURE_RECORDING,
});

export const stopRecording = () => ({
  type: types.STOP_RECORDING,
});

export const playRecording = () => ({
  type: types.PLAY_RECORDING,
});

export const clearRecording = () => ({
  type: types.CLEAR_RECORDING,
});
