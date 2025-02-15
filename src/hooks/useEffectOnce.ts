'use client';
import { useEffect, useRef } from 'react';

export function useEffectOnce(effect: () => void) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      effect();
      hasRun.current = true;
    }
  }, [effect]);
}
