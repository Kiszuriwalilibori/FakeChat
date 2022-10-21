import { createReducer } from "@reduxjs/toolkit";

import initialState from "../initialState_Messages";

import { addMessage } from "../actionCreators";

const usersReducer = createReducer(initialState, builder => {
    builder.addCase(addMessage, (state, action) => {
        if (action.payload) {
            const messages = [...state.messages];
            messages.push(action.payload);
            state.messages = messages;
        }
    });
});

export default usersReducer;
