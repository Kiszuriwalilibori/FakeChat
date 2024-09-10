import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

export const InformationsItem = styled(Box)(({ theme }) => ({
    padding: `${theme.spacing(1.5)} 0`,
    display: "flex",
    justifyContent: "space-between",
    width: "75%",
    boxSizing: "border-box",
}));

export const InformationsContainer = styled(Stack)(({ theme }) => ({
    width: "100%",
    alignItems: "center",
    paddingBottom: theme.spacing(3.75),
    "& > div:not(:last-child)": { borderBottom: `1px dotted ${theme.palette.text.secondary}` },
}));

export const InformationsHeader = styled(Stack)(({ theme }) => ({
    paddingTop: theme.spacing(2.75),
    alignItems: "center",
}));

export const InformationsWrapper = styled("div")(({ theme }) => ({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingTop: theme.spacing(2.75),
}));
