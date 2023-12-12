import React from "react";

import { useEffect, useRef, Suspense } from "react";
import { connect } from "react-redux";

import thunkFetchUsers from "reduxware/thunks/fetchUsersThunk";

import { RootState, UserDetails } from "types";
import { Navigation, Loader, ErrorMessage, Users, Chat, Header } from "components";
import { useHandleConnectionStatus } from "hooks";

import "./_App.scss";
import { AppDispatch } from "../AppProvider";

const Details = React.lazy(() => import("components/Details/Details"));

interface Props {
    fetchUsers: () => void;
    isLoading: boolean;
    isError: boolean;
    activeUser: UserDetails;
}

function _App(props: Props) {
    const { fetchUsers, isError, isLoading } = props;
    useHandleConnectionStatus();
    const ref = useRef<HTMLElement>(null);

    const resizeMain = () => {
        ref.current && ref.current.classList.add("triple");
    };

    useEffect(() => {
        fetchUsers();
        document.documentElement.style.setProperty(
            "--scrollbar-width",
            window.innerWidth - document.documentElement.offsetWidth + "px"
        );
    }, [fetchUsers]);

    return (
        <div className="App">
            <Header />
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

const mapStateToProps = (state: RootState) => ({
    isLoading: state.fetch.isLoading,
    isError: state.fetch.isError,
    activeUser: state.users.activeUser,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    fetchUsers: () => dispatch(thunkFetchUsers()),
});

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
