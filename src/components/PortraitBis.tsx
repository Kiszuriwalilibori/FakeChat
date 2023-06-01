import { Avatar } from "@mui/material";
import Icons from "icons";

interface Props {
    isFavorite?: boolean;
    thumbnail: string;
    name: { first: string; last: string };
    isOnline?: boolean;
}

const PortraitBis = (props: Props) => {
    const { isFavorite = false, isOnline = false, thumbnail, name } = props;

    return (
        <div className={isOnline ? "image-wrapper online" : "image-wrapper"}>
            {isFavorite && <Icons.Star />}

            <Avatar src={thumbnail} alt={name.last} sx={{ width: "50px", height: "50px" }} />
        </div>
    );
};

export default PortraitBis;
