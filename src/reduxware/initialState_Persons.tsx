import { UsersData, UserDetails } from "types/types";

const initialState = {
    users: [] as UsersData,
    activeUser: {} as UserDetails,
    activeUserId: "",
};

export default initialState;
