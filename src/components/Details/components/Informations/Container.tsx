import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";

export const InformationsContainer = styled(Stack)(({ theme }) => ({
    width: "100%",
    alignItems: "center",
    paddingBottom: theme.spacing(3.75),
    "& > div:not(:last-child)": { borderBottom: `1px dotted ${theme.palette.text.secondary}` },
}));

export default InformationsContainer;
