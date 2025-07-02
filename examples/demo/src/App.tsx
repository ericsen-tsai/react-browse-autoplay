import './App.css';
import { AutoplayAnchor, useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import AudioDisableAutoplay from './assets/audio-disable-autoplay.svg?react';
import AudioEnableAutoplay from './assets/audio-enable-autoplay.svg?react';
import AudioMuted from './assets/audio-muted.svg?react';
import AudioUnmuted from './assets/audio-unmuted.svg?react';

function App() {
  const { isMuted, onToggleMuted, isEnabledAutoplay, onToggleEnabledAutoplay } = useBrowseAutoplay();

  return (
    <>
      <h1>React Browse Autoplay</h1>
      <button
        onClick={() => onToggleMuted()}
        type="button"
        style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}
      >
        {isMuted ? <AudioMuted /> : <AudioUnmuted />}
      </button>
      <button
        onClick={() => onToggleEnabledAutoplay()}
        type="button"
        style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto', marginRight: 'auto' }}
      >
        {isEnabledAutoplay ? <AudioDisableAutoplay /> : <AudioEnableAutoplay />}
        {isEnabledAutoplay ? 'Disable' : 'Enable'} Autoplay
      </button>
      <div style={{ height: '100vh' }}></div>
      <AutoplayAnchor type="top" />
      <h2>Autoplay starts/ends here</h2>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isEnabledAutoplay && !isMuted ? 'Music on' : 'Music off'}
      </div>
      <AutoplayAnchor type="bottom" />
      <h2>Autoplay starts/ends here</h2>
      <div style={{ height: '100vh' }}></div>
    </>
  );
}

export default App;
