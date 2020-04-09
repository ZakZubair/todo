import reducer from './vcr';
import * as types from '../constants/actionTypes';
import * as actions from '../actions';

describe('vcr reducer', () => {
  it('should return the initial state', () => {
    expect(reducer({
      recording: [],
      recordingStep: 2,
      recordedTime: 'Time',
      isRecording: false,
      isPlayingRecording: false,
      playRecordingTimeElapsed: 'Time',
    }, {})).toEqual({
      recording: [],
      recordingStep: 2,
      recordedTime: 'Time',
      isRecording: false,
      isPlayingRecording: false,
      playRecordingTimeElapsed: 'Time',
    });
  });
  it('startRecording action', () => {
    const expectedAction = {
      type: types.CAPTURE_RECORDING,
    };

    expect(actions.captureRecording()).toEqual(expectedAction);
  });
  it('stopRecording action', () => {
    const expectedAction = {
      type: types.STOP_RECORDING,
    };

    expect(actions.stopRecording()).toEqual(expectedAction);
  });
  it('playRecording action', () => {
    const expectedAction = {
      type: types.PLAY_RECORDING,
    };

    expect(actions.playRecording()).toEqual(expectedAction);
  });
  it('clearRecording action', () => {
    const expectedAction = {
      type: types.CLEAR_RECORDING,
    };

    expect(actions.clearRecording()).toEqual(expectedAction);
  });
});
