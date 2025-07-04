import { AutoplayAnchor, useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import AudioDisableAutoplay from '../assets/audio-disable-autoplay.svg?react';
import AudioEnableAutoplay from '../assets/audio-enable-autoplay.svg?react';
import ControlPanel from '../components/ControlPanel';

function DynamicAudio() {
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
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 pt-8 lg:grid-cols-[320px_minmax(500px,1fr)]">
        <div className="md:sticky md:top-8 md:h-fit">
          <ControlPanel />
          <div className="mb-6 rounded-xl border border-border bg-bg-surface px-6 py-6 shadow-md">
            <h3 className="m-0 mb-4 font-semibold text-lg text-typography-primary">Audio Library</h3>
            <div className="flex flex-col gap-2">
              {audioOptions.map((option) => (
                <button
                  key={option.value}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-lg border border-transparent bg-bg-secondary px-6 py-3 text-left font-medium text-base transition-all hover:border-primary focus:outline-2 focus:outline-primary focus:outline-offset-2 ${
                    audioPath === option.value ? 'text-typography-primary' : 'text-typography-inverse'
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
          <div className="mb-12 flex flex-col items-center gap-4">
            <h2 className="m-0 mb-4 font-bold text-2xl text-typography-inverse">Dynamic Audio Sources</h2>
            <p className="m-0 text-lg text-typography-inverse-muted leading-relaxed">
              This showcase demonstrates how you can dynamically change audio sources while maintaining the autoplay
              functionality. Perfect for creating rich, interactive audio experiences.
            </p>

            <button
              onClick={() => onToggleEnabledAutoplay()}
              type="button"
              className="flex min-w-30 cursor-pointer items-center justify-center gap-2 rounded-lg border border-transparent bg-bg-secondary px-6 py-3 font-medium text-base text-typography-inverse transition-all hover:border-primary focus:outline-2 focus:outline-primary focus:outline-offset-2"
              title={isEnabledAutoplay ? 'Disable autoplay' : 'Enable autoplay'}
            >
              <div className="h-5 w-5">{isEnabledAutoplay ? <AudioDisableAutoplay /> : <AudioEnableAutoplay />}</div>
              <span>{isEnabledAutoplay ? 'Disable' : 'Enable'} Autoplay</span>
            </button>
          </div>

          <div className="mb-6">
            <div className="mb-4">
              <h3 className="m-0 mb-4 font-semibold text-lg text-typography-inverse">Currently Selected</h3>
              <div className="rounded-xl border border-border bg-bg-surface px-6 py-6 shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <h4 className="m-0 mb-2 font-medium text-base text-typography-primary">
                      {currentAudio?.label || 'No audio selected'}
                    </h4>
                    <p className="m-0 text-sm text-typography-muted">
                      {audioPath || 'Select an audio file from the sidebar'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-16 flex h-[30vh] items-center justify-center">
            <div className="whitespace-nowrap rounded-xl border-2 border-primary border-dashed bg-bg-overlay px-8 py-8 text-center">
              <p className="m-0 animate-bounce font-medium text-lg text-primary">
                ⬇️ Scroll down to start playing selected audio ⬇️
              </p>
            </div>
          </div>

          <AutoplayAnchor type="top" />

          <div
            className="mb-8 rounded-xl border border-border px-8 py-12 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
            }}
          >
            <div className="mb-8 text-center">
              <h2 className="m-0 mb-4 font-bold text-2xl text-typography-inverse">🎵 Dynamic Playback Zone</h2>
              <p className="m-0 mb-6 text-lg text-typography-inverse-muted leading-relaxed">
                Audio changes based on your selection!
              </p>

              <div className="mb-6 flex h-5 items-center justify-center gap-1">
                <div
                  className={`w-1 rounded-full transition-all ${
                    isEnabledAutoplay && !isMuted ? 'h-7 animate-[wave_1s_infinite_ease-in-out]' : 'h-2.5'
                  }`}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                  }}
                ></div>
                <div
                  className={`w-1 rounded-full transition-all ${
                    isEnabledAutoplay && !isMuted ? 'h-7 animate-[wave_1s_infinite_ease-in-out]' : 'h-2.5'
                  }`}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    animationDelay: isEnabledAutoplay && !isMuted ? '0.1s' : undefined,
                  }}
                ></div>
                <div
                  className={`w-1 rounded-full transition-all ${
                    isEnabledAutoplay && !isMuted ? 'h-7 animate-[wave_1s_infinite_ease-in-out]' : 'h-2.5'
                  }`}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    animationDelay: isEnabledAutoplay && !isMuted ? '0.2s' : undefined,
                  }}
                ></div>
                <div
                  className={`w-1 rounded-full transition-all ${
                    isEnabledAutoplay && !isMuted ? 'h-7 animate-[wave_1s_infinite_ease-in-out]' : 'h-2.5'
                  }`}
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    animationDelay: isEnabledAutoplay && !isMuted ? '0.3s' : undefined,
                  }}
                ></div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-xl border border-border bg-bg-surface px-6 py-6 shadow-md">
                <h3 className="m-0 mb-4 font-semibold text-lg text-typography-primary">Implementation Example</h3>
                <pre className="overflow-x-auto rounded-lg bg-bg-surface-alt px-4 py-4 text-left text-sm">
                  <code className="block text-sm text-typography-primary">{`const { audioPath, onAudioPathChange } = useBrowseAutoplay();

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

          <div className="my-16 flex h-[50vh] items-center justify-center">
            <div className="whitespace-nowrap rounded-xl border-2 border-primary border-dashed bg-bg-overlay px-8 py-8 text-center">
              <p className="m-0 animate-bounce font-medium text-lg text-primary">⬆️ Scroll back up to replay ⬆️</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicAudio;
