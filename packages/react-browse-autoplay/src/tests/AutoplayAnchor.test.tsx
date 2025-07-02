import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import AutoplayAnchor from '../components/AutoplayAnchor';
import { useBrowseAutoplay } from '../components/BrowseAutoplayContext';

// Mock the context hook
vi.mock('../src/components/BrowseAutoplayContext', () => ({
  useBrowseAutoplay: vi.fn(),
}));

const mockUseBrowseAutoplay = vi.mocked(useBrowseAutoplay);

describe('AutoplayAnchor', () => {
  const mockRegisterAnchorRef = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseBrowseAutoplay.mockReturnValue({
      registerAnchorRef: mockRegisterAnchorRef,
      isMuted: false,
      onToggleMuted: vi.fn(),
      isEnabledAutoplay: false,
      onToggleEnabledAutoplay: vi.fn(),
      audioPath: '',
      onAudioPathChange: vi.fn(),
    });
  });

  it('should render a div element', () => {
    const { container } = render(<AutoplayAnchor type="top" />);
    const divElement = container.querySelector('div');

    expect(divElement).toBeInTheDocument();
  });

  it('should register anchor ref with top type', () => {
    render(<AutoplayAnchor type="top" />);

    expect(mockRegisterAnchorRef).toHaveBeenCalledWith('top', expect.any(Object));
  });

  it('should register anchor ref with bottom type', () => {
    render(<AutoplayAnchor type="bottom" />);

    expect(mockRegisterAnchorRef).toHaveBeenCalledWith('bottom', expect.any(Object));
  });

  it('should call registerAnchorRef when component mounts', () => {
    render(<AutoplayAnchor type="top" />);

    expect(mockRegisterAnchorRef).toHaveBeenCalledTimes(1);
  });

  it('should use the useBrowseAutoplay hook', () => {
    render(<AutoplayAnchor type="top" />);

    expect(mockUseBrowseAutoplay).toHaveBeenCalled();
  });
});
