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
}
type UsersData = UserDetails[];

type Files = { fileName: string; href: string }[];

interface Message {
    text: string;
    timestamp: number;
    sender: string;
    addressee: string;
}
type Messages = Message[];

export type { RootStateType, MenuConfig, MenuConfigItem, Icons, UsersData, UserDetails, Files, Message, Messages };
