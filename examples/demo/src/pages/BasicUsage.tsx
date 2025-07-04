import { AutoplayAnchor, useBrowseAutoplay } from '@erichandsen/react-browse-autoplay';
import AudioDisableAutoplay from '../assets/audio-disable-autoplay.svg?react';
import AudioEnableAutoplay from '../assets/audio-enable-autoplay.svg?react';
import ControlPanel from '../components/ControlPanel';

const BasicUsage = () => {
  const { isEnabledAutoplay, isMuted, onToggleEnabledAutoplay } = useBrowseAutoplay();

  return (
    <div className="min-h-screen bg-custom-primary">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(500px,1fr)] gap-8 max-w-7xl mx-auto pt-8 grid-responsive">
        <div className="sticky top-8 h-fit">
          <ControlPanel />

          <div className="bg-custom-surface rounded-xl px-6 py-6 shadow-custom-md border border-custom mb-6">
            <h3 className="m-0 mb-4 text-lg font-semibold text-custom-primary">How it works</h3>
            <ul className="m-0 pl-4 text-left">
              <li className="mb-2 text-custom-secondary">Enable autoplay using the button above</li>
              <li className="mb-2 text-custom-secondary">Scroll down to the autoplay zone</li>
              <li className="mb-2 text-custom-secondary">Audio will start playing when you reach the zone</li>
              <li className="mb-2 text-custom-secondary">Audio stops when you scroll out of the zone</li>
            </ul>
          </div>
        </div>

        <div className="min-h-screen">
          <div className="mb-12 flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-bold text-custom-inverse m-0 mb-4">Basic Autoplay Example</h2>
            <p className="text-lg text-custom-inverse-muted leading-relaxed m-0">
              This demonstrates the core functionality of React Browse Autoplay. Scroll down to see the autoplay zone in
              action!
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

          <div className="flex items-center justify-center my-16 h-[30vh]">
            <div className="text-center px-8 py-8 bg-custom-overlay rounded-xl border-2 border-dashed border-primary whitespace-nowrap">
              <p className="m-0 text-lg font-medium color-primary animate-bounce-custom">
                ⬇️ Scroll down to experience autoplay ⬇️
              </p>
            </div>
          </div>

          <AutoplayAnchor type="top" />

          <div className="bg-linear-to-br from-(--color-primary) to-(--color-primary-dark) rounded-xl px-8 py-12 shadow-custom-lg border border-custom mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-custom-inverse m-0 mb-2">🎵 Autoplay Zone</h2>
              <p className="m-0 text-lg text-custom-inverse-muted leading-relaxed">You've entered the autoplay zone!</p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center">
                <div
                  className={`bg-custom-surface rounded-xl px-6 py-6 shadow-custom-md border border-custom transition-all duration-200 ${
                    isEnabledAutoplay && !isMuted ? 'border-primary bg-custom-overlay' : ''
                  }`}
                >
                  <h3 className="m-0 mb-2 text-lg font-semibold text-custom-primary">
                    {isEnabledAutoplay && !isMuted ? '🎵 Music Playing' : '🔇 Music Stopped'}
                  </h3>
                  <p className="m-0 text-custom-secondary leading-relaxed">
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

export default BasicUsage;
