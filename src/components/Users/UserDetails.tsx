import Icons from "icons";
import { connect } from "react-redux";
import moment from "moment";

import { RootStateType, UserDetails, Messages, Message } from "types/types";

import { Portrait } from "components";

const filterMessages = (messages: Messages, id: string) => {
    if (messages.length === 0) return {} as Message;
    const filteredMessages = messages.filter(item => item.sender === id || item.addressee === id);
    if (filteredMessages.length === 0) return {} as Message;
    return messages.reduce((prev, current) => (prev.timestamp > current.timestamp ? prev : current));
};

interface OwnProps {
    user: UserDetails;
    isActive: boolean;
    clickHandle: Function;
}

interface Props extends OwnProps {
    messages: Message;
}

const User = (props: Props) => {
    const { user, isActive, clickHandle, messages } = props;

    return (
        <div className={isActive ? "details active" : "details"} onClick={() => clickHandle(user.id)} tabIndex={0}>
            <div className="content">
                <Portrait thumbnail={user.picture.thumbnail} name={user.name} isFavorite={user.isFavorite} />

                <div className="text--content">
                    <h2>{`${user.name.first} ${user.name.last}`}</h2>
                    <div>
                        <span className="last--message">{messages.text}</span>
                    </div>
                </div>

                {messages.timestamp && (
                    <div className="last-comment">
                        {messages.text && moment(messages.timestamp).fromNow().replace("ago", "")}
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: RootStateType, ownProps: OwnProps) => {
    return {
        messages: filterMessages(state.messages.messages, ownProps.user.id),
    };
};

export default connect(mapStateToProps, {})(User);

//export default User;
