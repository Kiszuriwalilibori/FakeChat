import axios, { AxiosError } from "axios";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { startLoading, completeLoading, showError, storeUsers } from "../actionCreators";
import { createUserData } from "functions";
import { Response, RootState } from "types";

const USERS_URL = "https://randomuser.me/api/?results=10";

const thunkFetchUsers = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async dispatch => {
        dispatch(startLoading());

        const handleError = (error: unknown) => {
            let result = {
                isError: true,
                errorMessage: "",
            };
            if (axios.isAxiosError(error)) {
                result.errorMessage = (error as AxiosError).message;
            } else {
                result.errorMessage = JSON.stringify(error);
            }
            dispatch(showError(result));
            dispatch(completeLoading());
        };

        axios.get<Response>(USERS_URL).then(
            response => {
                dispatch(completeLoading());
                const data = response.data;
                if (data) {
                    try {
                        if (data.error) {
                            handleError(data.error);
                        } else {
                            const result = createUserData(data.results);
                            dispatch(storeUsers(result));
                        }
                    } catch (error) {
                        handleError("Malformed data received from " + USERS_URL);
                    }
                } else {
                    handleError("No valid data received from " + USERS_URL);
                }
            },

            error => handleError(error)
        );
    };
};

export default thunkFetchUsers;
