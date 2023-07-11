import { useCallback, useEffect, useRef, useState } from "react";
import { isEmpty } from "lodash";

import Icons from "icons";
import useDispatchAction from "hooks/useDispatchAction";

import { Message, UserDetails } from "types/types";
import { IconButton, Stack } from "@mui/material";

const placeHolder = "Type your message here...";

function createMessage(text: string, addressee: string): Message {
    const result = {} as Message;
    result.sender = "host";
    result.text = text;
    result.timestamp = new Date().valueOf();
    result.addressee = addressee;

    return result;
}

function createAnswer(text: string, addressee: string): Message {
    const result = {} as Message;
    result.sender = addressee;
    result.text = "Powiedziałeś: " + text;
    result.timestamp = new Date().valueOf();
    result.addressee = "host";

    return result;
}

function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Input = (props: Pick<UserDetails, "id">) => {
    const { id } = props;
    const [textContent, setTextContent] = useState<string>("");
    const [message, setMessage] = useState<Message>({} as Message);
    const { addMessage, setOnlineTrue, updateLastMessage } = useDispatchAction();
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        ref.current && ref.current.focus();
    }, []);

    const sendClickHandler = useCallback(
        () => {
            if (textContent) {
                const message = createMessage(textContent, id);
                addMessage(message);
                setTextContent("");
                setMessage(createAnswer(textContent, id));
                updateLastMessage({ id, lastMessage: { text: message.text, timestamp: message.timestamp } });
                ref.current && ref.current.focus();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [textContent, id]
    );

    const timeouts = [] as any[];

    useEffect(() => {
        timeouts.push(
            setTimeout(() => {
                !isEmpty(message) && addMessage(message);
                !isEmpty(message) &&
                    updateLastMessage({ id, lastMessage: { text: message.text, timestamp: message.timestamp } });
            }, randomInteger(5, 10) * 1000)
        );
        timeouts.push(
            setTimeout(() => {
                !isEmpty(message) && setOnlineTrue(id);
            }, randomInteger(3, 5) * 1000)
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
                type="text"
                value={textContent}
                ref={ref}
                onChange={e => {
                    setTextContent(e.target.value);
                }}
            ></input>

            <Stack direction="row" spacing={1.5} sx={{ mx: 2 }}>
                <IconButton disabled aria-label="attach file">
                    <Icons.Attach />
                </IconButton>
                <IconButton disabled aria-label="add emoticon">
                    <Icons.Smile />
                </IconButton>
                <IconButton disabled={!textContent} onClick={sendClickHandler} aria-label="send">
                    <Icons.Send />
                </IconButton>
            </Stack>
        </div>
    );
};

export default Input;
