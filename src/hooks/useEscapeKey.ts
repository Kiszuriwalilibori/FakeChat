import { useCallback, useEffect } from 'react';

export const useEscapeKey = (isActive: boolean, onEscape: () => void) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onEscape();
    }
  }, [onEscape]);

  useEffect(() => {
    if (!isActive) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, handleKeyDown]);
};
