import React from "react";
import Fade from "@mui/material/Fade";

import { connect } from "react-redux";
import { debounce } from "lodash";
import { useLayoutEffect } from "react";

import { RootState, UserDetails } from "types";

import { ChatHeader, ChatInput } from "./Components";

import Core from "./Components/Chat_Core";

import "./styles/_Chat.scss";
import useMediaQuery from "@mui/material/useMediaQuery";

const Chat = (props: Pick<UserDetails, "id" | "name">) => {
    const { id, name } = props;
    const matches = useMediaQuery("(min-width: 768px ) and (max-width: 1105px");

    const ref: React.RefObject<any> = React.createRef();

    function scrolling() {
        if (!matches) {
            ref.current && ref.current.scrollIntoView();
            window.scrollBy(0, -80);
        }
    }

    const debouncedScrolling = debounce(scrolling, 500);

    useLayoutEffect(() => {
        id && debouncedScrolling();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <Fade in={true} timeout={700}>
            <section className="Chat" id="Chat" ref={ref} aria-label="Chat section">
                <ChatHeader id={id} name={name} />
                {id && <Core ID={id} />}
                {id && <ChatInput ID={id} />}
            </section>
        </Fade>
    );
};

const mapStateToProps = (state: RootState) => ({
    name: state.users.activeUser.name,
    id: state.users.activeUser.id,
});
export default connect(mapStateToProps, {})(Chat);
