import { useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import AudioMuted from '../assets/audio-muted.svg?react';
import AudioUnmuted from '../assets/audio-unmuted.svg?react';

const ControlPanel = () => {
  const { isMuted, onToggleMuted, isEnabledAutoplay, isPlaying } = useBrowseAutoplay();

  return (
    <div className="bg-custom-surface rounded-xl px-6 py-6 shadow-custom-md border border-custom mb-8 sticky top-8 z-50">
      <div className="mb-6 last:mb-0">
        <h3 className="m-0 mb-4 text-lg font-semibold text-custom-primary">Playback Controls</h3>
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => onToggleMuted()}
            type="button"
            className={`flex items-center gap-2 px-4 py-3 border-2 rounded-lg bg-custom-surface cursor-pointer transition-all duration-200 text-sm font-medium min-w-30 justify-center hover:-translate-y-px hover:shadow-custom-sm ${
              isMuted ? 'border-danger color-danger' : 'border-secondary color-secondary'
            } hover:border-primary`}
            title={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            <div className="w-5 h-5">{isMuted ? <AudioMuted /> : <AudioUnmuted />}</div>
            <span>{isMuted ? 'Unmuted' : 'Muted'}</span>
          </button>
        </div>
      </div>
      <div className="pt-4 border-t border-custom">
        <div className="flex items-center gap-2 mb-2 text-custom-primary">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              isPlaying ? 'color-secondary animate-pulse-custom' : 'bg-custom-muted'
            }`}
            style={{
              backgroundColor: isPlaying ? 'var(--color-secondary)' : 'var(--text-muted)',
            }}
          ></div>
          <span>Status: {isPlaying ? 'Playing' : 'Paused'}</span>
        </div>
        <div className="flex gap-1 text-sm text-custom-muted flex-col items-start md:flex-responsive">
          <span>Autoplay: {isEnabledAutoplay ? 'Enabled' : 'Disabled'}</span>
          <span>Audio: {isMuted ? 'Muted' : 'Unmuted'}</span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
