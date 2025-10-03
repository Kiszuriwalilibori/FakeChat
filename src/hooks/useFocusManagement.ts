import { useEffect, useRef } from 'react';

// Utility function to get focusable elements
const getFocusableElements = (container: HTMLElement | null) => {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ));
};

export const useFocusManagement = (
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement>,
  triggerElement?: HTMLElement | null
) => {
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Store the element that had focus before opening the picker
    previouslyFocusedElement.current = document.activeElement as HTMLElement;

    // Focus the first focusable element in the picker after a small delay
    const focusTimer = setTimeout(() => {
      const focusableElements = getFocusableElements(containerRef.current);
      
      if (focusableElements.length > 0) {
        focusableElements[0]?.focus();
      } else {
        // Fallback: focus the picker container if no focusable elements found
        containerRef.current?.setAttribute('tabindex', '-1');
        containerRef.current?.focus();
      }
    }, 50);

    // Cleanup function
    return () => {
      clearTimeout(focusTimer);
      
      // Return focus to the previously focused element or the trigger element
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      } else if (triggerElement) {
        triggerElement.focus();
      }
    };
  }, [isActive, containerRef, triggerElement]);
};
