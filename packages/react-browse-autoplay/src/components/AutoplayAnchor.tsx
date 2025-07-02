import { useEffect, useRef } from 'react';
import type { AnchorType } from '../types';
import { useBrowseAutoplay } from './BrowseAutoplayContext';

type AutoplayAnchorProps = {
  type: AnchorType;
};

function AutoplayAnchor({ type }: AutoplayAnchorProps) {
  const { registerAnchorRef } = useBrowseAutoplay();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      registerAnchorRef(type, ref);
    }
  }, [registerAnchorRef, type]);

  return <div ref={ref}></div>;
}

export default AutoplayAnchor;
