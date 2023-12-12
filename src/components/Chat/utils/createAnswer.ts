import { Message } from "types";

export function createAnswer(text: string, addressee: string): Message {
    const result = {} as Message;
    result.sender = addressee;
    result.content = "Powiedziałeś: " + text;
    result.timestamp = new Date().valueOf();
    result.addressee = "host";

    return result;
}

export default createAnswer;
