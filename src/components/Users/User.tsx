import moment from "moment";

import { UserDetails } from "types";

import { Portrait } from "components";
import Typography from "@mui/material/Typography";

interface Props {
    user: UserDetails;
    isActive: boolean;
    clickHandle: Function;
}

const User = (props: Props) => {
    const { user, isActive, clickHandle } = props;

    return (
        <div
            className={`${isActive ? "details active" : "details"} ${user.isOnline ? "clickable" : ""} `}
            onClick={user.isOnline ? () => clickHandle(user.id) : undefined}
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
                    <Typography variant="h2_dark" component="h2">{`${user.name.first} ${user.name.last}`}</Typography>
                    <div>
                        {user.lastMessage?.text && <span className="last--message">{user.lastMessage?.text}</span>}
                    </div>
                </div>

                {user.lastMessage?.text && (
                    <div className="last-comment">
                        {user.lastMessage?.text && moment(user.lastMessage?.timestamp).fromNow().replace("ago", "")}
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
