import MicIcon from "@mui/icons-material/Mic";

import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { Stack } from "@mui/material";
import { EmojiClickData } from "emoji-picker-react";
import { useSpeechRecognition } from "react-speech-kit";
import { IconButton } from "components/Common";

import Icons from "assets/icons";
import useDispatchAction from "hooks/useDispatchAction";

import { GPTRequestBodyMessage, Message, RootState } from "types";
import {
    askChatGPT,
    createAnswer,
    createEmoji,
    createMessage,
    createGPTRequestBodyMessages,
    randomInteger,
    translateMessageToGPTChatMessage,
} from "../utils";

import { useBoolean, useChatMessage, useInitialFocus } from "hooks";
import { Picker } from "components";
import { listeningMicrophoneSx } from "./ChatInput.styles";

const placeHolder = "Type your message here...";

interface OwnProps {
    ID: string;
}
interface Props extends OwnProps {
    apiGPTRequestBodyMessages: GPTRequestBodyMessage[];
}

const getRandomDelay = () => randomInteger(5, 10) * 1000;

// const IconButtonStyle = {
//     backgroundColor: listening ? "#91ff35" : "initial",
//     "&:hover": { backgroundColor: listening ? "#91ff35" : "lightgrey" },
// };

// const INITIAL_INPUT = "";
const INITIAL_MESSAGE = {} as Message;

const ChatInput = (props: Props) => {
    const { ID, apiGPTRequestBodyMessages } = props;
    // const [textContent, setTextContent] = useState<string>(INITIAL_INPUT);
    const { chatMessage, clearChatMessage, createChatMessage } = useChatMessage();
    const [message, setMessage] = useState<Message>(INITIAL_MESSAGE);

    const { listen, listening, stop, supported } = useSpeechRecognition({
        onResult: (result: string) => {
            result && createChatMessage(chatMessage + " " + result);
        },
    }); //

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
                // const newMessage = translateMessageToGPTChatMessage(message);
                // const updatedMessages = [...apiGPTRequestBodyMessages, newMessage];
                // const apiRequestBody = {
                //     model: "gpt-3.5-turbo",
                //     messages: updatedMessages,
                // };

                // askChatGPT(apiRequestBody);
                // no GPT Chat - no action
                addMessage(message);
                // setTextContent("");
                clearChatMessage();
                // setMessage(createAnswer(textContent, ID));
                setMessage(createAnswer(chatMessage, ID));
                updateLastMessage({ ID, lastMessage: { content: message.content, timestamp: message.timestamp } });
                initialFocus.current && initialFocus.current.focus();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps

        [chatMessage, ID]
        // [textContent, ID]
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
                placeholder={placeHolder}
                aria-label={placeHolder}
                type="text"
                // value={textContent}
                value={chatMessage}
                ref={initialFocus}
                onChange={e => {
                    // setTextContent(e.target.value);
                    createChatMessage(e.target.value);
                }}
            ></input>

            <Stack direction="row" spacing={1.5} sx={{ mx: 2 }}>
                <IconButton
                    disabled={!supported}
                    aria-label="toggle microphone"
                    onClick={listening ? stop : listen}
                    sx={{ ...listeningMicrophoneSx(listening) }}
                >
                    <MicIcon />
                </IconButton>

                <IconButton disabled aria-label="attach file">
                    <Icons.Attach />
                </IconButton>
                <IconButton
                    aria-label="add emoticon"
                    onClick={() => {
                        togglePickerVisibility();
                    }}
                >
                    <Icons.Smile />
                </IconButton>

                <IconButton disabled={/*!textContent*/ !chatMessage} onClick={sendClickHandler} aria-label="send">
                    <Icons.Send />
                </IconButton>
            </Stack>
            <Picker
                isActive={isPickerVisible}
                clickHandler={(emojiData: EmojiClickData) => {
                    createEmoji(emojiData) &&
                        /*setTextContent(textContent + createEmoji(emojiData))*/ createChatMessage(
                            chatMessage + createEmoji(emojiData)
                        );
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
