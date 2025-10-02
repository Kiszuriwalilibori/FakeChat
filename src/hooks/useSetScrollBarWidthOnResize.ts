import { useEffect } from "react";

export function useSetScrollBarWidthOnResize() {
    useEffect(() => {
        function handleResize() {
            document.documentElement.style.setProperty(
                "--scrollbar-width",
                window.innerWidth - document.documentElement.offsetWidth + "px"
            );
        }
       
        window.addEventListener("resize", handleResize);

        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
}

export default useSetScrollBarWidthOnResize;
