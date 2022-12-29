import React from "react";

import "./SignUpPage.sass";
import Icon from "../../components/Icon/Icon";
import {useNavigate} from "react-router-dom";

export default function SignUpPage() {

  const navigate = useNavigate();

  // Render
  return (
    <div className="SignUpPage">

      <img src={require("../../images/logo.svg").default} alt="" className="logo" />

      <h1>Talkings Messenger</h1>

      <div style={{textAlign: "center"}}>
        <p>
          Welcome to <b>Talkings</b>!<br />This is private messenger made by Alex Congritta.
        </p>

        <p>
          You've entered your authentication code. It`s your account access code (like password), so keep it in secret
        </p>

        <hr />

        <p>
          <b>Now fill your account info and let`s Talking</b>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();

          navigate("/chats");
        }}
      >
        <div className="field-wrapper">
          <div className="label">Enter your full name:</div>

          <div className="field-wrapper">
            <input type="text" placeholder="John..." />
            <input type="text" placeholder="Doe..." />
          </div>
        </div>

        <div className="field-wrapper">
          <div className="label">Your username:</div>

          <div className="field-wrapper _iconed-left">
            <Icon icon="mailat-1" />
            <input type="text" placeholder="myUsername..." />
          </div>
        </div>

        <div
          className="field-wrapper"
          style={{
            marginTop: 20,
            justifyContent: "center"
          }}
        >
          <button className="_auto-width" onClick={() => navigate("/chats")}>
            <Icon icon="rocket-20" />
            <span>Let`s Talking</span>
          </button>
        </div>
      </form>
    </div>
  );
}
