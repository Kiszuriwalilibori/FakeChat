import thunk from "redux-thunk";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import fetchReducer from "reduxware/reducers/fetchReducer";
import usersReducer from "reduxware/reducers/usersReducer";
import messagesReducer from "reduxware/reducers/messageReducer";
import React, { ReactNode } from "react";

const rootReducer = combineReducers({
    fetch: fetchReducer,
    users: usersReducer,
    messages: messagesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
