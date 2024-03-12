import Fade from "@mui/material/Fade";
import uuid from "react-uuid";

import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";

import { User, UserSelectInput } from "./components";
import { RootState, Messages, UserDetails } from "types";
import { useDispatchAction } from "hooks";
import { getSelectedUsers } from "functions";

import "./styles/_Users.scss";

interface Props {
    users: UserDetails[];
    messages: Messages;
    handleUserSelected: () => void;
}
const Users = (props: Props) => {
    const { users, handleUserSelected } = props;
    const [activeUser, setActiveUser] = useState<string>("");
    const [pattern, setPattern] = useState<string>("");
    const { setActiveUserDetails } = useDispatchAction();

    const setFilter = useCallback((value: string) => {
        setPattern(value);
    }, []);

    const activeUserSetter = useCallback((userId: string) => setActiveUser(userId), []);

    useEffect(() => {
        const active = users.find(obj => {
            return obj.id === activeUser;
        });
        active && setActiveUserDetails(active);
        activeUser && handleUserSelected();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeUser, users]);

    const selectedUsers = getSelectedUsers(users, pattern);

    return (
        <Fade in={true} timeout={700}>
            <section className="Users" aria-label="Users">
                <UserSelectInput changeHandler={setFilter} />
                {selectedUsers.map(user => (
                    <User user={user} isActive={user.id === activeUser} clickHandler={activeUserSetter} key={uuid()} />
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
