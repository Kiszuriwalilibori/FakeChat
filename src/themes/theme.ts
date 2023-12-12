import { createTheme } from "@mui/material";

import { COLOR_BLUE, COLOR_BLUE_DARKER, COLOR_BLUE_LIGHTER, TEXT_SECONDARY } from "./constans";
declare module "@mui/material/styles" {
    interface TypographyVariants {
        h2_blue: React.CSSProperties;
        h2_dark: React.CSSProperties;
        h2_light: React.CSSProperties;
        text_blue_underlined: React.CSSProperties;
        text_light_small: React.CSSProperties;
        text_light_underlined: React.CSSProperties;
        text_truncated?: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        h2_blue?: React.CSSProperties;
        h2_dark?: React.CSSProperties;
        h2_light?: React.CSSProperties;
        text_blue_underlined?: React.CSSProperties;
        text_light_small?: React.CSSProperties;
        text_light_underlined?: React.CSSProperties;
        text_truncated?: React.CSSProperties;
    }
}

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        h2_blue: true;
        h2_dark: true;
        h2_light: true;
        text_blue_underlined: true;
        text_light_small: true;
        text_light_underlined: true;
        text_truncated: true;
    }
}

let theme = createTheme({});

theme = createTheme(theme, {
    palette: {
        primary: {
            main: COLOR_BLUE,
            light: COLOR_BLUE_LIGHTER,
            dark: COLOR_BLUE_DARKER,
        },
        text: {
            secondary: TEXT_SECONDARY,
        },
    },
    typography: {
        fontFamily: `"Lato", sans-serif`,
        h2_blue: {
            fontSize: "18px",
            fontWeight: 800,
            color: COLOR_BLUE,
        },
        h2_dark: { fontWeight: 700, color: theme.palette.common.black, fontSize: "16px" },
        h2_light: {
            fontSize: "14px",
            color: TEXT_SECONDARY,
            textTransform: "uppercase",
        },
        text_blue_underlined: {
            fontSize: "16px",
            fontWeight: 800,
            color: COLOR_BLUE,
            textDecoration: "underline",
            textDecorationThickness: "2px",
            textUnderlineOffset: theme.spacing(1),
        },
        text_light_small: {
            fontSize: "12px",
            color: TEXT_SECONDARY,
            textTransform: "none",
            fontWeight: 400,
        },
        text_light_underlined: {
            fontSize: "16px",
            fontWeight: 400,
            color: TEXT_SECONDARY,
            textDecoration: "underline",
            textDecorationThickness: "1px",
            textUnderlineOffset: theme.spacing(0.5),
        },
        text_truncated: {
            width: "240px",
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: TEXT_SECONDARY,
        },

        body1: { color: TEXT_SECONDARY, lineHeight: "unset" },
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: "50px",
                    height: "50px",
                },
            },
        },
    },
});
export default theme;
