import { Avatar, Badge } from "@mui/material";
import Icons from "assets/icons";
import { GreenBadge } from "styles/styled";

interface Props {
    isFavorite?: boolean;
    thumbnail: string;
    name: { first: string; last: string };
    isOnline?: boolean;
}

const Portrait = (props: Props) => {
    const { isFavorite = false, isOnline = false, thumbnail, name } = props;

    return (
        <div className={"image-wrapper"}>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                invisible={!isFavorite}
                badgeContent={<Icons.Star />}
            >
                <GreenBadge
                    invisible={!isOnline}
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                >
                    <Avatar src={thumbnail} alt={name.last} />
                </GreenBadge>
            </Badge>
        </div>
    );
};

export default Portrait;
