import { useRef } from "react";

export const useResizeChat = () => {
    const refChat = useRef<HTMLElement>(null);

    const resizeChat = () => {
        refChat.current && refChat.current.classList.add("triple");
    };

    return { refChat, resizeChat };
};

export default useResizeChat;
