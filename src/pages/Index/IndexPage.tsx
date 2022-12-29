import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function IndexPage() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/chats");
  }, [navigate]);

  // Render
  return (
    <div className="IndexPage">
      Redirecting...
    </div>
  );
}
