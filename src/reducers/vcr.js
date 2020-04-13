import { REHYDRATE } from 'redux-persist/lib/constants';
import { getTimeElapsedInMinutes, getCurrentTime } from '../helpers';
import * as types from '../constants/actionTypes';

const initialState = {
  recording: [],
  recordingStep: 0,
  recordedTime: '',
  isRecording: false,
  isPlayingRecording: false,
  playRecordingTimeElapsed: '',
};

const vcr = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      if (
        action.payload
        && action.payload.recording
        && action.payload.recordedTime
      ) {
        return {
          ...state,
          recording: action.payload.recording,
          recordedTime: action.payload.recordedTime,
        };
      }
      return state;
    }
    case types.CAPTURE_RECORDING: {
      return {
        ...state,
        recording: [],
        isRecording: true,
      };
    }
    case types.STOP_RECORDING: {
      if (
        state.recording.every((record) => record.action.includes('vcr/'))
      ) {
        return {
          ...state,
          isRecording: false,
          recording: [],
        };
      }

      return {
        ...state,
        isRecording: false,
        recordedTime: getCurrentTime(),
      };
    }
    case types.PLAY_RECORDING: {
      const timeElapsed = getTimeElapsedInMinutes(state.recording.length - 1);

      return {
        ...state,
        isPlayingRecording: true,
        recordingStep: 0,
        playRecordingTimeElapsed: timeElapsed,
      };
    }
    case types.PLAY_NEXT_RECORDING: {
      const { recordingStep, recording } = state;
      if (recordingStep < recording.length - 1) {
        const timeElapsed = getTimeElapsedInMinutes(
          recording.length - recordingStep - 2,
        );

        return {
          ...state,
          recordingStep: recordingStep + 1,
          playRecordingTimeElapsed: timeElapsed,
        };
      }
      return {
        ...state,
        recordingStep: 0,
        isPlayingRecording: false,
        playRecordingTimeElapsed: 0,
      };
    }
    case types.CLEAR_RECORDING: {
      return {
        ...state,
        recording: [],
        recordedTime: '',
      };
    }
    case types.VCR_ACTION: {
      const recording = [...state.recording];

      recording.push(action.payload.capturedAction);

      return {
        ...state,
        recording,
      };
    }
    default:
      return state;
  }
};

export default vcr;
