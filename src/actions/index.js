// TODO Items
export const addTodo = (todoItem) => ({
  type: 'todoList/ADD_TODO',
  name: todoItem.name,
  description: todoItem.description,
  checked: todoItem.checked,
  dateCreated: todoItem.dateCreated,
  dateUpdated: todoItem.dateUpdated,
});

export const editTodo = (todoItem) => ({
  type: 'todoList/EDIT_TODO',
  id: todoItem.id,
  name: todoItem.name,
  description: todoItem.description,
  dateUpdated: todoItem.dateUpdated,
});

export const deleteTodo = (id) => ({
  type: 'todoList/DELETE_TODO',
  id,
});

export const toggleTodo = (id) => ({
  type: 'todoList/TOGGLE_TODO',
  id,
});

// VCR Recordings
export const captureRecording = () => ({
  type: 'vcr/CAPTURE_RECORDING',
});

export const stopRecording = () => ({
  type: 'vcr/STOP_RECORDING',
});

export const playRecording = () => ({
  type: 'vcr/PLAY_RECORDING',
});

export const clearRecording = () => ({
  type: 'vcr/CLEAR_RECORDING',
});
