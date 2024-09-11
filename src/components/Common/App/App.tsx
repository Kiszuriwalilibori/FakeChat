import React from "react";

import { useEffect, Suspense } from "react";
import { connect } from "react-redux";

import thunkFetchUsers from "reduxware/thunks/fetchUsersThunk";

import { RootState, UserDetails } from "types";
import { Navigation, Loader, ErrorMessage, Users, Chat, Header } from "components";
import { useDelayedCondition, useHandleConnectionStatus, useResizeMain, useSetScrollBarWidthOnResize } from "hooks";
import { AppDispatch } from "../AppProvider";

import "./_App.scss";

import Details from "components/DetailsNotebook/Details";

interface Props {
    fetchUsers: () => void;
    isLoading: boolean;
    isError: boolean;
    activeUser: UserDetails;
}

function _App(props: Props) {
    const { fetchUsers, isError, isLoading } = props;
    const shouldRenderLoader = useDelayedCondition(isLoading);
    useHandleConnectionStatus();
    const { refMain, resizeMain } = useResizeMain();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useSetScrollBarWidthOnResize();

    return (
        <center>
            <div className="App">
                <Header />
                <Navigation />

                <Details variant={"notebook"} />
                <main className="main" ref={refMain}>
                    <Users handleUserSelected={resizeMain} />
                    <Chat />
                    <Suspense fallback={<div></div>}>
                        <Details variant={"not-notebook"} />
                    </Suspense>

                    {shouldRenderLoader && <Loader />}
                    {isError && <ErrorMessage />}
                </main>
            </div>
        </center>
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
