import { UserDetails } from "types";
// import theme from "../../themes/theme";

import Icons from "assets/icons";

import { IconButton, Stack, Theme, Typography } from "@mui/material";
import { SocialIconsContainer } from "./index";

export const IconSx = {
    p: 0,
    width: "36px",
    height: "36px",
    mr: (theme: Theme) => theme.spacing(1.75),
    ml: (theme: Theme) => theme.spacing(1.75),
};

const Header = (props: Pick<UserDetails, "name" | "location" | "picture" | "social">) => {
    const { name, location, picture, social } = props;

    return (
        <div className="Details__header">
            <img className="circular--square" src={picture.large} alt="user" />
            <Stack spacing={2.5} sx={{ alignItems: "center", pb: 2.5, pt: 2.5, mt: 2.5 }}>
                <Typography component="h2" variant="h2_blue">{`${name.firstName} ${name.lastName}`}</Typography>
                <Typography variant="body1">{`${location.city} ${location.country}`}</Typography>
                <SocialIconsContainer>
                    <IconButton
                        aria-label="Link to Facebook"
                        sx={IconSx}
                        href={social && social.facebook ? social.facebook : "https://pl-pl.facebook.com/"}
                    >
                        <Icons.Facebook />
                    </IconButton>
                    <IconButton
                        aria-label="Link to LinkedIn"
                        sx={IconSx}
                        href={social && social.linkedin ? social.linkedin : "https://pl.linkedin.com/"}
                    >
                        <Icons.Linkedin />
                    </IconButton>
                    <IconButton
                        aria-label="Link to Twitter"
                        sx={IconSx}
                        href={social && social.twitter ? social.twitter : "https://twitter.com/?lang=pl"}
                    >
                        <Icons.Twitter />
                    </IconButton>
                </SocialIconsContainer>
            </Stack>
        </div>
    );
};

export default Header;
