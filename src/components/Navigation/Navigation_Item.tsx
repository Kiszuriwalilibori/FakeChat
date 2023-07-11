import uuid from "react-uuid";

import { MouseEventHandler } from "react";

import { MenuConfigItem } from "types/types";

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

    return (
        <div
            className={menuItem.isActive ? "Navigation__item active" : "Navigation__item"}
            onClick={menuItem.isActive ? clickHandler : undefined}
            key={uuid()}
        >
            <img src={source} alt={menuItem.icon} />
        </div> // todo to jednak powinien być mui button bo tracimy WCAG
    );
};

export default NavigationItem;
