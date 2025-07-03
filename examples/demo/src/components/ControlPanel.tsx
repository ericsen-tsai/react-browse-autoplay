import { useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import AudioDisableAutoplay from '../assets/audio-disable-autoplay.svg?react';
import AudioEnableAutoplay from '../assets/audio-enable-autoplay.svg?react';
import AudioMuted from '../assets/audio-muted.svg?react';
import AudioUnmuted from '../assets/audio-unmuted.svg?react';
import './ControlPanel.css';

interface ControlPanelProps {
  showAudioPath?: boolean;
  audioOptions?: { value: string; label: string }[];
}

const ControlPanel = ({ showAudioPath = false, audioOptions = [] }: ControlPanelProps) => {
  const {
    isMuted,
    onToggleMuted,
    isEnabledAutoplay,
    onToggleEnabledAutoplay,
    audioPath,
    onAudioPathChange,
    isPlaying,
  } = useBrowseAutoplay();

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

          <button
            onClick={() => onToggleEnabledAutoplay()}
            type="button"
            className={`control-button autoplay-button ${isEnabledAutoplay ? 'enabled' : 'disabled'}`}
            title={isEnabledAutoplay ? 'Disable autoplay' : 'Enable autoplay'}
          >
            {isEnabledAutoplay ? <AudioDisableAutoplay /> : <AudioEnableAutoplay />}
            <span>{isEnabledAutoplay ? 'Disable' : 'Enable'} Autoplay</span>
          </button>
        </div>
      </div>

      {showAudioPath && audioOptions.length > 0 && (
        <div className="control-section">
          <h3>Audio Source</h3>
          <select value={audioPath} onChange={(e) => onAudioPathChange(e.target.value)} className="audio-select">
            <option value="">Select an audio file</option>
            {audioOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}

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
