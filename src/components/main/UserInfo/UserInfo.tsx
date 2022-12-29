import "./UserInfo.sass";
import Avatar from "../Avatar/Avatar";
import UserModel from "../../../models/User";
import {Link} from "react-router-dom";

export default function UserInfo(props: {
  user: UserModel;
}) {

  return (
    <div className="UserInfo">
      <Avatar color={props.user.color} firstName={props.user.firstName} size={120} />

      <div className="names">
        {props.user.firstName} {props.user.lastName}
      </div>

      <Link to={`/user/?id=${props.user.id}`}>@{props.user.username}</Link>
    </div>
  );
}
