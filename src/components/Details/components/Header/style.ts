import { Theme } from "@mui/material";

export const sxIcon = {
    p: 0,
    width: "36px",
    height: "36px",
    mr: (theme: Theme) => theme.spacing(1.75),
    ml: (theme: Theme) => theme.spacing(1.75),
};

export const sxStack = { alignItems: "center", pb: 2.5, pt: 2.5, mt: 2.5 };
