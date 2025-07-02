import { act, fireEvent, render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { BrowseAutoplayProvider, useBrowseAutoplay } from '../components/BrowseAutoplayContext';
import { mockGetBoundingClientRect, mockPause, mockPlay } from './setup';

// Test component that uses the context
function TestComponent() {
  const context = useBrowseAutoplay();
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div data-testid="is-muted">{context.isMuted.toString()}</div>
      <div data-testid="is-enabled">{context.isEnabledAutoplay.toString()}</div>
      <div data-testid="audio-path">{context.audioPath}</div>
      <button type="button" onClick={context.onToggleMuted} data-testid="toggle-muted">
        Toggle Muted
      </button>
      <button type="button" onClick={context.onToggleEnabledAutoplay} data-testid="toggle-enabled">
        Toggle Enabled
      </button>
      <button type="button" onClick={() => context.onAudioPathChange('/new/path.mp3')} data-testid="change-path">
        Change Path
      </button>
      <button type="button" onClick={() => context.registerAnchorRef('top', topRef)} data-testid="register-top">
        Register Top
      </button>
      <button
        type="button"
        onClick={() => context.registerAnchorRef('bottom', bottomRef)}
        data-testid="register-bottom"
      >
        Register Bottom
      </button>
      <div ref={topRef} data-testid="top-anchor" />
      <div ref={bottomRef} data-testid="bottom-anchor" />
    </div>
  );
}

describe('BrowseAutoplayContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset window dimensions
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });
  });

  afterEach(() => {
    // Clean up event listeners
    window.removeEventListener('scroll', vi.fn());
  });

  describe('useBrowseAutoplay hook', () => {
    it('should throw error when used outside of provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useBrowseAutoplay must be used within a BrowseAutoplayProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('BrowseAutoplayProvider', () => {
    it('should provide default context values', () => {
      render(
        <BrowseAutoplayProvider>
          <TestComponent />
        </BrowseAutoplayProvider>,
      );

      expect(screen.getByTestId('is-muted')).toHaveTextContent('false');
      expect(screen.getByTestId('is-enabled')).toHaveTextContent('false');
      expect(screen.getByTestId('audio-path')).toHaveTextContent('');
    });

    it('should use initial audio path when provided', () => {
      render(
        <BrowseAutoplayProvider initialAudioPath="/test/audio.mp3">
          <TestComponent />
        </BrowseAutoplayProvider>,
      );

      expect(screen.getByTestId('audio-path')).toHaveTextContent('/test/audio.mp3');
    });

    it('should toggle muted state', () => {
      render(
        <BrowseAutoplayProvider>
          <TestComponent />
        </BrowseAutoplayProvider>,
      );

      expect(screen.getByTestId('is-muted')).toHaveTextContent('false');

      fireEvent.click(screen.getByTestId('toggle-muted'));
      expect(screen.getByTestId('is-muted')).toHaveTextContent('true');

      fireEvent.click(screen.getByTestId('toggle-muted'));
      expect(screen.getByTestId('is-muted')).toHaveTextContent('false');
    });

    it('should toggle enabled autoplay state', () => {
      render(
        <BrowseAutoplayProvider>
          <TestComponent />
        </BrowseAutoplayProvider>,
      );

      expect(screen.getByTestId('is-enabled')).toHaveTextContent('false');

      fireEvent.click(screen.getByTestId('toggle-enabled'));
      expect(screen.getByTestId('is-enabled')).toHaveTextContent('true');

      fireEvent.click(screen.getByTestId('toggle-enabled'));
      expect(screen.getByTestId('is-enabled')).toHaveTextContent('false');
    });

    it('should change audio path', () => {
      render(
        <BrowseAutoplayProvider>
          <TestComponent />
        </BrowseAutoplayProvider>,
      );

      expect(screen.getByTestId('audio-path')).toHaveTextContent('');

      fireEvent.click(screen.getByTestId('change-path'));
      expect(screen.getByTestId('audio-path')).toHaveTextContent('/new/path.mp3');
    });

    it('should render audio element with correct attributes', () => {
      const { container } = render(
        <BrowseAutoplayProvider initialAudioPath="/test.mp3">
          <TestComponent />
        </BrowseAutoplayProvider>,
      );

      const audioElement = container.querySelector('audio');
      expect(audioElement).toBeInTheDocument();
      expect(audioElement).toHaveAttribute('src', '/test.mp3');
      expect(audioElement).toHaveStyle({ display: 'none' });
    });

    it('should register anchor refs', () => {
      render(
        <BrowseAutoplayProvider>
          <TestComponent />
        </BrowseAutoplayProvider>,
      );

      // These should not throw errors
      fireEvent.click(screen.getByTestId('register-top'));
      fireEvent.click(screen.getByTestId('register-bottom'));
    });

    describe('scroll behavior', () => {
      beforeEach(() => {
        // Mock implementations for getBoundingClientRect
        mockGetBoundingClientRect.mockImplementation(function (this: HTMLElement) {
          if (this.dataset?.testid === 'top-anchor') {
            return { top: 100, bottom: 200 };
          }
          if (this.dataset?.testid === 'bottom-anchor') {
            return { top: 600, bottom: 700 };
          }
          return { top: 0, bottom: 0 };
        });
      });

      it('should play audio when scrolling into interval', async () => {
        render(
          <BrowseAutoplayProvider>
            <TestComponent />
          </BrowseAutoplayProvider>,
        );

        // Enable autoplay
        fireEvent.click(screen.getByTestId('toggle-enabled'));

        // Register anchors
        fireEvent.click(screen.getByTestId('register-top'));
        fireEvent.click(screen.getByTestId('register-bottom'));

        // Simulate scroll event where center is between anchors
        // Center Y = 400 (window.innerHeight / 2)
        // Top anchor: 100-200, Bottom anchor: 600-700
        // 400 is between 100 and 700, so should play
        await act(async () => {
          fireEvent.scroll(window);
        });

        expect(mockPlay).toHaveBeenCalled();
      });

      it('should pause audio when scrolling out of interval', async () => {
        render(
          <BrowseAutoplayProvider>
            <TestComponent />
          </BrowseAutoplayProvider>,
        );

        // Enable autoplay
        fireEvent.click(screen.getByTestId('toggle-enabled'));

        // Register anchors
        fireEvent.click(screen.getByTestId('register-top'));
        fireEvent.click(screen.getByTestId('register-bottom'));

        // First scroll into interval
        await act(async () => {
          fireEvent.scroll(window);
        });

        // Clear previous calls
        vi.clearAllMocks();

        // Mock position outside interval
        mockGetBoundingClientRect.mockImplementation(function (this: HTMLElement) {
          if (this.dataset?.testid === 'top-anchor') {
            return { top: 500, bottom: 600 }; // Now both anchors are below center
          }
          if (this.dataset?.testid === 'bottom-anchor') {
            return { top: 700, bottom: 800 };
          }
          return { top: 0, bottom: 0 };
        });

        // Scroll out of interval
        await act(async () => {
          fireEvent.scroll(window);
        });

        expect(mockPause).toHaveBeenCalled();
      });

      it('should not play audio when autoplay is disabled', async () => {
        render(
          <BrowseAutoplayProvider>
            <TestComponent />
          </BrowseAutoplayProvider>,
        );

        // Keep autoplay disabled (default state)

        // Register anchors
        fireEvent.click(screen.getByTestId('register-top'));
        fireEvent.click(screen.getByTestId('register-bottom'));

        await act(async () => {
          fireEvent.scroll(window);
        });

        expect(mockPlay).not.toHaveBeenCalled();
      });
    });
  });
});
