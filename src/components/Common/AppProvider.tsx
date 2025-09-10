import React, { ReactNode } from "react";
import thunk from "redux-thunk";
import { Theme } from "@mui/material/styles";
import { ThemeProvider, StyledEngineProvider } from "@mui/material";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { register } from "../../serviceWorkerRegistration";

import fetchReducer from "reduxware/reducers/fetchReducer";
import usersReducer from "reduxware/reducers/usersReducer";
import messagesReducer from "reduxware/reducers/messagesReducer";
import theme from "../../themes/theme";
import { SnackbarProvider } from "notistack";

const rootReducer = combineReducers({
    fetch: fetchReducer,
    users: usersReducer,
    messages: messagesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

declare module "@mui/styles/defaultTheme" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme extends Theme {}
}

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                    }}
                >
                    <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </SnackbarProvider>
            </StyledEngineProvider>
        </Provider>
    );
};
register();
export default AppProvider;
export type RootState = ReturnType<typeof store.getState>;

