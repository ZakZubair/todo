// initial todo item id
let listId = 0;
export const addTodo = (todoItem) => ({
  type: 'ADD_TODO',
  id: listId += 1,
  name: todoItem.name,
  description: todoItem.description,
  checked: todoItem.checked,
  dateCreated: todoItem.dateCreated,
  dateUpdated: todoItem.dateUpdated,
});

export const editTodo = (todoItem) => ({
  type: 'EDIT_TODO',
  id: todoItem.id,
  name: todoItem.name,
  description: todoItem.description,
  dateUpdated: todoItem.dateUpdated,
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  id,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});
