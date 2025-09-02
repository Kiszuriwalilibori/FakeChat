import { useCallback, useRef,useLayoutEffect } from "react";
import { connect } from "react-redux";
import Fade from "@mui/material/Fade";
import debounce from "lodash/debounce";

import { RootState, UserDetails } from "types";
import { ChatHeader, ChatInput } from "./Components";
import Core from "./Components/Chat_Core";

import "./styles/_Chat.scss";
import useMediaQuery from "@mui/material/useMediaQuery";

const ANIMATION_TIMEOUT_MS = 700;
const DEBOUNCE_DELAY_MS = 500;

const Chat = (props: Pick<UserDetails, "id" | "name">) => {
    console.log("chat renders");
    const { id, name } = props;
    console.log(id);
    const matches = useMediaQuery("(min-width: 768px ) and (max-width: 1105px");   
    const ref = useRef<HTMLElement>(null);
    const debouncedScrolling = useCallback(
        debounce(() => {
            if (!matches && ref.current) {
                ref.current.scrollIntoView();
                window.scrollBy(0, -80);
            }
        }, DEBOUNCE_DELAY_MS),
        [matches] 
    );

    useLayoutEffect(() => {
        if (id) {
            debouncedScrolling();
            return () => debouncedScrolling.cancel();
        }
    }, [id, debouncedScrolling]); 

    return (
        <Fade in={true} timeout={ANIMATION_TIMEOUT_MS}>
            <section className="Chat" id="Chat" ref={ref} role="region"
                aria-label={id ? `Chat with ${name}` : 'Chat section'}
                aria-live="polite"
                aria-atomic="false">
                <ChatHeader id={id} name={name} />
                {id && <Core ID={id} aria-live="polite" aria-atomic="false"/>}
                {id && <ChatInput ID={id} aria-label="Type your message"/>}
            </section>
        </Fade>
    );
};

const mapStateToProps = (state: RootState) => ({
    name: state.users.activeUser.name,
    id: state.users.activeUser.id,
});
export default connect(mapStateToProps, {})(Chat);
