import { createAction } from "@reduxjs/toolkit";
import { UsersData, UserDetails, Message } from "types/types";

interface ShowError {
    isError: boolean;
    errorMessage: string;
}

export const showError = createAction<ShowError>("ERROR_SHOW");
export const clearError = createAction("ERROR_CLEAR");
export const startLoading = createAction("LOADING_START");
export const completeLoading = createAction("LOADING_COMPLETE");
export const storeUsers = createAction<UsersData>("USERS_STORE");
export const setActiveUserDetails = createAction<UserDetails>("ACTIVE_USER_DETAILS_SET");
export const setActiveUserID = createAction<string>("ACTIVE_USER_ID_SET");
export const markFavorite = createAction<string>("FAVORITE_MARK");
export const addMessage = createAction<Message>("MESSAGE_SEND");
