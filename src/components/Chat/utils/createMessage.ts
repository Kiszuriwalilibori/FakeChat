import { Message } from "types";

export function createMessage(content: string, addressee: string): Message {
    const result = {} as Message;
    result.sender = "host";
    result.content = content;
    result.timestamp = new Date().valueOf();
    result.addressee = addressee;

    return result;
}

export default createMessage;
