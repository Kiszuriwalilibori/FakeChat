import moment from "moment";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { UserDetails } from "types";
import { Portrait } from "components";
import useDebouncedCallback from "hooks/useDebouncedCallback";

interface Props {
    user: UserDetails;
    isActive: boolean;
    clickHandler: (userId: string) => void;
}

const User = (props: Props) => {
    const { user, isActive, clickHandler } = props;

    const handleClick = useDebouncedCallback(clickHandler, user.id);

    return (
        <div
            className={`${isActive ? "details active" : "details"} ${user.isOnline ? "clickable" : ""} `}
            onClick={user.isOnline ? handleClick : undefined}
            tabIndex={0}
        >
            <div className="content">
                <Portrait
                    thumbnail={user.picture.thumbnail}
                    name={user.name}
                    isFavorite={user.isFavorite}
                    isOnline={user.isOnline}
                />

                <div className="text--content">
                    <Typography
                        variant="h2_dark"
                        component="h2"
                    >{`${user.name.firstName} ${user.name.lastName}`}</Typography>

                    {user.lastMessage?.content && (
                        <Box
                            sx={theme => ({
                                position: "absolute",
                                bottom: theme.spacing(-1),
                            })}
                        >
                            <Typography variant="text_truncated">{user.lastMessage?.content}</Typography>
                        </Box>
                    )}
                </div>

                {user.lastMessage?.content && (
                    <div className="last-comment">
                        {user.lastMessage?.content && moment(user.lastMessage?.timestamp).fromNow().replace("ago", "")}
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
