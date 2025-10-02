import { useEffect, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { sxPicker } from "./style";

interface Props {
    isActive: boolean;
    clickHandler: (emoji: EmojiClickData, event: MouseEvent) => void;
    onClose?: () => void;
    triggerElement?: HTMLElement | null;
}

export const Picker = (props: Props) => {
    const { isActive, clickHandler, onClose, triggerElement } = props;
    const pickerRef = useRef<HTMLDivElement>(null);
    const previouslyFocusedElement = useRef<HTMLElement | null>(null);

    // Focus trap logic
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose?.();
            return;
        }

        // Only handle tab key when picker is active
        if (event.key !== 'Tab' || !isActive) return;

        const focusableElements = pickerRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }, [isActive, onClose]);

    // Set up event listeners and focus management
    useEffect(() => {
        if (!isActive) return;

        // Store the element that had focus before opening the picker
        previouslyFocusedElement.current = document.activeElement as HTMLElement;

        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose?.();
            }
        };

        // Add event listeners
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        // Focus the first focusable element in the picker after a small delay
        // to ensure the picker is fully rendered
        const focusTimer = setTimeout(() => {
            const focusableElements = pickerRef.current?.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0]?.focus();
            } else {
                // Fallback: focus the picker container if no focusable elements found
                pickerRef.current?.setAttribute('tabindex', '-1');
                pickerRef.current?.focus();
            }
        }, 50);

        // Cleanup function
        return () => {
            clearTimeout(focusTimer);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
            
            // Return focus to the previously focused element or the trigger element
            if (previouslyFocusedElement.current) {
                previouslyFocusedElement.current.focus();
            } else if (triggerElement) {
                triggerElement.focus();
            }
        };
    }, [isActive, onClose, handleKeyDown, triggerElement]);

    if (!isActive) return null;

    return (
        <Box 
            ref={pickerRef}
            sx={sxPicker}
            role="dialog"
            aria-modal="true"
            aria-label="Emoji picker"
            aria-expanded={isActive}
        >
            <EmojiPicker 
                height={450} 
                width={320} 
                onEmojiClick={clickHandler} 
                previewConfig={{
                    showPreview: false
                }}
            />
        </Box>
    );
};

export default Picker;
