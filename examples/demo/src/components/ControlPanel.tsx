import { useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import AudioMuted from '../assets/audio-muted.svg?react';
import AudioUnmuted from '../assets/audio-unmuted.svg?react';

function ControlPanel() {
  const { isMuted, onToggleMuted, isEnabledAutoplay, isPlaying } = useBrowseAutoplay();

  return (
    <div className="top-8 z-50 mb-8 rounded-xl border border-border bg-bg-surface px-6 py-6 shadow-md md:sticky">
      <div className="mb-6 last:mb-0">
        <h3 className="m-0 mb-4 font-semibold text-lg text-typography-primary">Playback Controls</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => onToggleMuted()}
            type="button"
            className="flex min-w-30 cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-bg-secondary px-6 py-3 font-medium text-base text-typography-inverse transition-all hover:border-primary focus:outline-2 focus:outline-primary focus:outline-offset-2"
            style={{
              borderColor: isMuted ? 'var(--color-danger)' : 'var(--color-secondary)',
              color: isMuted ? 'var(--color-danger)' : 'var(--color-secondary)',
            }}
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            <div className="h-5 w-5">{isMuted ? <AudioMuted /> : <AudioUnmuted />}</div>
            <span>{isMuted ? 'Unmuted' : 'Muted'}</span>
          </button>
        </div>
      </div>
      <div className="border-border border-t pt-4">
        <div className="mb-2 flex items-center gap-2 text-typography-primary">
          <div
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${isPlaying ? 'animate-pulse' : ''}`}
            style={{
              backgroundColor: isPlaying ? 'var(--color-secondary)' : 'var(--color-typography-muted)',
            }}
          ></div>
          <span>Status: {isPlaying ? 'Playing' : 'Paused'}</span>
        </div>
        <div className="flex flex-col items-start gap-1 text-sm text-typography-muted md:flex-col">
          <span>Autoplay: {isEnabledAutoplay ? 'Enabled' : 'Disabled'}</span>
          <span>Audio: {isMuted ? 'Muted' : 'Unmuted'}</span>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
