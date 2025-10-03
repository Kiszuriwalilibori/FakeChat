import { useRef } from "react";
import Box from "@mui/material/Box";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { sxPicker } from "./style";
import { useClickOutside, useEscapeKey, useFocusManagement, useFocusTrap } from "hooks";

interface Props {
    isActive: boolean;
    clickHandler: (emoji: EmojiClickData, event: MouseEvent) => void;
    onClose?: () => void;
    triggerElement?: HTMLElement | null;
}

export const Picker = (props: Props) => {
    const { isActive, clickHandler, onClose, triggerElement } = props;
    const pickerRef = useRef<HTMLDivElement>(null);

    useFocusManagement(isActive, pickerRef, triggerElement);
    useFocusTrap(isActive, pickerRef);
    useClickOutside(pickerRef, isActive, () => onClose?.());
    useEscapeKey(isActive, () => onClose?.());

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
