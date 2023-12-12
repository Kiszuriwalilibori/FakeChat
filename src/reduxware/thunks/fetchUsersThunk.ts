import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { startLoading, completeLoading, showError, storeUsers } from "../actionCreators";
import { createPersonsData } from "functions";
import { RootState } from "types";

const thunkFetchUsers = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        const path = "https://randomuser.me/api/?results=10";
        dispatch(startLoading());
        fetch(path)
            .then(res => res.json())
            .then(json => {
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
                            const result = createPersonsData(json.results);
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
                            errorMessage: "No valid data received from " + path,
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
