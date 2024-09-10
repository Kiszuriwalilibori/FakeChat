import Fade from "@mui/material/Fade";
import uuid from "react-uuid";

import { useEffect, useRef } from "react";
import { connect } from "react-redux";

import { User, UserSelectInput } from "./components";
import { RootState, Messages, UserDetails } from "types";
import { useDispatchAction, useEnhancedState } from "hooks";
import { getSelectedUsers } from "functions";

import "./styles/_Users.scss";

interface Props {
    users: UserDetails[];
    messages: Messages;
    handleUserSelected: () => void;
}
const Users = (props: Props) => {
    const { users, handleUserSelected } = props;
    const [activeUser, setActiveUser] = useEnhancedState<string>("");
    const [inputContent, setInputContent] = useEnhancedState<string>("");
    const { setActiveUserDetails } = useDispatchAction();

    const userSelectInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const active = users.find(obj => {
            return obj.id === activeUser;
        });
        active && setActiveUserDetails(active);
        activeUser && handleUserSelected();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeUser, users]);

    const selectedUsers = getSelectedUsers(users, inputContent);
    const handleHover = () => {
        userSelectInputRef.current && userSelectInputRef.current.focus();
    };
    const handleBlur = () => {
        userSelectInputRef.current && userSelectInputRef.current.blur();
    };
    return (
        <Fade in={true} timeout={700}>
            <section className="Users" aria-label="Users" onMouseEnter={handleHover} onMouseLeave={handleBlur}>
                <UserSelectInput changeHandler={setInputContent} userSelectInputRef={userSelectInputRef} />
                {selectedUsers.map(user => (
                    <User user={user} isActive={user.id === activeUser} clickHandler={setActiveUser} key={uuid()} />
                ))}
            </section>
        </Fade>
    );
};

const mapStateToProps = (state: RootState) => ({
    users: state.users.users,
    messages: state.messages.messages,
});

export default connect(mapStateToProps, {})(Users);
