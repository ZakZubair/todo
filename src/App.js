import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
  captureRecording,
  stopRecording,
  clearRecording,
  playRecording,
} from './actions';
import Input from './components/Form';
import List from './components/List';
import VCR from './components/VCR';
import Logo from './assets/img/logo.png';

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

  // Handle the edit function
  handleEdit = (id, updatedName, updatedDescription) => {
    const { dispatch } = this.props;
    const currentTime = new Date();
    dispatch(editTodo({
      id,
      name: updatedName,
      description: updatedDescription,
      dateUpdated: currentTime,
    }));
  }

  // Handle record
  handleCaptureRecording = () => {
    const { dispatch } = this.props;
    dispatch(captureRecording());
  }

  // Handle stop record
  handleStopRecording = () => {
    const { dispatch } = this.props;
    dispatch(stopRecording());
  }

  // Handle clear recording
  handleClearRecording = () => {
    const { dispatch } = this.props;
    dispatch(clearRecording());
  }

  // Handle clear recording
  handlePlayRecording = () => {
    const { dispatch } = this.props;
    dispatch(playRecording());
  }

  render() {
    const { name, description } = this.state;
    const {
      listItems,
      isRecording,
      recordingAvailable,
      playRecordingTimeElapsed,
      isPlayingRecording,
      recordedTime,
    } = this.props;
    const {
      handleNameChange,
      handleDescriptionChange,
      handleCreate,
      handleToggle,
      handleKeyPress,
      handleRemove,
      handleEdit,
      handleCaptureRecording,
      handleStopRecording,
      handleClearRecording,
      handlePlayRecording,
    } = this;

    return (
      <div className={`todo__container ${isRecording ? 'todo__container--recording' : ''} ${isPlayingRecording ? 'todo__container--playing' : ''}`}>
        <div className="todo__header">
          <img src={Logo} className="todo__logo" alt="ToDo. Logo" />
        </div>
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

        <VCR
          recordingAvailable={recordingAvailable}
          isPlayingRecording={isPlayingRecording}
          recordedTime={recordedTime}
          playRecordingTimeElapsed={playRecordingTimeElapsed}
          isRecording={isRecording}
          onClickCaptureRecording={handleCaptureRecording}
          onClickStopRecording={handleStopRecording}
          onClickPlayRecording={handleClearRecording}
          onClickClearRecording={handlePlayRecording}
        />
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  listItems: PropTypes.arrayOf(PropTypes.any).isRequired,
  isRecording: PropTypes.bool.isRequired,
  recordingAvailable: PropTypes.bool.isRequired,
  recordedTime: PropTypes.string.isRequired,
  isPlayingRecording: PropTypes.bool.isRequired,
  playRecordingTimeElapsed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

const mapStateToProps = (state) => {
  const { todoList, vcr } = state;
  const { todoItems } = todoList;

  let recordedTodoItems;
  if (vcr.isPlayingRecording) {
    recordedTodoItems = [
      ...vcr.recording[vcr.recordingStep].currentState,
    ];
  }

  return {
    listItems: recordedTodoItems || todoItems,
    isRecording: vcr.isRecording,
    recordingAvailable:
      vcr.recording.length > 1 && !vcr.isRecording,
    recordedTime: vcr.recordedTime,
    isPlayingRecording: vcr.isPlayingRecording,
    playRecordingTimeElapsed: vcr.playRecordingTimeElapsed,
  };
};

export default connect(mapStateToProps)(App);
