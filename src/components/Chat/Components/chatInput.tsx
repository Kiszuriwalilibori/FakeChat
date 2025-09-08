import { useCallback, useEffect } from "react";
import { Stack } from "@mui/material";
import { EmojiClickData } from "emoji-picker-react";


import Icons from "assets/icons";
import { IconButton } from "components/Common";
import {  createEmoji} from "../utils";
import { useBoolean, useEnhancedState, useInitialFocus, useProcessMessage} from "hooks";
import { Picker } from "components";
import { MicrophoneButton } from "./MicrophoneButton";

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

    useEffect(() => {
        ID && clearInput();
    }, [ID]);

    

    const sendClickHandler = useCallback(
        () => {
            if (chatMessage) {
                sendMessage(chatMessage,ID,personality);
                clearInput();
                
                initialFocus.current && initialFocus.current.focus();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps

        [chatMessage, ID,personality]
    );

    
    return (
        <div className="Chat__message-section">
            <input
                placeholder={PLACEHOLDER}
                aria-label={PLACEHOLDER}
                type="text"
                value={chatMessage}
                ref={initialFocus}
                onChange={e => {
                    createChatMessage(e.target.value);
                }}
            ></input>

            <Stack direction="row" spacing={1.5} sx={{ mx: 2 }}>
                <MicrophoneButton 
                    onTranscript={createChatMessage}
                    currentMessage={chatMessage}
                />
                <IconButton disabled aria-label="attach file">
                    <Icons.Attach />
                </IconButton>
                <IconButton aria-label="add emoticon" id="Add emoticon" onClick={togglePickerVisibility}>
                    <Icons.Smile />
                </IconButton>

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