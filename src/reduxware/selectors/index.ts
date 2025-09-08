import { RootState } from "types";

/**
 * Creates a selector that gets a user's personality by their ID
 * @param userId - The ID of the user
 * @returns A selector function that takes the Redux state and returns the user's personality
 */
export const selectUserPersonalityById = (userId: string) => (state: RootState): string | undefined => {
    const user = state.users.users.find(user => user.id === userId);
    return user?.personality;
};
