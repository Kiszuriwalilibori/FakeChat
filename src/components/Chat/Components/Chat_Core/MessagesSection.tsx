import { connect } from "react-redux";
import uuid from "react-uuid";

import { RootState, Messages, UserDetails } from "types";

import UserMessage from "./UserMessage";
import { filterMessages } from "components/Chat/utils";

interface OwnProps {
    ID: string;
}

interface Props extends OwnProps {
    messages: Messages;
    thumbnail: string;
    userName: UserDetails["name"];
}

const MessagesSection = (props: Props) => {
    const { messages, thumbnail, userName } = props;
    return (
        <section className="chat--core" aria-label="messages">
            {messages.map(message => {
                return <UserMessage message={message} thumbnail={thumbnail} name={userName} key={uuid()} />;
            })}
        </section>
    );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
    return {
        messages: filterMessages(state.messages.messages, ownProps.ID),
        thumbnail: state.users.activeUser.picture.thumbnail,
        userName: state.users.activeUser.name,
    };
};

export default connect(mapStateToProps, {})(MessagesSection);
