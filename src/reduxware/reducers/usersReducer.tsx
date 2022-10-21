import { createReducer } from "@reduxjs/toolkit";

import initialState from "../initialState_Persons";

import { storeUsers, setActiveUserDetails, markFavorite } from "../actionCreators";

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
        .addCase(markFavorite, (state, action) => {
            if (action.payload) {
                const favoriteIndex = state.users.findIndex(user => {
                    return user.id === action.payload;
                });
                state.users[favoriteIndex].isFavorite = true;
            }
        });
});

export default usersReducer;
