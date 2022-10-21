import Baloon from "./Baloon";
import Time from "./Time";

import { Portrait } from "components";
import { Message } from "types/types";

import "./_Message.scss";

interface Props {
    message: Message;
    thumbnail: string;
    name: { first: string; last: string };
}
const UserMessage = (props: Props) => {
    const { thumbnail, message, name } = props;
    const { text, timestamp, sender } = message;
    const fromHost = sender === "host";

    return (
        <div className={fromHost ? "host-message" : "user-message"}>
            {fromHost && (
                <>
                    <Baloon text={text} type={"host"} />
                    <div className="person-wrapper">
                        <Portrait online thumbnail={"https://i.ibb.co/tYQ9jG4/Author.jpg"} name={name} />
                        <Time time={timestamp} />
                    </div>
                </>
            )}

            {!fromHost && (
                <>
                    <div className="person-wrapper">
                        <Portrait online thumbnail={thumbnail} name={name} />
                        <Time time={timestamp} />
                    </div>
                    <Baloon text={text} type={"user"} />
                </>
            )}
        </div>
    );
};

export default UserMessage;

/**
 * todo to byłoby dobre na rendering props
 */
