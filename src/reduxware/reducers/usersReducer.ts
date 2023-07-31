import { createReducer } from "@reduxjs/toolkit";

import initialState from "../initialState_Persons";

import {
    storeUsers,
    setActiveUserDetails,
    toggleFavorite,
    setOnlineTrue,
    setOnlineFalse,
    updateLastMessage,
} from "../actionCreators";

const usersReducer = createReducer(initialState, builder => {
    builder
        .addCase(storeUsers, (state, action) => {
            if (action.payload) {
                state.users = action.payload;
            }
        })
        .addCase(setActiveUserDetails, (state, action) => {
            if (action.payload) {
                state.activeUser = action.payload;
            }
        })
        .addCase(toggleFavorite, (state, action) => {
            if (action.payload) {
                const favoriteIndex = state.users.findIndex(user => {
                    return user.id === action.payload;
                });
                state.users[favoriteIndex].isFavorite = !state.users[favoriteIndex].isFavorite;
            }
        })
        .addCase(setOnlineTrue, (state, action) => {
            if (action.payload) {
                const onlineIndex = state.users.findIndex(user => {
                    return user.id === action.payload;
                });
                if (state.users[onlineIndex].isOnline === false) state.users[onlineIndex].isOnline = true;
            }
        })
        .addCase(setOnlineFalse, (state, action) => {
            if (action.payload) {
                const onlineIndex = state.users.findIndex(user => {
                    return user.id === action.payload;
                });
                state.users[onlineIndex].isOnline = false;
            }
        })
        .addCase(updateLastMessage, (state, action) => {
            if (action.payload) {
                const updateIndex = state.users.findIndex(user => {
                    return user.id === action.payload.id;
                });
                state.users[updateIndex].lastMessage = action.payload.lastMessage;
            }
        });
});

export default usersReducer;
