import { UserDetails } from "types/types";

import Icons from "icons";
import { IconButton, Stack, Typography } from "@mui/material";
import { IconSx, SocialIconsContainer } from "./styled";

const Header = (props: Pick<UserDetails, "name" | "location" | "picture" | "social">) => {
    const { name, location, picture, social } = props;

    return (
        <div className="Details__header">
            <img className="circular--square" src={picture.large} alt="user foto" />
            <Stack spacing={2.5} sx={{ alignItems: "center", pb: 2.5, pt: 2.5, mt: 2.5 }}>
                <Typography component="h2" variant="h2_blue">{`${name.first} ${name.last}`}</Typography>
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
