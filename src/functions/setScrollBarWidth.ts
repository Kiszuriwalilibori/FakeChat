export function setScrollBarWidth() {
    document.documentElement.style.setProperty(
        "--scrollbar-width",
        window.innerWidth - document.documentElement.offsetWidth + "px"
    );
}

export default setScrollBarWidth;
