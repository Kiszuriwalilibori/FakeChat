import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import { sxPicker } from "./style";

interface Props {
    isActive: boolean;
    clickHandler: (emoji: EmojiClickData, event: MouseEvent) => void;
    onClose?: () => void;
}

export const Picker = (props: Props) => {
    const { isActive, clickHandler, onClose } = props;
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) return;
        
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                onClose?.();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isActive, onClose]);

    if (!isActive) return null;
    return (
        <Box 
            ref={pickerRef}
            sx={sxPicker}
            role="dialog"
            aria-modal="true"
            aria-label="Emoji picker"
        >
            <EmojiPicker height={450} width={320} onEmojiClick={clickHandler} />
        </Box>
    );
};
export default Picker;
