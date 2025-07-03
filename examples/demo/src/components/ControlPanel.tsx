import { useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import AudioMuted from '../assets/audio-muted.svg?react';
import AudioUnmuted from '../assets/audio-unmuted.svg?react';
import './ControlPanel.css';

const ControlPanel = () => {
  const { isMuted, onToggleMuted, isEnabledAutoplay, isPlaying } = useBrowseAutoplay();

  return (
    <div className="control-panel">
      <div className="control-section">
        <h3>Playback Controls</h3>
        <div className="control-buttons">
          <button
            onClick={() => onToggleMuted()}
            type="button"
            className={`control-button ${isMuted ? 'muted' : 'unmuted'}`}
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <AudioMuted /> : <AudioUnmuted />}
            <span>{isMuted ? 'Unmuted' : 'Muted'}</span>
          </button>
        </div>
      </div>
      <div className="status-section">
        <div className="status-indicator">
          <div className={`status-dot ${isPlaying ? 'playing' : 'paused'}`}></div>
          <span>Status: {isPlaying ? 'Playing' : 'Paused'}</span>
        </div>
        <div className="status-info">
          <span>Autoplay: {isEnabledAutoplay ? 'Enabled' : 'Disabled'}</span>
          <span>Audio: {isMuted ? 'Muted' : 'Unmuted'}</span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
