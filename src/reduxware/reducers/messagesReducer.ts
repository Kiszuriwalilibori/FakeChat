import { createReducer} from "@reduxjs/toolkit";
import { MessageArray} from "types";
import { addMessage } from "../actionCreators";

const initialState: {messages: MessageArray} = {
    messages: [],
};

const messagesReducer = createReducer(initialState, builder => {
    builder.addCase(addMessage, (state, action) => {
        if (action.payload) {
            const messages = [...state.messages];
            messages.push(action.payload);
            state.messages = messages;
        }
    });
});

export default messagesReducer;



