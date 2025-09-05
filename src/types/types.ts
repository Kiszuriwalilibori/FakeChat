import { RootState } from "components/Common/AppProvider";

type Icons = "chat" | "edit" | "home" | "person" | "cards" | "settings";
interface MenuConfigItem {
    icon: Icons;
    isActive: boolean;
}

type MenuConfig = MenuConfigItem[];

export interface RawUserDetails {
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
    lastMessage?: LastMessage;
}



interface UserDetails extends Omit<RawUserDetails, "dob"> {
    dob: string;
}

type Users = UserDetails[];

type Files = { fileName: string; href: string }[];

interface LastMessage {
    content: string;
    timestamp: number;
}

// interface GPTRequestBodyMessage {
//     role: "assistant" | "user" | "system";
//     content: string;
// }
// type GPTRequestBodyMessages = GPTRequestBodyMessage[];
// interface GPTRequestBody {
//     model: string;
//     messages: GPTRequestBodyMessages;
// }

interface UpdateLastMessage {
    ID: string;
    lastMessage: LastMessage;
}

export interface MessageBody {
    role: "assistant" | "user" | "system";
    content: string;
    timestamp: number;
    userId: string; // ID of the user who sent the message
}
export type MessageBodyArray = MessageBody[];

type Error = Pick<RootState["fetch"], "isError" | "errorMessage">;

interface Response {
    results: RawUserDetails[];
    error?: { message: string };
}

export type {
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
