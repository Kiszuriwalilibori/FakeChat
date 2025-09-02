import { createAction } from "@reduxjs/toolkit";
import { Message, UpdateLastMessage, RootState, Error, MessageBody } from "types";

export const showError = createAction<Error>("ERROR_SHOW");
export const clearError = createAction("ERROR_CLEAR");
export const startLoading = createAction("LOADING_START");
export const completeLoading = createAction("LOADING_COMPLETE");

export const storeUsers = createAction<RootState["users"]["users"]>("USERS_STORE");
export const setActiveUserDetails = createAction<RootState["users"]["activeUser"]>("ACTIVE_USER_DETAILS_SET");
export const setActiveUserID = createAction<RootState["users"]["activeUserId"]>("ACTIVE_USER_ID_SET");
export const toggleFavorite = createAction<string>("FAVORITE_TOGGLE");
export const setOnlineTrue = createAction<string>("ONLINE_SET_TRUE");
export const setOnlineFalse = createAction<string>("ONLINE_SET_FALSE");

export const addMessage = createAction<Message>("MESSAGE_SEND");

export const updateLastMessage = createAction<UpdateLastMessage>("LAST_MESSAGE_UPDATE");

export const addMessageBody = createAction<MessageBody>("MESSAGE_BODY_ADD");
