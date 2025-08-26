import MicIcon from "@mui/icons-material/Mic";

import { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import { Stack } from "@mui/material";
import { EmojiClickData } from "emoji-picker-react";
import { useSpeechRecognition } from "react-speech-kit";

import Icons from "assets/icons";

import { IconButton } from "components/Common";
import { GPTRequestBodyMessage, Message, RootState } from "types";
import { createAnswer, createEmoji, createMessage, createGPTRequestBodyMessages, getRandomDelay } from "../utils";
import { useBoolean, useEnhancedState, useInitialFocus, useDispatchAction, useVoice } from "hooks";
import { Picker } from "components";
import { listeningMicrophoneSx } from "./ChatInput.styles";

const PLACEHOLDER = "Type your message here...";
const INITIAL_MESSAGE = {} as Message;

interface OwnProps {
    ID: string;
}
interface Props extends OwnProps {
    apiGPTRequestBodyMessages: GPTRequestBodyMessage[];
}

const ChatInput = (props: Props) => {
    const { ID } = props;
    const [chatMessage, createChatMessage, clearChatMessage, isChatMessageEmpty] = useEnhancedState<string>("");
    const [message, setMessage] = useEnhancedState<Message>(INITIAL_MESSAGE);
    const { handleClickMicrophone, isMicrophoneDisabled, listening } = useVoice(createChatMessage, chatMessage);
    const [isPickerVisible, , , togglePickerVisibility] = useBoolean(false);
    const { addMessage, setOnlineTrue, updateLastMessage } = useDispatchAction();
    const initialFocus = useInitialFocus<HTMLInputElement>();

    useEffect(() => {
        ID && clearChatMessage();
    }, [ID]);

    const sendClickHandler = useCallback(
        () => {
            if (chatMessage) {
                const message = createMessage(chatMessage, ID);
                addMessage(message);
                clearChatMessage();
                setMessage(createAnswer(chatMessage, ID));
                updateLastMessage({ ID, lastMessage: { content: message.content, timestamp: message.timestamp } });
                initialFocus.current && initialFocus.current.focus();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps

        [chatMessage, ID]
    );

    const timeouts: NodeJS.Timeout[] = [];

    useEffect(() => {
        timeouts.push(
            setTimeout(() => {
                !isEmpty(message) && addMessage(message);
                !isEmpty(message) &&
                    updateLastMessage({ ID, lastMessage: { content: message.content, timestamp: message.timestamp } });
            }, getRandomDelay())
        );
        timeouts.push(
            setTimeout(() => {
                !isEmpty(message) && setOnlineTrue(ID);
            }, getRandomDelay())
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    useEffect(() => {
        return () => timeouts.forEach(t => clearTimeout(t));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <IconButton
                    disabled={isMicrophoneDisabled}
                    id={"Microphone"}
                    aria-label="toggle microphone"
                    onClick={handleClickMicrophone}
                    sx={{ ...listeningMicrophoneSx(listening) }}
                >
                    <MicIcon />
                </IconButton>

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

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
    return {
        apiGPTRequestBodyMessages: createGPTRequestBodyMessages(state.messages.messages, ownProps.ID),
    };
};

export default connect(mapStateToProps, {})(ChatInput);
