import { AutoplayAnchor, useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import AudioDisableAutoplay from '../assets/audio-disable-autoplay.svg?react';
import AudioEnableAutoplay from '../assets/audio-enable-autoplay.svg?react';
import ControlPanel from '../components/ControlPanel';

function BasicUsage() {
  const { isEnabledAutoplay, isMuted, onToggleEnabledAutoplay } = useBrowseAutoplay();

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 pt-8 lg:grid-cols-[320px_minmax(500px,1fr)]">
        <div className="md:sticky md:top-8 md:h-fit">
          <ControlPanel />

          <div className="mb-6 rounded-xl border border-border bg-bg-surface px-6 py-6 shadow-md">
            <h3 className="m-0 mb-4 font-semibold text-lg text-typography-primary">How it works</h3>
            <ul className="m-0 pl-4 text-left">
              <li className="mb-2 text-typography-secondary">Enable autoplay using the button above</li>
              <li className="mb-2 text-typography-secondary">Scroll down to the autoplay zone</li>
              <li className="mb-2 text-typography-secondary">Audio will start playing when you reach the zone</li>
              <li className="mb-2 text-typography-secondary">Audio stops when you scroll out of the zone</li>
            </ul>
          </div>
        </div>

        <div className="min-h-screen">
          <div className="mb-12 flex flex-col items-center gap-4">
            <h2 className="m-0 mb-4 font-bold text-2xl text-typography-inverse">Basic Autoplay Example</h2>
            <p className="m-0 text-lg text-typography-inverse-muted leading-relaxed">
              This demonstrates the core functionality of React Browse Autoplay. Scroll down to see the autoplay zone in
              action!
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

          <div className="my-16 flex h-[30vh] items-center justify-center">
            <div className="whitespace-nowrap rounded-xl border-2 border-primary border-dashed bg-bg-overlay px-8 py-8 text-center">
              <p className="m-0 animate-bounce font-medium text-lg text-primary">
                ⬇️ Scroll down to experience autoplay ⬇️
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
              <h2 className="m-0 mb-2 font-bold text-2xl text-typography-inverse">🎵 Autoplay Zone</h2>
              <p className="m-0 text-lg text-typography-inverse-muted leading-relaxed">
                You've entered the autoplay zone!
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center">
                <div
                  className={`rounded-xl border border-border bg-bg-surface px-6 py-6 shadow-md transition-all ${
                    isEnabledAutoplay && !isMuted ? 'border-primary bg-bg-overlay' : ''
                  }`}
                >
                  <h3 className="m-0 mb-2 font-semibold text-lg text-typography-primary">
                    {isEnabledAutoplay && !isMuted ? '🎵 Music Playing' : '🔇 Music Stopped'}
                  </h3>
                  <p className="m-0 text-typography-secondary leading-relaxed">
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

export default BasicUsage;
