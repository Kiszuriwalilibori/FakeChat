import { MessageBodyArray} from "types";

export const filterMessageBodies = (messages: MessageBodyArray, id: string) => {
    return messages.filter(item => item.userId === id);
};

export default filterMessageBodies;
