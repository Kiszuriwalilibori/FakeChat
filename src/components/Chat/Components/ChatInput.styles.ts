const COLOR_SUNNY_DARK = "#ffb800";
const COLOR_SUNNY_HOVER = "#ffe37e";

export const listeningMicrophoneSx = (listening: boolean) => {
    if (listening) {
        return {
            backgroundColor: COLOR_SUNNY_DARK,
            animation: "bgr 1s infinite",
            "&:hover": {
                backgroundColor: COLOR_SUNNY_HOVER,
            },

            "@keyframes bgr": {
                "0%": {
                    backgroundColor: COLOR_SUNNY_DARK,
                },
                "50%": {
                    backgroundColor: COLOR_SUNNY_HOVER,
                },
                "100%": {
                    backgroundColor: COLOR_SUNNY_DARK,
                },
            },
        };
    } else {
        return {
            backgroundColor: "initial",
            "&:hover": {
                backgroundColor: "lightgrey",
            },
        };
    }
};
