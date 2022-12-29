import axios from "axios";
import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import Loader from "../../components/Loader/Loader";

import UserInfo from "../../components/main/UserInfo/UserInfo";
import useQuery from "../../helpers/hooks/useQuery";
import {asyncSleep, randomNumber} from "../../helpers/misc";
import UserModel from "../../models/User";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getUsers, setUsers} from "../../store/reducers/common";

export default function UserPage() {

  const navigate = useNavigate();
  const query = useQuery();

  const $users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();

  // Load user info
  const [currentUser, setCurrentUser] = useState<UserModel>();

  const loadUserInfo = useCallback(async() => {
    await asyncSleep(randomNumber(50, 300));

    let currentUser = $users.find((user) => user.id === query.get("id"));

    if(!currentUser) {

      // Load users
      const {data: users} = await axios.get<UserModel[]>("/mockJson/users.json");
      dispatch(setUsers(users));

      // Return current User
      currentUser = users.find((user) => user.id === query.get("id"));

      if(!currentUser) {throw new Error("Cant fetch User info");}
    }

    return setCurrentUser(currentUser);
  }, [$users, dispatch, query])

  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo]);

  // Render
  return currentUser ? (
    <div className="UserPage">

      <button className="_zeroed" onClick={() => navigate(-1)}>
        <Icon icon="arrow-64" />
      </button>

      <div className="page-container" style={{padding: "50px 0"}}>
        <UserInfo user={currentUser} />
      </div>
    </div>
  ) : (
    <div className="loader-wrapper">
      <Loader color="#000" size={30} width={3} spinsPerSecond={1.5} />
    </div>
  );
}
