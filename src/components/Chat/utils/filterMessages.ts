import { Messages } from "types";

export const filterMessages = (messages: Messages, id: string) => {
    return messages.filter(item => item.sender === id || (item.sender === "host" && item.addressee === id));
};

export default filterMessages;
