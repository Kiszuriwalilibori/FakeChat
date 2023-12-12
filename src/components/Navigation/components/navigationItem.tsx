import uuid from "react-uuid";

import { MouseEventHandler } from "react";

import { MenuConfigItem } from "types";

import home from "assets/icons/home.svg";
import chat from "assets/icons/chat.svg";
import edit from "assets/icons/edit.svg";
import person from "assets/icons/person.svg";
import settings from "assets/icons/settings.svg";
import cards from "assets/icons/cards.svg";
import useDebouncedCallback from "hooks/useDebouncedCallback";

interface Props {
    menuItem: MenuConfigItem;
    clickHandler: MouseEventHandler<HTMLDivElement>;
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

    const handleClick = useDebouncedCallback(clickHandler);

    return (
        <div
            className={menuItem.isActive ? "Navigation__item active" : "Navigation__item"}
            onClick={menuItem.isActive ? handleClick : undefined}
            key={uuid()}
            role="button"
            tabIndex={0}
        >
            <img src={source} alt={menuItem.icon} />
        </div>
    );
};

export default NavigationItem;
