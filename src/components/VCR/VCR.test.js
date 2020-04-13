import React from 'react';
import renderer from 'react-test-renderer';
import VCR from './VCR';

const mockCallBack = jest.fn();

const commonProps = {
  onClickCaptureRecording: mockCallBack,
  onClickStopRecording: mockCallBack,
  onClickPlayRecording: mockCallBack,
  onClickClearRecording: mockCallBack,
};

describe('test VCR component', () => {
  it('render record button correctly', () => {
    const VCRComponent = renderer.create(
      <VCR
        recordingAvailable={false}
        isPlayingRecording={false}
        isRecording={false}
        recordedTime=""
        playRecordingTimeElapsed=""
        {...commonProps}
      />,
    ).toJSON();
    expect(VCRComponent).toMatchSnapshot();
  });

  it('render stop button correctly', () => {
    const VCRComponent = renderer.create(
      <VCR
        recordingAvailable={false}
        isPlayingRecording={false}
        isRecording
        recordedTime=""
        playRecordingTimeElapsed=""
        {...commonProps}
      />,
    ).toJSON();
    expect(VCRComponent).toMatchSnapshot();
  });

  it('render play button correctly', () => {
    const VCRComponent = renderer.create(
      <VCR
        recordingAvailable
        isPlayingRecording={false}
        isRecording={false}
        recordedTime=""
        playRecordingTimeElapsed=""
        {...commonProps}
      />,
    ).toJSON();
    expect(VCRComponent).toMatchSnapshot();
  });

  it('render playing correctly', () => {
    const VCRComponent = renderer.create(
      <VCR
        recordingAvailable
        isPlayingRecording
        isRecording
        recordedTime=""
        playRecordingTimeElapsed="0:10"
        {...commonProps}
      />,
    ).toJSON();
    expect(VCRComponent).toMatchSnapshot();
  });
});
