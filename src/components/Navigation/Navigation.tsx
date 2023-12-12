import React from "react";
import uuid from "react-uuid";

import menuItems from "./config";
import NavigationItem from "./components/NavigationItem";

import "./styles/_Navigation.scss";

const Navigation = () => {
    const emptyFunction = () => undefined; // temporary - no actions for navigation yet
    return (
        <nav className="Navigation" aria-label="primary site navigation">
            {menuItems.map(item => (
                <NavigationItem menuItem={item} key={uuid()} clickHandler={emptyFunction} />
            ))}
        </nav>
    );
};

export default React.memo(Navigation);
