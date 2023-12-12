import { createReducer } from "@reduxjs/toolkit";

import { Messages } from "types";
import { addMessage } from "../actionCreators";

const initialState = {
    messages: [] as Messages,
};

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
