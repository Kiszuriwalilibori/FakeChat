import { connect } from "react-redux";
import { debounce } from "lodash";
import { useLayoutEffect } from "react";

import { RootStateType, UserDetails } from "types/types";

import Header from "./Chat_Header";
import Input from "./Chat_Input";
import Core from "./Chat_Core";

import "./_Chat.scss";

function scrollToChat() {
    const node = document.getElementById("Chat");
    node && node.scrollIntoView();
    window.scrollBy(0, -80);
}

const Chat = (props: Pick<UserDetails, "id" | "name">) => {
    const { id, name } = props;
    const debouncedScroll = debounce(scrollToChat, 500);

    useLayoutEffect(() => {
        debouncedScroll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
