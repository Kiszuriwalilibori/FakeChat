import React from "react";

import { useEffect, Suspense } from "react";
import { connect } from "react-redux";

import thunkFetchUsers from "reduxware/thunks/fetchUsersThunk";

import { RootState, UserDetails } from "types";
import { Navigation, Loader, ErrorMessage, Users, Chat, Header } from "components";
import { useDelayedCondition, useHandleConnectionStatus, useResizeChat, useSetScrollBarWidthOnResize } from "hooks";
import { AppDispatch } from "../AppProvider";

import "./_App.scss";

import Details from "components/DetailsNotebook/Details";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NOTEBOOK_MEDIA_QUERY } from "components/DetailsNotebook/assets";

interface Props {
    fetchUsers: () => void;
    isLoading: boolean;
    isError: boolean;
    activeUser: UserDetails;
}

function App(props: Props) {
    const { fetchUsers, isError, isLoading } = props;
    const shouldRenderLoader = useDelayedCondition(isLoading);
    const isNotebook = useMediaQuery(NOTEBOOK_MEDIA_QUERY);
    useHandleConnectionStatus();
    const { refChat, resizeChat } = useResizeChat();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useSetScrollBarWidthOnResize();

    return (
        <center>
            <div className="App">
                <Header />
                <Navigation />
                {isNotebook && <Details variant={"notebook"} />}
                <main className="main" ref={refChat}>
                    <Users handleUserSelected={resizeChat} />
                    <Chat />
                    {!isNotebook && (
                        <Suspense fallback={<div></div>}>
                            <Details variant={"not-notebook"} />
                        </Suspense>
                    )}

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
