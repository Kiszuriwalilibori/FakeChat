import { useCallback, useEffect, useState } from "react";
import { isEmpty } from "lodash";

import Icons from "icons";
import useDispatchAction from "hooks/useDispatchAction";

import { BasicButton } from "components";
import { Message, UserDetails } from "types/types";

import "./_Chat_Input.scss";

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
    const { addMessage } = useDispatchAction();

    const clickHandler = useCallback(
        () => {
            if (textContent) {
                const message = createMessage(textContent, id);
                addMessage(message);
                setTextContent("");
                setMessage(createAnswer(textContent, id));
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
            }, randomInteger(5, 10) * 1000)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    useEffect(() => {
        return () => timeouts.forEach(t => clearTimeout(t));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="Chat__input">
            <input
                className="form__input"
                placeholder={placeHolder}
                type="text"
                value={textContent}
                onChange={e => {
                    setTextContent(e.target.value);
                }}
            ></input>

            <div className="buttons">
                <BasicButton className="button-usual" type="button">
                    <Icons.Attach />
                </BasicButton>
                <BasicButton className="button-usual" type="button">
                    <Icons.Smile />
                </BasicButton>
                <BasicButton className="button-usual" type="submit" disabled={!textContent} onClick={clickHandler}>
                    <Icons.Send />
                </BasicButton>
            </div>
        </div>
    );
};

export default Input;
