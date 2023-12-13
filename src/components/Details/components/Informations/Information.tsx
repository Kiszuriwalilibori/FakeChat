import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const InformationsItem = styled(Box)(({ theme }) => ({
    padding: "12px 0",
    display: "flex",
    justifyContent: "space-between",
    width: "75%",
    boxSizing: "border-box",
}));

export default InformationsItem;
