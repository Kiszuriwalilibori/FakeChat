import { createReducer, createSelector } from "@reduxjs/toolkit";
import { MessageBodyArray, RootState } from "types";
import { addMessageBody } from "../actionCreators";

// State type
type MessageBodyState = {
    messageBodies: MessageBodyArray;
};

const initialState: MessageBodyState = {
    messageBodies: [],
};

// Reducer
const messageBodyReducer = createReducer(initialState, builder => {
    builder.addCase(addMessageBody, (state, action) => {
        if (action.payload) {
            const messageBodies = [...state.messageBodies];
            messageBodies.push(action.payload);
            state.messageBodies = messageBodies;
        }
    });
});

// Selectors
const selectMessageBodiesState = (state: RootState) => state.messageBodies;

// Get all message bodies
export const selectAllMessageBodies = createSelector(
    [selectMessageBodiesState],
    (messageBodiesState) => messageBodiesState.messageBodies
);

// Get message bodies by role
export const selectMessageBodiesByRole = (role: 'assistant' | 'user' | 'system') => 
    createSelector(
        [selectAllMessageBodies],
        (messageBodies) => messageBodies.filter(msg => msg.role === role)
    );

// Get message bodies by user ID
export const selectMessageBodiesByUserId = (userId: string) =>
    createSelector(
        [selectAllMessageBodies],
        (messageBodies) => messageBodies.filter(msg => msg.userId === userId)
    );

// Get message bodies by multiple user IDs
export const selectMessageBodiesByUserIds = (userIds: string[]) =>
    createSelector(
        [selectAllMessageBodies],
        (messageBodies) => messageBodies.filter(msg => userIds.includes(msg.userId))
    );

// Get message bodies by role and user ID
export const selectMessageBodiesByRoleAndUserId = (role: 'assistant' | 'user' | 'system', userId: string) =>
    createSelector(
        [selectAllMessageBodies],
        (messageBodies) => messageBodies.filter(msg => msg.role === role && msg.userId === userId)
    );

// Get the last message body
export const selectLastMessageBody = createSelector(
    [selectAllMessageBodies],
    (messageBodies) => messageBodies[messageBodies.length - 1]
);

// Get the last message body by user ID
export const selectLastMessageBodyByUserId = (userId: string) =>
    createSelector(
        [selectMessageBodiesByUserId(userId)],
        (userMessages) => userMessages[userMessages.length - 1]
    );

// Get total count of message bodies
export const selectMessageBodiesCount = createSelector(
    [selectAllMessageBodies],
    (messageBodies) => messageBodies.length
);

// Get count of message bodies by user ID
export const selectMessageBodiesCountByUserId = (userId: string) =>
    createSelector(
        [selectMessageBodiesByUserId(userId)],
        (userMessages) => userMessages.length
    );

export default messageBodyReducer;






// import { addMessageBody } from 'reduxware/actionCreators';
// import { useDispatch } from 'react-redux';

// // In your component:
// const dispatch = useDispatch();

// // To add a new message body:
// dispatch(addMessageBody({
//     role: 'user', // or 'assistant' or 'system'
//     content: 'Your message here'
// }));

// // To access message bodies in your component:
// const messageBodies = useSelector((state: RootState) => state.messageBodies.messageBodies);
// import { 
//   selectAllMessageBodies, 
//   selectMessageBodiesByRole,
//   selectLastMessageBody,
//   selectMessageBodiesCount
// } from 'reduxware/reducers/messageBodyReducer';

// // In your component:
// const allMessages = useSelector(selectAllMessageBodies);
// const userMessages = useSelector(selectMessageBodiesByRole('user'));
// const lastMessage = useSelector(selectLastMessageBody);
// const messageCount = useSelector(selectMessageBodiesCount);