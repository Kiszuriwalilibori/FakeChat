import { useCallback, useEffect } from "react";
import { Stack } from "@mui/material";
import { EmojiClickData } from "emoji-picker-react";

import Icons from "assets/icons";
import { IconButton } from "components/Common";
import {  createEmoji} from "../utils";
import { useBoolean, useEnhancedState, useInitialFocus, useMessage, useProcessMessage} from "hooks";
import { Picker } from "components";
import { MicrophoneButton } from "./MicrophoneButton";
import { sanitizeInput } from "../utils/sanitizeInput";
import EmojiButton from "./EmojiButton";

const PLACEHOLDER = "Type your message here...";


interface OwnProps {
    ID: string;
    personality: string;
}


const ChatInput = (props:OwnProps) => {
    const { ID,personality } = props;
    const [chatMessage, createChatMessage, clearInput, isChatMessageEmpty] = useEnhancedState<string>("");
    const [isPickerVisible, , , togglePickerVisibility] = useBoolean(false);
    const initialFocus = useInitialFocus<HTMLInputElement>();
    const { sendMessage } = useProcessMessage();
    const showMessage = useMessage();

    useEffect(() => {
        ID && clearInput();
    }, [ID]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    createChatMessage(e.target.value);
}, [createChatMessage]);

    const sendClickHandler = useCallback(() => {
    if (!chatMessage.trim()) return;
    if (!ID || !personality) {
        showMessage.error('Missing required props');
        return;
    }

    const sanitizedMessage = sanitizeInput(chatMessage);
  if (!sanitizedMessage) {
    showMessage.error('Message contains invalid content');
    return;
  }
    
    sendMessage(sanitizedMessage, ID, personality);
    clearInput();
    initialFocus.current?.focus();
}, [chatMessage, ID, personality, sendMessage, clearInput, initialFocus]);
    return (
        <div className="Chat__message-section">
            <input
                placeholder={PLACEHOLDER}
                aria-label={PLACEHOLDER}
                type="text"
                value={chatMessage}
                ref={initialFocus}
                onChange={handleInputChange}
            ></input>

            <Stack direction="row" spacing={1.5} sx={{ mx: 2 }}>
                <MicrophoneButton 
                    onTranscript={createChatMessage}
                    currentMessage={chatMessage}
                />
                <IconButton disabled aria-label="attach file">
                    <Icons.Attach />
                </IconButton>
                <EmojiButton isPickerVisible={isPickerVisible} togglePickerVisibility={togglePickerVisibility}/>
                {/* <IconButton aria-label="add emoticon" id="Add emoticon" onClick={togglePickerVisibility}>
                    <Icons.Smile />
                </IconButton> */}

                <IconButton disabled={isChatMessageEmpty} onClick={sendClickHandler} aria-label="send">
                    <Icons.Send />
                </IconButton>
            </Stack>
            <Picker
                isActive={isPickerVisible}
                clickHandler={(emojiData: EmojiClickData) => {
                    createEmoji(emojiData) && createChatMessage(chatMessage + createEmoji(emojiData));
                }}
            />
        </div>
    );
};

export default ChatInput;