import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addTodo, deleteTodo, toggleTodo } from './actions';
import Input from './components/Form';
import List from './components/List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
    };
  }

  // Handle onChange event for name input
  handleNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  // Handle onChange event for description input
  handleDescriptionChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  }

  // Handle the create function
  handleCreate = () => {
    const { name, description } = this.state;
    const { dispatch } = this.props;
    if (name !== '' && description !== '') {
      dispatch(addTodo({
        name,
        description,
        checked: false,
        dateCreated: new Date(),
        dateUpdated: null,
      }));
      this.setState({
        name: '',
        description: '',
      });
    }
  }

  // Handle key pressing on description
  handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      this.handleCreate();
    }
  }

  // Handle toggle selection
  handleToggle = (id) => {
    const { dispatch } = this.props;
    dispatch(toggleTodo(id));
  }

  // Handle the delete function
  handleRemove = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteTodo(id));
  }

  // TODO: update the edit function
  // Handle the edit function
  handleEdit = (id) => {
    console.log('test', id);
  }

  render() {
    const { name, description } = this.state;
    const { listItems } = this.props;
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

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => {
  const { todoList } = state;
  return {
    listItems: todoList,
  };
};

export default connect(mapStateToProps)(App);
