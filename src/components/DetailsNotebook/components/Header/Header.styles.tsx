import { styled } from "@mui/material/styles";
import { Box, Stack } from "@mui/material";
import { Theme } from "@mui/material";
import { COLOR_BLUE } from "themes/constans";

export const SocialIconsContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(3.75),
    flexGrow: 1,
}));

export const UserImage = styled("img")(({ theme }) => ({
    borderRadius: "50%",
    position: "relative",
}));

export const UserDataStack = styled(Stack)(({ theme }) => ({
    alignItems: "center",
    paddingBottom: theme.spacing(2.5),
    paddingTop: theme.spacing(2.5),
    marginTop: theme.spacing(2.5),
}));

export const sxIconButton = {
    p: 0,
    width: "36px",
    height: "36px",
    mr: (theme: Theme) => theme.spacing(1.75),
    ml: (theme: Theme) => theme.spacing(1.75),
};

export const UserName = styled("h2")(({ theme }) => ({
    fontFamily: `"Lato", sans-serif`,
    fontSize: "18px",
    fontWeight: 800,
    color: COLOR_BLUE,
}));
