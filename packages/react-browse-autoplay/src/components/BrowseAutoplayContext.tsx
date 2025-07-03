import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { AnchorType } from '../types';

type BrowseAutoplayContextType = {
  isMuted: boolean;
  onToggleMuted: () => void;
  isEnabledAutoplay: boolean;
  onToggleEnabledAutoplay: () => void;
  audioPath: string;
  onAudioPathChange: (path: string) => void;
  registerAnchorRef: (anchorType: AnchorType, ref: React.RefObject<HTMLDivElement | null>) => void;
  isPlaying: boolean;
};

const BrowseAutoplayContext = createContext<BrowseAutoplayContextType | undefined>(undefined);

const useBrowseAutoplay = () => {
  const context = useContext(BrowseAutoplayContext);
  if (!context) {
    throw new Error('useBrowseAutoplay must be used within a BrowseAutoplayProvider');
  }
  return context;
};

const BrowseAutoplayProvider = ({
  children,
  initialAudioPath = '',
}: {
  children: ReactNode;
  initialAudioPath?: string;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const onToggleMuted = useCallback(() => setIsMuted((prev) => !prev), []);

  const [isEnabledAutoplay, setIsEnabledAutoplay] = useState(false);
  const onToggleEnabledAutoplay = useCallback(() => setIsEnabledAutoplay((prev) => !prev), []);

  const [audioPath, setAudioPath] = useState(initialAudioPath);
  const onAudioPathChange = useCallback((path: string) => {
    setAudioPath(path);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation> we want to play the audio when the audio path changes
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [audioPath, isPlaying]);

  const topAnchorRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);
  const [isInInterval, setIsInInterval] = useState(false);

  useEffect(() => {
    function onBrowseScroll() {
      if (!topAnchorRef.current || !bottomAnchorRef.current || !audioRef.current || !isEnabledAutoplay) return;

      const topRect = topAnchorRef.current.getBoundingClientRect();
      const bottomRect = bottomAnchorRef.current.getBoundingClientRect();
      const centerY = window.innerHeight / 2;

      const isBetween = centerY >= topRect.top && centerY <= bottomRect.bottom;

      if (!isInInterval && isBetween) {
        setIsInInterval(true);
        audioRef.current.play();
        setIsPlaying(true);
      }

      if (isInInterval && !isBetween) {
        setIsInInterval(false);
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }

    window.addEventListener('scroll', onBrowseScroll);
    return () => window.removeEventListener('scroll', onBrowseScroll);
  }, [isInInterval, isEnabledAutoplay]);

  const registerAnchorRef = useCallback((anchorType: AnchorType, ref: React.RefObject<HTMLDivElement | null>) => {
    if (anchorType === 'top') {
      topAnchorRef.current = ref.current;
    } else {
      bottomAnchorRef.current = ref.current;
    }
  }, []);

  return (
    <BrowseAutoplayContext
      value={useMemo(
        () => ({
          isMuted,
          onToggleMuted,
          isEnabledAutoplay,
          onToggleEnabledAutoplay,
          audioPath,
          onAudioPathChange,
          registerAnchorRef,
          isPlaying,
        }),
        [
          isMuted,
          isEnabledAutoplay,
          audioPath,
          onToggleMuted,
          onToggleEnabledAutoplay,
          onAudioPathChange,
          registerAnchorRef,
          isPlaying,
        ],
      )}
    >
      <audio src={audioPath} ref={audioRef} style={{ display: 'none' }} muted={isMuted}>
        <track kind="captions" />
      </audio>
      {children}
    </BrowseAutoplayContext>
  );
};

export { BrowseAutoplayProvider, useBrowseAutoplay };
