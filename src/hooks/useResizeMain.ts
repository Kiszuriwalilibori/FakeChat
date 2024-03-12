import { useRef } from "react";

export const useResizeMain = () => {
    const refMain = useRef<HTMLElement>(null);

    const resizeMain = () => {
        refMain.current && refMain.current.classList.add("triple");
    };
    return { refMain, resizeMain };
};

export default useResizeMain;
