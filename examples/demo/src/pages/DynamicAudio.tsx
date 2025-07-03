import { AutoplayAnchor, useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import ControlPanel from '../components/ControlPanel';
import './PageStyles.css';
import AudioDisableAutoplay from '../assets/audio-disable-autoplay.svg?react';
import AudioEnableAutoplay from '../assets/audio-enable-autoplay.svg?react';

const DynamicAudio = () => {
  const { isEnabledAutoplay, isMuted, audioPath, onAudioPathChange, onToggleEnabledAutoplay } = useBrowseAutoplay();

  // Mock audio options - in a real app, these would be actual audio files
  const audioOptions = [
    {
      value: '/react-browse-autoplay/audio/ambient-forest.mp3',
      label: '🌲 Forest Ambience',
    },
    {
      value: '/react-browse-autoplay/audio/ocean-waves.mp3',
      label: '🌊 Ocean Waves',
    },
    {
      value: '/react-browse-autoplay/audio/rain-sounds.mp3',
      label: '🌧️ Rain Sounds',
    },
  ];

  const currentAudio = audioOptions.find((option) => option.value === audioPath);

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-sidebar">
          <ControlPanel />
          <div className="playlist-card">
            <h3>Audio Library</h3>
            <div className="playlist">
              {audioOptions.map((option) => (
                <button
                  key={option.value}
                  className={`playlist-item ${audioPath === option.value ? 'active' : ''}`}
                  onClick={() => onAudioPathChange(option.value)}
                  type="button"
                >
                  <span className="playlist-icon">{audioPath === option.value ? '▶️' : '⏸️'}</span>
                  <span className="playlist-label">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="page-content">
          <div className="intro-section">
            <h2>Dynamic Audio Sources</h2>
            <p>
              This showcase demonstrates how you can dynamically change audio sources while maintaining the autoplay
              functionality. Perfect for creating rich, interactive audio experiences.
            </p>

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

          <div className="current-track-display">
            <div className="track-info">
              <h3>Currently Selected</h3>
              <div className="track-card">
                <div className="track-details">
                  <h4>{currentAudio?.label || 'No audio selected'}</h4>
                  <p>{audioPath || 'Select an audio file from the sidebar'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="spacer large">
            <div className="scroll-indicator">
              <p>⬇️ Scroll down to start playing selected audio ⬇️</p>
            </div>
          </div>

          <AutoplayAnchor type="top" />

          <div className="dynamic-zone">
            <div className="zone-header">
              <h2>🎵 Dynamic Playback Zone</h2>
              <p>Audio changes based on your selection!</p>

              <div className="audio-visualizer">
                <div className={`wave ${isEnabledAutoplay && !isMuted ? 'active' : ''}`}></div>
                <div className={`wave ${isEnabledAutoplay && !isMuted ? 'active' : ''}`}></div>
                <div className={`wave ${isEnabledAutoplay && !isMuted ? 'active' : ''}`}></div>
                <div className={`wave ${isEnabledAutoplay && !isMuted ? 'active' : ''}`}></div>
              </div>
            </div>

            <div className="zone-content">
              <div className="code-example">
                <h3>Implementation Example</h3>
                <pre>
                  <code>{`const { audioPath, onAudioPathChange } = useBrowseAutoplay();

// Change audio dynamically
const switchToForestAmbience = () => {
  onAudioPathChange('/audio/forest-ambience.mp3');
};

// React to audio changes
useEffect(() => {
  console.log('Now playing:', audioPath);
}, [audioPath]);`}</code>
                </pre>
              </div>
            </div>
          </div>

          <AutoplayAnchor type="bottom" />

          <div className="spacer large">
            <div className="scroll-indicator">
              <p>⬆️ Scroll back up to replay ⬆️</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicAudio;
