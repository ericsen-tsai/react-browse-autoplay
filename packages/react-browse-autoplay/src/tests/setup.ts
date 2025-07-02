import { vi } from 'vitest';

// Create spy functions for HTMLAudioElement methods
const mockPlay = vi.fn().mockResolvedValue(undefined);
const mockPause = vi.fn();

// Mock HTMLAudioElement.prototype methods globally
Object.defineProperty(HTMLAudioElement.prototype, 'play', {
  writable: true,
  value: mockPlay,
});

Object.defineProperty(HTMLAudioElement.prototype, 'pause', {
  writable: true,
  value: mockPause,
});

// Mock getBoundingClientRect for testing scroll behavior
const mockGetBoundingClientRect = vi.fn();
Object.defineProperty(Element.prototype, 'getBoundingClientRect', {
  writable: true,
  value: mockGetBoundingClientRect,
});

// Export mock functions for use in tests
export { mockPlay, mockPause, mockGetBoundingClientRect };
