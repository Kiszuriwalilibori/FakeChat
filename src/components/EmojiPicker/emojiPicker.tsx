import Box from "@mui/material/Box";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface Props {
    isActive: boolean;
    clickHandler: (emoji: EmojiClickData, event: MouseEvent) => void;
}

const PickerStyle = { position: "absolute", top: "-450px", left: "0" };

export const Picker = (props: Props) => {
    const { isActive, clickHandler } = props;

    if (!isActive) return null;
    return (
        <Box sx={PickerStyle}>
            <EmojiPicker height={450} width={320} onEmojiClick={clickHandler} />
        </Box>
    );
};
export default Picker;
