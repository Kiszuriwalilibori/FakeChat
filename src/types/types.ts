import {store } from "components/Common/AppProvider";

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

type Icons = "chat" | "edit" | "home" | "person" | "cards" | "settings";
interface MenuConfigItem {
    icon: Icons;
    isActive: boolean;
}

type MenuConfig = MenuConfigItem[];

export interface FetchedUser {
    name: { first: string; last: string };
    location: { city: string; country: string };
    phone: string;
    dob: { date: string; age: number };
    nat: string;
    picture: { large: string; medium: string; thumbnail: string };
    isFavorite: boolean;
    id: string;
    social: { facebook: string; linkedin: string; twitter: string };
    isOnline: boolean;
    
}



interface UserDetails extends Omit<FetchedUser, "dob"> {
    dob: string;
    personality: string;
    lastMessage?: LastMessage;
}


type Users = UserDetails[];

type Files = { fileName: string; href: string }[];

interface LastMessage {
    content: string;
    timestamp: number;
}


interface UpdateLastMessage {
    ID: string;
    lastMessage: LastMessage;
}

export type MessageRole = "assistant" | "user" | "system";

export interface Message {
    role: MessageRole;
    content: string;
    timestamp: number;
    userId: string;
}
export type MessageArray = Message[];

type Error = Pick<RootState["fetch"], "isError" | "errorMessage">;

interface Response {
    results: FetchedUser[];
    error?: { message: string };
}

export type {
    AppDispatch,
    Error,
    Files,
    Icons,
    MenuConfig,
    MenuConfigItem,
    Response,
    RootState,
    UpdateLastMessage,
    Users,
    UserDetails,
};

export type BaloonVariant = "assistant" | "user";
