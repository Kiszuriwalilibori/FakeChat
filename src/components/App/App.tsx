import { useEffect } from "react";
import React, { Suspense } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";

import thunkFetchUsers from "reduxware/thunks/fetchUsersThunk";

import { RootStateType, UserDetails } from "types";
import { Navigation, Loader, ErrorMessage, /*Details,*/ Chat } from "components";
import "./_App.scss";

const Users = React.lazy(() => import("components/Users/Users"));

const Details = React.lazy(() => import("components/Details/Details"));

interface Props {
    fetchUsers: Function;
    isLoading: boolean;
    isError: boolean;
    activeUser: UserDetails;
}

function _App(props: Props) {
    const { fetchUsers, isError, isLoading, activeUser } = props;
    useEffect(() => {
        fetchUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <Navigation />
            <Suspense fallback={<div></div>}>
                <Users />
            </Suspense>
            {!isEmpty(activeUser) && <Chat />}
            <Suspense fallback={<div></div>}>
                <Details />
            </Suspense>

            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
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
