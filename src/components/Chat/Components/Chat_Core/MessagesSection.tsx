import { connect } from "react-redux";
import uuid from "react-uuid";

import { RootState, UserDetails, MessageArray } from "types";

import UserMessage from "./UserMessage";
import filterMessageBodies from "components/Chat/utils/filterMessageBodies";



interface OwnProps {
    ID: string;
}

interface Props extends OwnProps {
    messages: MessageArray;
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
        messages: filterMessageBodies(state.messages.messages, ownProps.ID),
        thumbnail: state.users.activeUser.picture.thumbnail,
        userName: state.users.activeUser.name,
    };
};

export default connect(mapStateToProps, {})(MessagesSection);
