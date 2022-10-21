import { connect } from "react-redux";
import uuid from "react-uuid";

import { RootStateType, Messages } from "types/types";

import Message from "./Message";

const filterMessages = (messages: Messages, id: string) => {
    return messages.filter(item => item.sender === id || (item.sender === "host" && item.addressee === id));
};

interface OwnProps {
    id: string;
}

interface Props extends OwnProps {
    messages: Messages;
    thumbnail: string;
    name: { first: string; last: string };
}

const Chat = (props: Props) => {
    const { messages, thumbnail, name } = props;
    return (
        <div className="chat--core">
            {messages.map(message => {
                return <Message message={message} thumbnail={thumbnail} name={name} key={uuid()} />;
            })}
        </div>
    );
};

const mapStateToProps = (state: RootStateType, ownProps: OwnProps) => {
    return {
        messages: filterMessages(state.messages.messages, ownProps.id),
        thumbnail: state.users.activeUser.picture.thumbnail,
        name: state.users.activeUser.name,
    };
};

export default connect(mapStateToProps, {})(Chat);
