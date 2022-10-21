import { useEffect, useState } from "react";
import { connect } from "react-redux";

import uuid from "react-uuid";

import User from "./UserDetails";
import Input from "./Input";

import { RootStateType, UsersData, Messages } from "types/types";
import { useDispatchAction } from "hooks";

import "./_Users.scss";

interface Props {
    users: UsersData;
    messages: Messages;
}
const Users = (props: Props) => {
    const { users /*, messages*/ } = props;
    const [activeUser, setActiveUser] = useState<string>("");
    const [pattern, setPattern] = useState<string>("");

    const setFilter = (value: string) => {
        setPattern(value);
    };
    const { setActiveUserDetails } = useDispatchAction();

    const activeUserSetter = (x: string) => setActiveUser(x);

    useEffect(() => {
        const active = users.find(obj => {
            return obj.id === activeUser;
        });
        active && setActiveUserDetails(active);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeUser, users]);

    const orderedPersons = users
        .filter(person => {
            return (
                person.name.first.toLowerCase().includes(pattern.toLowerCase()) ||
                person.name.last.toLowerCase().includes(pattern.toLowerCase())
            );
        })
        .sort((a, b) => {
            return a.isFavorite === true ? -1 : 1;
        });

    return (
        <section className="Users">
            <Input changeHandler={setFilter} />
            {orderedPersons.map(item => (
                <User user={item} isActive={item.id === activeUser} clickHandle={activeUserSetter} key={uuid()} />
            ))}
        </section>
    );
};

const mapStateToProps = (state: RootStateType) => ({
    users: state.users.users,
    messages: state.messages.messages,
});

export default connect(mapStateToProps, {})(Users);
