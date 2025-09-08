import { Message } from "types";

export function createResponse(content: string, userId: string): Message {
    const result = {} as Message;
    result.role = "assistant";
    result.content = content;
    result.timestamp = new Date().valueOf();
    result.userId = userId;

    return result;
}

export default createResponse;
