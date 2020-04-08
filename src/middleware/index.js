import { applyMiddleware } from 'redux';
import * as types from '../constants/actionTypes';

let nextPlay = null;
const playRecording = (store) => (next) => (action) => {
  if (action.type === types.PLAY_RECORDING) {
    nextPlay = setInterval(() => {
      store.dispatch({
        type: types.PLAY_NEXT_RECORDING,
      });
    }, 1000); // 1 second gap between action
  }

  next(action);

  if (action.type === types.PLAY_NEXT_RECORDING && !store.getState().vcr.isPlayingRecording) {
    clearInterval(nextPlay);
  }
};

const vcrAction = (store) => (next) => (action) => {
  if (action.type === types.CAPTURE_RECORDING || action.type === types.STOP_RECORDING || (store.getState().vcr.isRecording && action.type.includes('todoList/'))) {
    const currentTodoListState = store.getState().todoList.todoItems.map((todo) => ({ ...todo }));

    const capturedAction = {
      action: action.type,
      currentState: currentTodoListState,
    };

    store.dispatch({
      type: types.VCR_ACTION,
      payload: { capturedAction },
    });
  }
  next(action);
};

const combineMiddleware = applyMiddleware(playRecording, vcrAction);

export default combineMiddleware;
