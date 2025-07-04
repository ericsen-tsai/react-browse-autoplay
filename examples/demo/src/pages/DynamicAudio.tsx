import { AutoplayAnchor, useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import AudioDisableAutoplay from '../assets/audio-disable-autoplay.svg?react';
import AudioEnableAutoplay from '../assets/audio-enable-autoplay.svg?react';
import ControlPanel from '../components/ControlPanel';

const DynamicAudio = () => {
  const { isEnabledAutoplay, isMuted, audioPath, onAudioPathChange, onToggleEnabledAutoplay } = useBrowseAutoplay();

  // Mock audio options - in a real app, these would be actual audio files
  const audioOptions = [
    {
      value: `${import.meta.env.VITE_DEMO_PAGE_BASE_URL}/audio/ambient-forest.mp3`,
      label: '🌲 Forest Ambience',
    },
    {
      value: `${import.meta.env.VITE_DEMO_PAGE_BASE_URL}/audio/ocean-waves.mp3`,
      label: '🌊 Ocean Waves',
    },
    {
      value: `${import.meta.env.VITE_DEMO_PAGE_BASE_URL}/audio/rain-sounds.mp3`,
      label: '🌧️ Rain Sounds',
    },
  ];

  const currentAudio = audioOptions.find((option) => option.value === audioPath);

  return (
    <div className="min-h-screen bg-custom-primary">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(500px,1fr)] gap-8 max-w-7xl mx-auto pt-8 grid-responsive">
        <div className="sticky top-8 h-fit">
          <ControlPanel />
          <div className="bg-custom-surface rounded-xl px-6 py-6 shadow-custom-md border border-custom mb-6">
            <h3 className="m-0 mb-4 text-lg font-semibold text-custom-primary">Audio Library</h3>
            <div className="flex flex-col gap-2">
              {audioOptions.map((option) => (
                <button
                  key={option.value}
                  className={`flex items-center gap-3 px-3 py-3 border border-custom rounded-lg bg-custom-surface cursor-pointer transition-all duration-200 w-full text-left text-sm text-custom-primary hover:border-primary hover:bg-custom-surface-alt hover:-translate-y-px ${
                    audioPath === option.value ? 'border-primary text-custom-inverse' : ''
                  }`}
                  style={{
                    background:
                      audioPath === option.value
                        ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)'
                        : undefined,
                  }}
                  onClick={() => onAudioPathChange(option.value)}
                  type="button"
                >
                  <span className="text-base">{audioPath === option.value ? '▶️' : '⏸️'}</span>
                  <span className="flex-1">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-screen">
          <div className="mb-12 flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-bold text-custom-inverse m-0 mb-4">Dynamic Audio Sources</h2>
            <p className="text-lg text-custom-inverse-muted leading-relaxed m-0">
              This showcase demonstrates how you can dynamically change audio sources while maintaining the autoplay
              functionality. Perfect for creating rich, interactive audio experiences.
            </p>

            <button
              onClick={() => onToggleEnabledAutoplay()}
              type="button"
              className={`flex items-center gap-2 px-4 py-3 border-2 rounded-lg bg-custom-surface cursor-pointer transition-all duration-200 text-sm font-medium min-w-30 justify-center hover:-translate-y-px hover:shadow-custom-sm ${
                isEnabledAutoplay
                  ? 'border-primary color-primary bg-custom-overlay'
                  : 'border-custom-muted text-custom-muted'
              } hover:border-primary`}
              title={isEnabledAutoplay ? 'Disable autoplay' : 'Enable autoplay'}
            >
              <div className="w-5 h-5">{isEnabledAutoplay ? <AudioDisableAutoplay /> : <AudioEnableAutoplay />}</div>
              <span>{isEnabledAutoplay ? 'Disable' : 'Enable'} Autoplay</span>
            </button>
          </div>

          <div className="mb-6">
            <div className="mb-4">
              <h3 className="m-0 mb-4 text-lg font-semibold text-custom-inverse">Currently Selected</h3>
              <div className="bg-custom-surface rounded-xl px-6 py-6 shadow-custom-md border border-custom transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h4 className="m-0 mb-2 text-base font-medium text-custom-primary">
                      {currentAudio?.label || 'No audio selected'}
                    </h4>
                    <p className="m-0 text-sm text-custom-muted">
                      {audioPath || 'Select an audio file from the sidebar'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center my-16 h-[30vh]">
            <div className="text-center px-8 py-8 bg-custom-overlay rounded-xl border-2 border-dashed border-primary whitespace-nowrap">
              <p className="m-0 text-lg font-medium color-primary animate-bounce-custom">
                ⬇️ Scroll down to start playing selected audio ⬇️
              </p>
            </div>
          </div>

          <AutoplayAnchor type="top" />

          <div className="bg-linear-to-br from-(--color-primary) to-(--color-primary-dark) rounded-xl px-8 py-12 shadow-custom-lg border border-custom mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-custom-inverse m-0 mb-4">🎵 Dynamic Playback Zone</h2>
              <p className="m-0 text-lg text-custom-inverse-muted leading-relaxed mb-6">
                Audio changes based on your selection!
              </p>

              <div className="flex items-center justify-center gap-1 mb-6">
                <div
                  className={`w-1 bg-custom-primary rounded-full transition-all duration-100 ${
                    isEnabledAutoplay && !isMuted ? 'animate-wave' : 'h-2.5'
                  }`}
                  style={{
                    height: isEnabledAutoplay && !isMuted ? '30px' : '10px',
                  }}
                ></div>
                <div
                  className={`w-1 bg-custom-primary rounded-full transition-all duration-100 ${
                    isEnabledAutoplay && !isMuted ? 'animate-wave' : 'h-2.5'
                  }`}
                  style={{
                    height: isEnabledAutoplay && !isMuted ? '30px' : '10px',
                    animationDelay: '0.1s',
                  }}
                ></div>
                <div
                  className={`w-1 bg-custom-primary rounded-full transition-all duration-100 ${
                    isEnabledAutoplay && !isMuted ? 'animate-wave' : 'h-2.5'
                  }`}
                  style={{
                    height: isEnabledAutoplay && !isMuted ? '30px' : '10px',
                    animationDelay: '0.2s',
                  }}
                ></div>
                <div
                  className={`w-1 bg-custom-primary rounded-full transition-all duration-100 ${
                    isEnabledAutoplay && !isMuted ? 'animate-wave' : 'h-2.5'
                  }`}
                  style={{
                    height: isEnabledAutoplay && !isMuted ? '30px' : '10px',
                    animationDelay: '0.3s',
                  }}
                ></div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-custom-surface rounded-xl px-6 py-6 shadow-custom-md border border-custom">
                <h3 className="m-0 mb-4 text-lg font-semibold text-custom-primary">Implementation Example</h3>
                <pre className="bg-custom-surface-alt px-4 py-4 rounded-lg text-sm overflow-x-auto">
                  <code className="block text-custom-primary">{`const { audioPath, onAudioPathChange } = useBrowseAutoplay();

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

          <div className="flex items-center justify-center my-16 h-[50vh]">
            <div className="text-center px-8 py-8 bg-custom-overlay rounded-xl border-2 border-dashed border-primary whitespace-nowrap">
              <p className="m-0 text-lg font-medium color-primary animate-bounce-custom">
                ⬆️ Scroll back up to replay ⬆️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicAudio;
