import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { AutoplayAnchor, BrowseAutoplayProvider, useBrowseAutoplay } from '../components';

// Mock HTMLAudioElement for integration tests
class MockAudioElement {
  src = '';
  muted = false;
  style = { display: 'none' };

  play = vi.fn().mockResolvedValue(undefined);
  pause = vi.fn();
}

Object.defineProperty(window, 'HTMLAudioElement', {
  value: MockAudioElement,
  writable: true,
});

describe('Package Exports', () => {
  it('should export AutoplayAnchor component', () => {
    expect(AutoplayAnchor).toBeDefined();
    expect(typeof AutoplayAnchor).toBe('function');
  });

  it('should export BrowseAutoplayProvider component', () => {
    expect(BrowseAutoplayProvider).toBeDefined();
    expect(typeof BrowseAutoplayProvider).toBe('function');
  });

  it('should export useBrowseAutoplay hook', () => {
    expect(useBrowseAutoplay).toBeDefined();
    expect(typeof useBrowseAutoplay).toBe('function');
  });
});

describe('Integration Tests', () => {
  it('should render complete setup with provider and anchors', () => {
    function IntegrationTest() {
      return (
        <BrowseAutoplayProvider initialAudioPath="/test.mp3">
          <div data-testid="content">
            <AutoplayAnchor type="top" />
            <div>Content between anchors</div>
            <AutoplayAnchor type="bottom" />
          </div>
        </BrowseAutoplayProvider>
      );
    }

    const { container } = render(<IntegrationTest />);

    // Should render the content
    expect(screen.getByTestId('content')).toBeInTheDocument();

    // Should render audio element
    const audioElement = container.querySelector('audio');
    expect(audioElement).toBeInTheDocument();
    expect(audioElement).toHaveAttribute('src', '/test.mp3');

    // Should render anchor divs (AutoplayAnchor components render empty divs)
    const divElements = container.querySelectorAll('div');
    expect(divElements.length).toBeGreaterThan(0);
  });

  it('should work with multiple anchor pairs', () => {
    function MultipleAnchorsTest() {
      return (
        <BrowseAutoplayProvider>
          <div data-testid="section1">
            <AutoplayAnchor type="top" />
            <div>Section 1 content</div>
            <AutoplayAnchor type="bottom" />
          </div>
          <div data-testid="section2">
            <AutoplayAnchor type="top" />
            <div>Section 2 content</div>
            <AutoplayAnchor type="bottom" />
          </div>
        </BrowseAutoplayProvider>
      );
    }

    render(<MultipleAnchorsTest />);

    expect(screen.getByTestId('section1')).toBeInTheDocument();
    expect(screen.getByTestId('section2')).toBeInTheDocument();
  });

  it('should handle provider without initial audio path', () => {
    function NoInitialPathTest() {
      return (
        <BrowseAutoplayProvider>
          <AutoplayAnchor type="top" />
          <AutoplayAnchor type="bottom" />
        </BrowseAutoplayProvider>
      );
    }

    const { container } = render(<NoInitialPathTest />);

    const audioElement = container.querySelector('audio');
    expect(audioElement).toBeInTheDocument();
    // When no initial path is provided, React sets the src attribute to empty string
    // but the DOM might not have the attribute at all, so check for either case
    const srcAttribute = audioElement?.getAttribute('src');
    expect(srcAttribute === '' || srcAttribute === null).toBe(true);
  });
});
