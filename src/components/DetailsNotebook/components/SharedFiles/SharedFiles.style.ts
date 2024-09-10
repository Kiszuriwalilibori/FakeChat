import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { COLOR_BLUE } from "themes/constans";

export const SharedFilesWrapper = styled("div")(({ theme }) => ({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    paddingTop: theme.spacing(2.75),
}));

export const SharedFilesHeader = styled(Stack)(({ theme }) => ({
    paddingTop: theme.spacing(2.75),
    alignItems: "center",
}));

export const LoadableFile = styled("li")(({ theme }) => ({
    padding: "14px 0 0",
    "& a": {
        marginLeft: "18px",
        position: "relative",
        textDecoration: "none",
    },
}));

export const FileList = styled("ul")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    color: COLOR_BLUE,
    listStyle: "disc inside",
    width: "100%",
}));
