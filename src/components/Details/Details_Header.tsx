import { UserDetails } from "types/types";

import Icons from "icons";

const Header = (props: Pick<UserDetails, "name" | "location" | "picture" | "social">) => {
    const { name, location, picture, social } = props;

    return (
        <div className="Details__header">
            <img className="circular--square" src={picture.large} alt="user foto" />
            <h2>{`${name.first} ${name.last}`}</h2>
            <p>{`${location.city} ${location.country}`}</p>
            <div className="social">
                <a href={social && social.facebook ? social.facebook : "https://pl-pl.facebook.com/"}>
                    <Icons.Facebook />
                </a>
                <a href={social && social.linkedin ? social.linkedin : "https://pl.linkedin.com/"}>
                    <Icons.Linkedin />
                </a>
                <a href={social && social.twitter ? social.twitter : "https://twitter.com/?lang=pl"}>
                    <Icons.Twitter />
                </a>
            </div>
        </div>
    );
};

export default Header;
