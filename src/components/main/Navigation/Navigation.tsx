import {NavLink} from "react-router-dom";
import React from "react";

import "./Navigation.sass";
import Icon from "../../Icon/Icon";

export default function Navigation() {

  // Render
  return (
    <div className="Navigation">
      <NavLink to="/chats">
        <Icon icon="speech-bubble-23" />
        <span>Chats</span>
      </NavLink>
      <NavLink to="/me">
        <Icon icon="user-1" />
        <span>My Account</span>
      </NavLink>
      <NavLink to="/settings">
        <Icon icon="gear-11" />
        <span>Settings</span>
      </NavLink>
    </div>
  );
}
