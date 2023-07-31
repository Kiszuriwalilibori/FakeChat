import Fade from "@mui/material/Fade";

import { connect } from "react-redux";
import { debounce } from "lodash";
import { useLayoutEffect } from "react";

import { RootStateType, UserDetails } from "types/types";

import Header from "./Chat_Header";
import Input from "./Chat_Input";
import Core from "./Chat_Core";

import "./_Chat.scss";
import React from "react";

const Chat = (props: Pick<UserDetails, "id" | "name">) => {
    const { id, name } = props;

    const ref: React.RefObject<any> = React.createRef();

    function scrolling() {
        ref.current && ref.current.scrollIntoView();
        window.scrollBy(0, -80);
    }

    const debouncedScrolling = debounce(scrolling, 500);

    useLayoutEffect(() => {
        id && debouncedScrolling();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <Fade in={true} timeout={700}>
            <section className="Chat" id="Chat" ref={ref}>
                <Header id={id} name={name} />
                {id && <Core id={id} />}
                {id && <Input id={id} />}
            </section>
        </Fade>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    name: state.users.activeUser.name,
    id: state.users.activeUser.id,
});
export default connect(mapStateToProps, {})(Chat);
