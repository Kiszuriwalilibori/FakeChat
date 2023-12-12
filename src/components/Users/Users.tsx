import Fade from "@mui/material/Fade";
import uuid from "react-uuid";

import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";

import { User, UserSelectInput } from "./components";
import { RootState, Messages, UserDetails } from "types";
import { useDispatchAction } from "hooks";

import "./styles/_Users.scss";

interface Props {
    users: UserDetails[];
    messages: Messages;
    resizeMain: () => void;
}
const Users = (props: Props) => {
    const { users, resizeMain } = props;
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
        activeUser && resizeMain();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeUser, users]);

    const sortedUsers = users
        .filter(person => {
            return (
                person.name.firstName.toLowerCase().includes(pattern.toLowerCase()) ||
                person.name.lastName.toLowerCase().includes(pattern.toLowerCase())
            );
        })
        .sort((a, b) => {
            return a.name.lastName > b.name.lastName ? -1 : 1;
        })
        .sort((a, b) => {
            return a.isFavorite === true ? -1 : 1;
        });

    return (
        <Fade in={true} timeout={700}>
            <section className="Users" aria-label="Users">
                <UserSelectInput changeHandler={setFilter} />
                {sortedUsers.map(item => (
                    <User user={item} isActive={item.id === activeUser} clickHandler={activeUserSetter} key={uuid()} />
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
