import React from "react";
import uuid from "react-uuid";

import menuItems from "./config";
import NavigationItem from "./Navigation_Item";

import "./_Navigation.scss";

const Navigation = () => {
    return (
        <menu className="Navigation">
            {menuItems.map(item => (
                <NavigationItem menuItem={item} key={uuid()} />
            ))}
        </menu>
    );
};

export default React.memo(Navigation);