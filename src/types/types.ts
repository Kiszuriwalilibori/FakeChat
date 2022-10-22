import { RootStateType } from "components/AppProvider";

type Icons = "chat" | "edit" | "home" | "person" | "cards" | "settings";
interface MenuConfigItem {
    icon: Icons;
    isActive: boolean;
}

type MenuConfig = MenuConfigItem[];

interface UserDetails {
    name: { first: string; last: string };
    location: { city: string; country: string };
    phone: string;
    dob: string;
    nat: string;
    picture: { large: string; medium: string; thumbnail: string };
    isFavorite: boolean;
    id: string;
    social: { facebook: string; linkedin: string; twitter: string };
    isOnline: boolean;
    lastMessage?: LastMessage;
}

type UsersData = UserDetails[];

type Files = { fileName: string; href: string }[];

interface LastMessage {
    text: string;
    timestamp: number;
}

// interface UpdateLastMessage {
//     id: string;
//     message: string;
// }

interface UpdateLastMessage {
    id: string;
    lastMessage: LastMessage;
}

interface Message extends LastMessage {
    sender: string;
    addressee: string;
}

type Messages = Message[];

export type {
    RootStateType,
    MenuConfig,
    MenuConfigItem,
    Icons,
    UsersData,
    UserDetails,
    Files,
    Message,
    Messages,
    UpdateLastMessage,
};
