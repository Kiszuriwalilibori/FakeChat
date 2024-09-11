import Icons from "assets/icons";

import { IconButton, Typography } from "@mui/material";
import {
    HeaderContainer,
    SocialIconsContainer,
    sxIconButton,
    UserImage,
    UserDataStack,
    UserName,
    UserImageContainer,
} from "./Header.styles";
import { UserDetails } from "types";

const Header = (props: Pick<UserDetails, "name" | "location" | "picture" | "social">) => {
    const { name, location, picture, social } = props;

    return (
        <HeaderContainer id="Header">
            <UserImageContainer>
                <UserImage src={picture.large} alt="user" id="User Image" />
            </UserImageContainer>
            <UserDataStack spacing={2.5}>
                <UserName>{`${name.firstName} ${name.lastName}`}</UserName>
                <Typography variant="body1">{`${location.city} ${location.country}`}</Typography>
                <SocialIconsContainer>
                    <IconButton
                        aria-label="Link to Facebook"
                        sx={sxIconButton}
                        href={social && social.facebook ? social.facebook : "https://pl-pl.facebook.com/"}
                    >
                        <Icons.Facebook />
                    </IconButton>
                    <IconButton
                        aria-label="Link to LinkedIn"
                        sx={sxIconButton}
                        href={social && social.linkedin ? social.linkedin : "https://pl.linkedin.com/"}
                    >
                        <Icons.Linkedin />
                    </IconButton>
                    <IconButton
                        aria-label="Link to Twitter"
                        sx={sxIconButton}
                        href={social && social.twitter ? social.twitter : "https://twitter.com/?lang=pl"}
                    >
                        <Icons.Twitter />
                    </IconButton>
                </SocialIconsContainer>
            </UserDataStack>
        </HeaderContainer>
    );
};

export default Header;
