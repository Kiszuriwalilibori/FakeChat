import { Message } from "types";

export function createQuestions(content: string, userId: string): Message {
    const result = {} as Message;
    result.role = "user";
    result.content = content;
    result.timestamp = new Date().valueOf();
    result.userId = userId;

    return result;
}

export default createQuestions;
