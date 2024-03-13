import { UserDetails } from "types";

import Icons from "assets/icons";

import { IconButton, Stack, Typography } from "@mui/material";
import { SocialIconsContainer } from "./SocialIconsContainer";
import { sxIcon, sxStack } from "./style";

const Header = (props: Pick<UserDetails, "name" | "location" | "picture" | "social">) => {
    const { name, location, picture, social } = props;

    return (
        <div className="Details__header">
            <img className="circular--square" src={picture.large} alt="user" />
            <Stack spacing={2.5} sx={sxStack}>
                <Typography component="h2" variant="h2_blue">{`${name.firstName} ${name.lastName}`}</Typography>
                <Typography variant="body1">{`${location.city} ${location.country}`}</Typography>
                <SocialIconsContainer>
                    <IconButton
                        aria-label="Link to Facebook"
                        sx={sxIcon}
                        href={social && social.facebook ? social.facebook : "https://pl-pl.facebook.com/"}
                    >
                        <Icons.Facebook />
                    </IconButton>
                    <IconButton
                        aria-label="Link to LinkedIn"
                        sx={sxIcon}
                        href={social && social.linkedin ? social.linkedin : "https://pl.linkedin.com/"}
                    >
                        <Icons.Linkedin />
                    </IconButton>
                    <IconButton
                        aria-label="Link to Twitter"
                        sx={sxIcon}
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
