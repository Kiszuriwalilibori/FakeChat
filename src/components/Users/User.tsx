import moment from "moment";

import { UserDetails } from "types/types";

import { Portrait } from "components";

interface Props {
    user: UserDetails;
    isActive: boolean;
    clickHandle: Function;
}

const User = (props: Props) => {
    const { user, isActive, clickHandle } = props;

    return (
        <div className={isActive ? "details active" : "details"} onClick={() => clickHandle(user.id)} tabIndex={0}>
            <div className="content">
                <Portrait
                    thumbnail={user.picture.thumbnail}
                    name={user.name}
                    isFavorite={user.isFavorite}
                    isOnline={user.isOnline}
                />

                <div className="text--content">
                    <h2>{`${user.name.first} ${user.name.last}`}</h2>
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
