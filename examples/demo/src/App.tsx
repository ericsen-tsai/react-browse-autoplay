import './App.css';
import { AutoplayAnchor, useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';

function App() {
  const { isMuted, onToggleMuted, isEnabledAutoplay, onToggleEnabledAutoplay } = useBrowseAutoplay();

  return (
    <>
      <button
        onClick={() => onToggleMuted()}
        type="button"
        style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
      <button onClick={() => onToggleEnabledAutoplay()} type="button">
        {isEnabledAutoplay ? 'Disable' : 'Enable'}
      </button>
      <h1>React Browse Autoplay</h1>
      <div style={{ height: '100vh' }}></div>
      <AutoplayAnchor type="top" />
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isEnabledAutoplay ? 'Autoplay Enabled' : 'Autoplay Disabled'}
      </div>
      <AutoplayAnchor type="bottom" />
      <div style={{ height: '100vh' }}></div>
    </>
  );
}

export default App;
