import { applyMiddleware } from 'redux';

let nextPlay = null;
const playRecording = (store) => (next) => (action) => {
  if (action.type === 'vcr/PLAY_RECORDING') {
    nextPlay = setInterval(() => {
      store.dispatch({
        type: 'PLAY_NEXT_RECORDING',
      });
    }, 1000); // 1 second gap between action
  }

  next(action);

  if (action.type === 'PLAY_NEXT_RECORDING' && !store.getState().vcr.isPlayingRecording) {
    clearInterval(nextPlay);
  }
};

const vcrAction = (store) => (next) => (action) => {
  if (action.type === 'vcr/CAPTURE_RECORDING' || action.type === 'vcr/STOP_RECORDING' || (store.getState().vcr.isRecording && action.type.includes('todoList/'))) {
    const currentTodoListState = store.getState().todoList.todoItems.map((todo) => ({ ...todo }));

    const capturedAction = {
      action: action.type,
      currentState: currentTodoListState,
    };

    store.dispatch({
      type: 'VCR_ACTION',
      payload: { capturedAction },
    });
  }
  next(action);
};

const combineMiddleware = applyMiddleware(playRecording, vcrAction);

export default combineMiddleware;
