import { MessageBody } from "types";

export function createResponse(content: string, userId: string): MessageBody {
    const result = {} as MessageBody;
    result.role = "assistant";
    result.content = content;
    result.timestamp = new Date().valueOf();
    result.userId = userId;

    return result;
}

export default createResponse;
