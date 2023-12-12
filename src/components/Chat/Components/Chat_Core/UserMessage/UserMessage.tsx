import Baloon from "./Baloon";
import Time from "./Time";

import { Message, UserDetails } from "types";

import "./_Message.scss";
import { Portrait } from "components";

interface Props {
    message: Message;
    thumbnail: string;
    name: UserDetails["name"];
}
const UserMessage = (props: Props) => {
    const { thumbnail, message, name } = props;
    const { content, timestamp, sender } = message;
    const isFromHost = sender === "host";

    return (
        <div className={isFromHost ? "message message--host" : " message message--user"}>
            {isFromHost && (
                <>
                    <Baloon message={content} variant={"host"} />
                    <div className="message--sender">
                        <Portrait isOnline thumbnail={"https://i.ibb.co/q7xpjTg/IMG-1018.webp"} name={name} />
                        <Time time={timestamp} />
                    </div>
                </>
            )}

            {!isFromHost && (
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
