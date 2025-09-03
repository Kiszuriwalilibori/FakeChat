import { MessageBody } from "types";

export function createQuestions(content: string, userId: string): MessageBody {
    const result = {} as MessageBody;
    result.role = "user";
    result.content = content;
    result.timestamp = new Date().valueOf();
    result.userId = userId;

    return result;
}

export default createQuestions;
