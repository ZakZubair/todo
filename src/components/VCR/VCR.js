import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
            <button className="vcr__button--record" type="button" onClick={onClickCaptureRecording}>
              Record
            </button>
          )}
          {isRecording && (
            <button className="vcr__button--stop" type="button" onClick={onClickStopRecording}>
              Stop Recording
            </button>
          )}
          {recordingAvailable && (
            <button className={`vcr__button--play ${isPlayingRecording ? 'vcr__button--play__playing' : ''}`} type="button" onClick={onClickPlayRecording}>
              Play Recording
            </button>
          )}
          {recordingAvailable && !isPlayingRecording && (
            <button className="vcr__button--clear" type="button" onClick={onClickClearRecording}>
              <img src={DeleteIcon} alt="delete" />
            </button>
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
