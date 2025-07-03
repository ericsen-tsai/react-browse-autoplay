import { AutoplayAnchor, useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import ControlPanel from '../components/ControlPanel';
import './PageStyles.css';

const DynamicAudio = () => {
  const { isEnabledAutoplay, isMuted, audioPath, onAudioPathChange } = useBrowseAutoplay();

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
          <ControlPanel showAudioPath={true} audioOptions={audioOptions} />

          <div className="info-card">
            <h3>Dynamic Audio Switching</h3>
            <p>
              Change the audio source dynamically using the dropdown above. The audio will switch immediately if
              autoplay is active.
            </p>
            <p>
              This demonstrates how to dynamically switch between different audio sources within a single autoplay zone.
            </p>
          </div>

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
          </div>

          <div className="current-track-display">
            <div className="track-info">
              <h3>Currently Selected</h3>
              <div className="track-card">
                <div className="track-icon">🎵</div>
                <div className="track-details">
                  <h4>{currentAudio?.label || 'No audio selected'}</h4>
                  <p>{audioPath || 'Select an audio file from the sidebar'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="spacer medium">
            <div className="scroll-indicator">
              <p>⬇️ Scroll down to start playing selected audio ⬇️</p>
            </div>
          </div>

          <AutoplayAnchor type="top" />

          <div className="dynamic-zone">
            <div className="zone-header">
              <h2>🎵 Dynamic Playback Zone</h2>
              <p>Audio changes based on your selection!</p>
            </div>

            <div className="zone-content">
              <div className="playback-status">
                <div className="status-display">
                  <div className="audio-visualizer">
                    <div className={`wave ${isEnabledAutoplay && !isMuted ? 'active' : ''}`}></div>
                    <div className={`wave ${isEnabledAutoplay && !isMuted ? 'active' : ''}`}></div>
                    <div className={`wave ${isEnabledAutoplay && !isMuted ? 'active' : ''}`}></div>
                    <div className={`wave ${isEnabledAutoplay && !isMuted ? 'active' : ''}`}></div>
                  </div>

                  <div className="status-text">
                    <h3>
                      {isEnabledAutoplay && !isMuted
                        ? `🎵 Playing: ${currentAudio?.label || 'Unknown Track'}`
                        : '⏸️ Playback Paused'}
                    </h3>
                    <p>
                      {!audioPath
                        ? 'Select an audio track from the sidebar to begin'
                        : !isEnabledAutoplay
                          ? 'Enable autoplay to start listening'
                          : isMuted
                            ? 'Unmute to hear the audio'
                            : 'Enjoying your selected audio!'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="feature-showcase">
                <h3>Dynamic Audio Features</h3>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🔄</div>
                    <h4>Instant Switching</h4>
                    <p>Change audio sources on the fly without interrupting the experience</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">📱</div>
                    <h4>Responsive Controls</h4>
                    <p>Interactive playlist and dropdown controls for easy navigation</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">🎯</div>
                    <h4>State Persistence</h4>
                    <p>Audio selection persists across page navigation and interactions</p>
                  </div>
                  <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h4>Performance</h4>
                    <p>Efficient audio loading and playback management</p>
                  </div>
                </div>
              </div>

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
