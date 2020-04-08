import { REHYDRATE } from 'redux-persist/lib/constants';
import dayjs from 'dayjs';
import { getTimeElapsedInMinutes } from '../helpers';

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
    case 'vcr/CAPTURE_RECORDING': {
      return {
        ...state,
        recording: [],
        isRecording: true,
      };
    }
    case 'vcr/STOP_RECORDING': {
      if (
        state.recording.every((record) => record.action.includes('vcr/'))
      ) {
        return {
          ...state,
          isRecording: false,
          recording: [],
        };
      }
      const currentTime = dayjs().format('DD/MM/YYYY HH:mm a');

      return {
        ...state,
        isRecording: false,
        recordedTime: currentTime,
      };
    }
    case 'vcr/PLAY_RECORDING': {
      const timeElapsed = getTimeElapsedInMinutes(state.recording.length - 1);

      return {
        ...state,
        isPlayingRecording: true,
        recordingStep: 0,
        playRecordingTimeElapsed: timeElapsed,
      };
    }
    case 'PLAY_NEXT_RECORDING': {
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
    case 'vcr/CLEAR_RECORDING': {
      return {
        ...state,
        recording: [],
        recordedTime: '',
      };
    }
    case 'VCR_ACTION': {
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
