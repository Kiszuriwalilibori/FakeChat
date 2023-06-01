import { createTheme } from "@mui/material";

let theme = createTheme({});

theme = createTheme(theme, {
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
