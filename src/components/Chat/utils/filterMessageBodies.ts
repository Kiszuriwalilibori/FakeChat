import { MessageArray} from "types";

export const filterMessageBodies = (messages: MessageArray, id: string) => {
    return messages.filter(item => item.userId === id);
};

export default filterMessageBodies;
