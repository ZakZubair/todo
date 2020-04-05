const todoList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
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
