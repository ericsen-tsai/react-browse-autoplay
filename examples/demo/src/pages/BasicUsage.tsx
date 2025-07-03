import { AutoplayAnchor, useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import ControlPanel from '../components/ControlPanel';
import './PageStyles.css';
import AudioDisableAutoplay from '../assets/audio-disable-autoplay.svg?react';
import AudioEnableAutoplay from '../assets/audio-enable-autoplay.svg?react';

const BasicUsage = () => {
  const { isEnabledAutoplay, isMuted, onToggleEnabledAutoplay } = useBrowseAutoplay();

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-sidebar">
          <ControlPanel />

          <div className="info-card">
            <h3>How it works</h3>
            <ul>
              <li>Enable autoplay using the button above</li>
              <li>Scroll down to the autoplay zone</li>
              <li>Audio will start playing when you reach the zone</li>
              <li>Audio stops when you scroll out of the zone</li>
            </ul>
          </div>
        </div>

        <div className="page-content">
          <div className="intro-section">
            <h2>Basic Autoplay Example</h2>
            <p>
              This demonstrates the core functionality of React Browse Autoplay. Scroll down to see the autoplay zone in
              action!
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

          <div className="spacer large">
            <div className="scroll-indicator">
              <p>⬇️ Scroll down to experience autoplay ⬇️</p>
            </div>
          </div>

          <AutoplayAnchor type="top" />

          <div className="autoplay-zone">
            <div className="zone-header">
              <h2>🎵 Autoplay Zone</h2>
              <p>You've entered the autoplay zone!</p>
            </div>

            <div className="zone-content">
              <div className="status-display">
                <div className={`status-card ${isEnabledAutoplay && !isMuted ? 'active' : 'inactive'}`}>
                  <h3>{isEnabledAutoplay && !isMuted ? '🎵 Music Playing' : '🔇 Music Stopped'}</h3>
                  <p>
                    {!isEnabledAutoplay
                      ? 'Enable autoplay to hear music in this zone'
                      : isMuted
                        ? 'Unmute to hear the music'
                        : 'Enjoy the ambient music!'}
                  </p>
                </div>
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

export default BasicUsage;
