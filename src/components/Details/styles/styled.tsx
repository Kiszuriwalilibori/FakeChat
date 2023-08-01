import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

export const InformationsItem = styled(Box)(({ theme }) => ({
    padding: "12px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "75%",
    boxSizing: "border-box",
}));

export const InformationsContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: theme.spacing(3.75),
    "& > div:not(:last-child)": { borderBottom: `1px dotted ${theme.palette.text.secondary}` },
})); // todo to właściwie powinien być stack

export const SocialIconsContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
}));

export const IconSx = {
    p: 0,
    width: "36px",
    height: "36px",
    mr: (theme: { spacing: (arg0: number) => any }) => theme.spacing(1.75),
    ml: (theme: { spacing: (arg0: number) => any }) => theme.spacing(1.75),
};
