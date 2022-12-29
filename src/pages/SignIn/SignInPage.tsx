import React from "react";

import "./SignInPage.sass";
import Icon from "../../components/Icon/Icon";
import {useNavigate} from "react-router-dom";

export default function SignInPage() {

  const navigate = useNavigate();

  // Render
  return (
    <div className="SignInPage">

      <img src={require("../../images/logo.svg").default} alt="" className="logo" />

      <h1>Talkings Messenger</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          navigate("/signUp");
        }}
      >
        <div className="field-wrapper">
          <div className="label">Enter your authentication code:</div>

          <div className="field-wrapper">
            <input type="text" placeholder="aaa-bbb-ccc-ddd" />
            <button className="_auto-width">
              <Icon icon="arrow-light-circle-filled" />
            </button>
          </div>
        </div>
      </form>

      <div className="info">
        <p>
          You can get authentication code directly from Alex Congritta who is main creator of Talkings Messenger.
          There is no sign up methods because this is private messenger
        </p>
      </div>
    </div>
  );
}
