import { useEffect } from "react";

export function useSetScrollBarWidthOnResize() {
    useEffect(() => {
        function handleResize() {
            document.documentElement.style.setProperty(
                "--scrollbar-width",
                window.innerWidth - document.documentElement.offsetWidth + "px"
            );
        }
        // Add event listener
        window.addEventListener("resize", handleResize);

        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);
}

export default useSetScrollBarWidthOnResize;
