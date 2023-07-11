import { UserDetails } from "types/types";

import Icons from "icons";
import { IconButton } from "@mui/material";

const Header = (props: Pick<UserDetails, "name" | "location" | "picture" | "social">) => {
    const { name, location, picture, social } = props;

    return (
        <div className="Details__header">
            <img className="circular--square" src={picture.large} alt="user foto" />
            <h2>{`${name.first} ${name.last}`}</h2>
            <p>{`${location.city} ${location.country}`}</p>
            <div className="social">
                <IconButton
                    aria-label="Link to Facebook"
                    sx={{ p: 0 }}
                    href={social && social.facebook ? social.facebook : "https://pl-pl.facebook.com/"}
                >
                    <Icons.Facebook />
                </IconButton>
                <IconButton
                    aria-label="Link to LinkedIn"
                    sx={{ p: 0 }}
                    href={social && social.linkedin ? social.linkedin : "https://pl.linkedin.com/"}
                >
                    <Icons.Linkedin />
                </IconButton>
                <IconButton
                    aria-label="Link to Twitter"
                    sx={{ p: 0 }}
                    href={social && social.twitter ? social.twitter : "https://twitter.com/?lang=pl"}
                >
                    <Icons.Twitter />
                </IconButton>
            </div>
        </div>
    );
};

export default Header;
