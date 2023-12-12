import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { startLoading, completeLoading, showError, storeUsers } from "../actionCreators";
import { createUserData } from "functions";
import { RootState } from "types";

const USERS_URL = "https://randomuser.me/api/?results=10";

const thunkFetchUsers = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        dispatch(startLoading());
        fetch(USERS_URL)
            .then(res => res.json())
            .then(json => {
                console.log(json);
                dispatch(completeLoading());
                if (json) {
                    try {
                        if (json.error) {
                            dispatch(
                                showError({
                                    isError: true,
                                    errorMessage: json.error,
                                })
                            );
                        } else {
                            const result = createUserData(json.results);
                            dispatch(storeUsers(result));
                        }
                    } catch (error) {
                        dispatch(
                            showError({
                                isError: true,
                                errorMessage: "Malformed data received",
                            })
                        );
                    }
                } else {
                    dispatch(
                        showError({
                            isError: true,
                            errorMessage: "No valid data received from " + USERS_URL,
                        })
                    );
                }
            })
            .catch(error => {
                const result = {
                    isError: true,
                    errorMessage: error.message,
                };
                dispatch(showError(result));
            });
    };
};

export default thunkFetchUsers;
