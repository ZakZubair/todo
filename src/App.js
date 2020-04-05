import React, { Component } from 'react';
import Input from './components/Form';
import List from './components/List';

// TODO: refactor the list ID
// Initial Id set to 2
let listId = 2;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      listItems: [
        {
          id: 1,
          name: 'New todo',
          description: 'Testing the todo list',
          checked: false,
          dateCreated: new Date(),
        },
        {
          id: 2,
          name: 'Test TODO',
          description: 'Test the todo for much longer text for it\'s visibility on the screen',
          checked: false,
          dateCreated: new Date(),
        },
      ],
    };
  }

  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  }

  handleCreate = () => {
    const { name, description, listItems } = this.state;
    this.setState({
      name: '',
      description: '',
      listItems: listItems.concat({
        id: listId += 1,
        name,
        description,
        checked: false,
        dateCreated: new Date(),
      }),
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { listItems } = this.state;
    const index = listItems.findIndex((todo) => todo.id === id);

    const selected = listItems[index];

    this.setState({
      listItems: [
        ...listItems.slice(0, index),
        {
          ...selected,
          checked: !selected.checked,
        },
        ...listItems.slice(index + 1, listItems.length),
      ],
    });
  }

  handleRemove = (id) => {
    const { listItems } = this.state;
    this.setState({
      listItems: listItems.filter((todo) => todo.id !== id),
    });
  }

  handleEdit = (id) => {
    console.log('test', id);
  }

  render() {
    const { name, description, listItems } = this.state;
    const {
      handleNameChange,
      handleDescriptionChange,
      handleCreate,
      handleToggle,
      handleKeyPress,
      handleRemove,
      handleEdit,
    } = this;

    return (
      <div className="todo__container">
        <Input
          name={name}
          description={description}
          onChangeName={handleNameChange}
          onChangeDescription={handleDescriptionChange}
          onKeyPress={handleKeyPress}
          onCreate={handleCreate}
        />

        <List
          listItems={listItems}
          onToggle={handleToggle}
          onRemove={handleRemove}
          onEdit={handleEdit}
        />
      </div>
    );
  }
}

export default App;
