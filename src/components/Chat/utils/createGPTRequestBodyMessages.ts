import { GPTRequestBody, GPTRequestBodyMessage, Messages } from "types";

const systemMessage: GPTRequestBodyMessage = {
    role: "system",
    content: "Explain things like you're talking to a normal adult person",
};

export const createGPTRequestBodyMessages = (messages: Messages, id: string): GPTRequestBodyMessage[] => {
    const filtered = messages.filter(item => item.sender === id || (item.sender === "host" && item.addressee === id));
    const apiMessages = filtered.map(messageObject => {
        let role = "";
        if (messageObject.sender === "host") {
            role = "user";
        } else {
            role = "assistant";
        }
        return { role: role, content: messageObject.content } as GPTRequestBodyMessage;
    });

    return [systemMessage, ...apiMessages];
};

export default createGPTRequestBodyMessages;
