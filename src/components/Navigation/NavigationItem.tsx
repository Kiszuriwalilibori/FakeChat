import { FunctionComponent, MouseEventHandler, SVGProps } from "react";

import uuid from "react-uuid";

import { MenuConfigItem } from "types/types";
import Icons from "icons";

import home from "icons/home.svg";
import chat from "icons/chat.svg";
import edit from "icons/edit.svg";
import person from "icons/person.svg";
import settings from "icons/settings.svg";
import cards from "icons/cards.svg";

interface Props {
    menuItem: MenuConfigItem;
    clickHandler?: MouseEventHandler<HTMLDivElement>;
}

const NavigationItem = (props: Props) => {
    const { menuItem, clickHandler } = props;

    let source;
    switch (menuItem.icon) {
        case "home":
            source = home;
            break;
        case "chat":
            source = chat;
            break;
        case "edit":
            source = edit;
            break;
        case "person":
            source = person;
            break;
        case "settings":
            source = settings;
            break;
        case "cards":
            source = cards;
            break;
        default:
    }
    //let Node: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>;
    // switch (menuItem.icon) {
    //     case "home":
    //         Node = Icons.Home;
    //         break;
    //     case "chat":
    //         Node = Icons.Chat;
    //         break;
    //     case "edit":
    //         Node = Icons.Edit;
    //         break;
    //     case "person":
    //         Node = Icons.Person;
    //         break;
    //     case "settings":
    //         Node = Icons.Settings;
    //         break;
    //     case "cards":
    //         Node = Icons.Cards;
    //         break;
    //     default:
    // }

    return (
        <div
            className={menuItem.isActive ? "Navigation__item active" : "Navigation__item"}
            onClick={menuItem.isActive ? clickHandler : undefined}
            key={uuid()}
        >
            <img src={source} alt={menuItem.icon} />
        </div>
    );
};

export default NavigationItem;
