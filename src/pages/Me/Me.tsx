import React from "react";
import {useNavigate} from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import Avatar from "../../components/main/Avatar/Avatar";

import "./Me.sass";

export default function MePage() {

  const navigate = useNavigate();

  // Render
  return (
    <div className="MePage">

      <Avatar color={0} firstName="A" size={100} />
      <div className="names">Alex Congritta</div>

      <form onSubmit={(e) => {e.preventDefault();}}>
        <div className="field-wrapper">
          <div className="label">Edit names</div>
          <div className="field-wrapper">
            <input type="text" placeholder="John..." defaultValue="Alex" />
            <input type="text" placeholder="Doe..." defaultValue="Congritta" />
          </div>
        </div>

        <div className="field-wrapper">
          <div className="label">Your username:</div>

          <div className="field-wrapper _iconed-left">
            <Icon icon="mailat-1" />
            <input type="text" placeholder="myUsername..." defaultValue="congritta" />
          </div>
        </div>
      </form>

      <hr />

      <div className="field-wrapper">
        <button className="_zeroed" onClick={() => navigate("/signIn")}>Sign Out</button>
      </div>
    </div>
  );
}
