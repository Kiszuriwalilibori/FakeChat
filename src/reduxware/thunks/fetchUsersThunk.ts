import axios from "axios";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import { startLoading, completeLoading, showError, storeUsers } from "../actionCreators";
import { createUserData } from "functions";
import { Response, RootState, UserDetails } from "types";


const USERS_URL = process.env.REACT_APP_API_URL || "https://randomuser.me/api/";
const USERS_ENDPOINT = `${USERS_URL}?results=10`;

interface ApiError {
    status: number;
    message: string;
    details?: unknown;
}


function isApiError(error: unknown): error is ApiError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        'message' in error
    );
}


function isValidApiResponse(data: unknown): data is { results: unknown[] } {
    return (
        typeof data === 'object' &&
        data !== null &&
        'results' in data &&
        Array.isArray((data as { results: unknown[] }).results)
    );
}

const thunkFetchUsers = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        dispatch(startLoading());

        try {
            const response = await axios.get<Response>(USERS_ENDPOINT, {
                timeout: 10000, 
                validateStatus: (status) => status >= 200 && status < 400
            });

            if (!isValidApiResponse(response.data)) {
                throw new Error('Invalid API response structure');
            }

            const users = createUserData(response.data.results);
            
            if (!Array.isArray(users)) {
                throw new Error('Failed to process user data');
            }

            dispatch(storeUsers(users as UserDetails[]));
        } catch (error: unknown) {
            let errorMessage = 'An unknown error occurred';
            
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    errorMessage = `Request failed with status ${error.response.status}`;
                } else if (error.request) {
                    errorMessage = 'No response received from server';
                } else {
                    errorMessage = `Request setup error: ${error.message}`;
                }
            } else if (error instanceof Error) { 
                errorMessage = error.message;
            } else if (isApiError(error)) {
                errorMessage = error.message;
            }

            dispatch(showError({
                isError: true,
                errorMessage: `Failed to fetch users: ${errorMessage}`
            }));
            
            if (process.env.NODE_ENV === 'development') {
                console.error('Error in thunkFetchUsers:', error);
            }
        } finally {
            dispatch(completeLoading());
        }
    };
};

export default thunkFetchUsers;
