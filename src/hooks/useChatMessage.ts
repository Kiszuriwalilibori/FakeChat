import { useCallback, useState } from "react";

const INITIAL_CHAT_MESSAGE = "" as string;

export const useChatMessage = () => {
    const [chatMessage, setChatMessage] = useState(INITIAL_CHAT_MESSAGE);

    const createChatMessage = useCallback((text: typeof INITIAL_CHAT_MESSAGE) => {
        setChatMessage(text);
    }, []);
    const clearChatMessage = useCallback(() => {
        setChatMessage(INITIAL_CHAT_MESSAGE);
    }, []);

    return { chatMessage, clearChatMessage, createChatMessage };
};

export default useChatMessage;
