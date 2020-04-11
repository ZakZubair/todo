import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import DeleteIcon from '../../assets/img/delete.svg';

class VCR extends PureComponent {
  render() {
    const {
      recordingAvailable,
      isPlayingRecording,
      recordedTime,
      playRecordingTimeElapsed,
      isRecording,
      onClickCaptureRecording,
      onClickStopRecording,
      onClickPlayRecording,
      onClickClearRecording,
    } = this.props;

    let layout;
    let textAnimation = false;

    if (recordingAvailable && !isPlayingRecording) {
      layout = `Captured at ${recordedTime}`;
      textAnimation = true;
    } else if (recordingAvailable && isPlayingRecording) {
      layout = playRecordingTimeElapsed;
    } else if (isRecording) {
      layout = 'Recording...';
      textAnimation = false;
    } else {
      layout = 'Click to record';
    }

    return (
      <div className="vcr__sticky-header">
        <div className="vcr__sticky-header--display">
          <span className={textAnimation ? 'animated' : ''}>{layout}</span>
        </div>
        <div className="vcr__sticky-header--actions">
          {!isRecording && !recordingAvailable && (
            <Button className="button__record" onClick={onClickCaptureRecording} aria-label="Record" />
          )}
          {isRecording && (
            <Button className="button__stop" onClick={onClickStopRecording} aria-label="Stop Recording" />
          )}
          {recordingAvailable && (
            <Button className={`button__play ${isPlayingRecording ? 'button__play__playing' : ''}`} onClick={onClickPlayRecording} aria-label="Play Recording" />
          )}
          {recordingAvailable && !isPlayingRecording && (
            <Button className="button__clear" onClick={onClickClearRecording}>
              <img src={DeleteIcon} alt="delete" />
            </Button>
          )}
        </div>
      </div>
    );
  }
}

VCR.propTypes = {
  recordingAvailable: PropTypes.bool.isRequired,
  isPlayingRecording: PropTypes.bool.isRequired,
  recordedTime: PropTypes.string.isRequired,
  isRecording: PropTypes.bool.isRequired,
  onClickCaptureRecording: PropTypes.func.isRequired,
  onClickStopRecording: PropTypes.func.isRequired,
  onClickPlayRecording: PropTypes.func.isRequired,
  onClickClearRecording: PropTypes.func.isRequired,
  playRecordingTimeElapsed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
export default VCR;
