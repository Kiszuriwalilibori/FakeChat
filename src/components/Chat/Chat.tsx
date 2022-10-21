import { connect } from "react-redux";

import { RootStateType, UserDetails } from "types/types";

import Header from "./Chat_Header";
import Input from "./Chat_Input";
import Core from "./Chat_Core";

import "./_Chat.scss";
import { useLayoutEffect } from "react";

const Chat = (props: Pick<UserDetails, "id" | "name">) => {
    const { id, name } = props;

    useLayoutEffect(() => {
        document.getElementById("Chat")!.scrollIntoView();
        window.scrollBy(0, -80);
    }, [id]);

    return (
        <section className="Chat" id="Chat">
            <Header id={id} name={name} />
            <Core id={id} />
            <Input id={id} />
        </section>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    name: state.users.activeUser.name,
    id: state.users.activeUser.id,
});
export default connect(mapStateToProps, {})(Chat);
