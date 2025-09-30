import Box from "@mui/material/Box";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import { sxPicker } from "./style";

interface Props {
    isActive: boolean;
    clickHandler: (emoji: EmojiClickData, event: MouseEvent) => void;
}

export const Picker = (props: Props) => {
    const { isActive, clickHandler } = props;

    if (!isActive) return null;
    return (
        <Box sx={sxPicker}
        role="dialog"
        aria-modal="true"
        aria-label="Emoji picker"
      >
            <EmojiPicker height={450} width={320} onEmojiClick={clickHandler} />
        </Box>
    );
};
export default Picker;
