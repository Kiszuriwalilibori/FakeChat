import { useCallback, useEffect, useState } from "react";
import { isEmpty } from "lodash";

import Icons from "icons";
import useDispatchAction from "hooks/useDispatchAction";

import { BasicButton } from "components";
import { Message } from "types/types";

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

interface Props {
    id: string;
}

const Input = (props: Props) => {
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
                console.log(message, "message");
                !isEmpty(message) && addMessage(message);
            }, randomInteger(5, 10) * 1000)
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    useEffect(() => {
        return () => timeouts.forEach(t => clearTimeout(t));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         !isEmpty(message) && addMessage(message);
    //     }, randomInteger(5, 10) * 1000);
    //     //return () => clearTimeout(timer);

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [message]);

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

                {textContent && (
                    <BasicButton
                        className="button-usual"
                        type="submit"
                        // onClick={() => {
                        //     if (textContent) {
                        //         const message = createMessage(textContent, id);
                        //         addMessage(message);
                        //         setTextContent("");
                        //         setMessage(createAnswer(textContent, id));
                        //     }
                        // }}
                        onClick={clickHandler}
                    >
                        <Icons.Send />
                    </BasicButton>
                )}
            </div>
        </div>
    );
};

export default Input;
