import Baloon from "./Baloon";
import Time from "./Time";

import {/* Message,*/MessageBody, UserDetails } from "types";

import "./_Message.scss";
import { Portrait } from "components";

interface Props {
    // message: Message;
    message: MessageBody;
    thumbnail: string;
    name: UserDetails["name"];
}
const UserMessage = (props: Props) => {
    const { thumbnail, message, name } = props;
    // const { content, timestamp, sender } = message;
    const { content, timestamp, role} = message;
    // const isFromHost = sender === "host";
const isFromAssistant = role === "assistant";
    return (
        <div className={isFromAssistant ? "message message--host" : " message message--user"}>
            {isFromAssistant && (
                <>
                    <Baloon message={content} variant={"assistant"} />
                    <div className="message--sender">
                        <Portrait isOnline thumbnail={"https://i.ibb.co/q7xpjTg/IMG-1018.webp"} name={name} />
                        <Time time={timestamp} />
                    </div>
                </>
            )}

            {!isFromAssistant && (
                <>
                    <div className="message--sender">
                        <Portrait isOnline thumbnail={thumbnail} name={name} />
                        <Time time={timestamp} />
                    </div>
                    <Baloon message={content} variant={"user"} />
                </>
            )}
        </div>
    );
};

export default UserMessage;
