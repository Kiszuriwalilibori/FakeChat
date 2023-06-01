import { useEffect, useRef } from "react";
import React, { Suspense } from "react";
import { connect } from "react-redux";

import thunkFetchUsers from "reduxware/thunks/fetchUsersThunk";

import { RootStateType, UserDetails } from "types";
import { Navigation, Loader, ErrorMessage, Users, Chat } from "components";
import "./_App.scss";

const Details = React.lazy(() => import("components/Details/Details"));

interface Props {
    fetchUsers: Function;
    isLoading: boolean;
    isError: boolean;
    activeUser: UserDetails;
}

function _App(props: Props) {
    const { fetchUsers, isError, isLoading } = props;

    const ref = useRef<HTMLElement>(null);

    const resizeMain = () => {
        ref.current && ref.current.classList.add("triple");
    };

    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <Navigation />
            <main className="main" ref={ref}>
                <Users resizeMain={resizeMain} />
                <Chat />
                <Suspense fallback={<div></div>}>
                    <Details />
                </Suspense>

                {isLoading && <Loader />}
                {isError && <ErrorMessage />}
            </main>
        </div>
    );
}

const mapStateToProps = (state: RootStateType) => ({
    isLoading: state.fetch.isLoading,
    isError: state.fetch.isError,
    activeUser: state.users.activeUser,
});

const mapDispatchToProps = (dispatch: Function) => ({
    fetchUsers: () => dispatch(thunkFetchUsers()),
});

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
