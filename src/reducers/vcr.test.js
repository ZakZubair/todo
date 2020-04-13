import { REHYDRATE } from 'redux-persist/lib/constants';
import reducer from './vcr';
import * as types from '../constants/actionTypes';
import { getCurrentTime } from '../helpers';

// VCR initial state
const initialState = {
  recording: [],
  recordingStep: 0,
  recordedTime: '',
  isRecording: false,
  isPlayingRecording: false,
  playRecordingTimeElapsed: '',
};

// Mock data without recordings
const capturedWithoutRecording = [
  { action: types.CAPTURE_RECORDING },
  { action: types.STOP_RECORDING },
];

// Mock data with recordings
const capturedRecording = [
  { action: types.CAPTURE_RECORDING },
  { action: types.ADD_TODO },
  { action: types.EDIT_TODO },
  { action: types.TOGGLE_TODO },
  { action: types.DELETE_TODO },
  { action: types.STOP_RECORDING },
];

describe('vcr reducer', () => {
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('should handle REHYDRATE', () => {
    it('should rehydrated the persisted state', () => {
      const rehydrateAction = {
        type: REHYDRATE,
        payload: {
          recording: ['Saved recording'],
          recordedTime: '09/04/2020 16:25 pm',
        },
      };

      const updatedState = reducer(initialState, rehydrateAction);
      expect(updatedState.recordedTime).toBe('09/04/2020 16:25 pm');
    });

    it('should keep the initial state', () => {
      const rehydrateAction = {
        type: REHYDRATE,
        payload: null,
      };

      const updatedState = reducer(initialState, rehydrateAction);
      expect(updatedState).toEqual(initialState);
    });
  });

  it('should handle CAPTURE_RECORDING', () => {
    const updatedState = reducer(initialState, {
      type: types.CAPTURE_RECORDING,
    });

    const expectedState = { ...initialState, isRecording: true };
    expect(updatedState).toEqual(expectedState);
  });

  it('should handle STOP_RECORDING', () => {
    const onStopRecordingState = {
      ...initialState,
      recording: capturedRecording,
      isRecording: true,
    };

    const updatedState = reducer(onStopRecordingState, {
      type: types.STOP_RECORDING,
    });

    const expectedState = {
      ...onStopRecordingState,
      isRecording: false,
      recordedTime: getCurrentTime(),
    };

    expect(updatedState).toEqual(expectedState);
  });

  it('should handle STOP_RECORDING without any recordings', () => {
    const onStopRecordingState = {
      ...initialState,
      recording: capturedWithoutRecording,
      isRecording: true,
    };

    const updatedState = reducer(onStopRecordingState, {
      type: types.STOP_RECORDING,
    });

    expect(updatedState).toEqual(initialState);
  });

  it('should handle VCR_ACTION', () => {
    const recordAction = {
      type: types.VCR_ACTION,
      payload: { recordedAction: { some: 'state' } },
    };

    const onRecordState = {
      ...initialState,
      isRecording: true,
    };

    const updatedState = reducer(onRecordState, recordAction);

    expect(updatedState.recording.length).toEqual(1);
  });

  it('should handle CLEAR_RECORDING', () => {
    const beforeClearState = {
      ...initialState,
      recording: [],
      recordedTime: 'Time',
    };

    const updatedState = reducer(beforeClearState, {
      type: types.CLEAR_RECORDING,
    });

    expect(updatedState).toEqual(initialState);
  });

  it('should handle PLAY_RECORDING', () => {
    const beforePlayState = {
      ...initialState,
      recording: capturedRecording,
      recordedTime: 'Time',
    };

    const updatedState = reducer(beforePlayState, {
      type: types.PLAY_RECORDING,
    });

    expect(updatedState.isPlayingRecording).toBeTruthy();
  });

  it('should handle PLAY_NEXT_RECORDING', () => {
    const beforePlayActionState = {
      ...initialState,
      recording: capturedRecording,
      recordedTime: 'time',
      recordingStep: 2,
      playRecordingTimeElapsed: '0:02',
    };

    const updatedState = reducer(beforePlayActionState, {
      type: types.PLAY_NEXT_RECORDING,
    });

    expect(updatedState.recordingStep).toBe(3);
  });
  it('should handle finished playing through actions', () => {
    const beforePlayActionState = {
      ...initialState,
      recording: capturedWithoutRecording,
      recordedTime: 'Time',
      recordingStep: 3,
    };

    const updatedState = reducer(beforePlayActionState, {
      type: types.PLAY_NEXT_RECORDING,
    });

    expect(updatedState.recordingStep).toBe(0);
    expect(updatedState.isPlayingRecording).toBeFalsy();
    expect(updatedState.playRecordingTimeElapsed).toBe(0);
  });
});
