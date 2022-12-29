import React, {useCallback, useEffect, useState} from "react";

import "./ChatsPage.sass";
import Avatar from "../../components/main/Avatar/Avatar";
import {randomNumber} from "../../helpers/misc";
import {DateTime} from "luxon";
import Icon from "../../components/Icon/Icon";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import UserModel from "../../models/User";
import Loader from "../../components/Loader/Loader";
import MessageModel from "../../models/Message";
import onError from "../../helpers/onError";
import ChatModel from "../../models/Chat";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getMessages, getUsers, setMessages, setUsers} from "../../store/reducers/common";

function ChatItem(props: {
  chat: ChatModel;
}) {

  const navigate = useNavigate();

  return (
    <div className="ChatItem" onClick={() => navigate(`/chat?id=${props.chat.id}`)}>
      <Avatar color={props.chat.peerUser.color} firstName={props.chat.peerUser.firstName} size={50} />

      <div className="chat-data">
        <div className="name-wrapper">
          <span className="text-nowrap">{props.chat.peerUser.firstName} {props.chat.peerUser.lastName}</span>

          <div className="last-message-data">
            <span>{DateTime.fromISO(props.chat.lastMessage.createdAt).toRelative()}</span>
            <Icon icon={props.chat.lastMessage.read ? "check-mark-17" : "check-mark-18"} />
          </div>
        </div>
        <div className="text-nowrap message">{props.chat.lastMessage.text}</div>
      </div>
    </div>
  );
}

let chatsUpdateTimeout: ReturnType<typeof setTimeout> | null = null;
export default function ChatsPage() {

  const dispatch = useAppDispatch();
  const $users = useAppSelector(getUsers);
  const $messages = useAppSelector(getMessages);

  const [searchQuery, setSearchQuery] = useState("");
  const [loadChatsPending, setLoadChatsPending] = useState(true);
  const [chats, setChats] = useState<ChatModel[]>([]);

  const loadChats = useCallback(async() => {
    const fetchChats = (users: UserModel[], messages: MessageModel[]) => {

      const _messages: MessageModel[] = messages.map((message) => ({
        ...message,
        createdAt: message.createdAt ?? DateTime.now().minus({seconds: randomNumber(1, 1000)}).toISO(),
        read: true
      }));

      dispatch(setUsers(users));
      dispatch(setMessages(_messages));

      setChats(users.map((user) => ({
        id: user.id,
        peerUser: user,
        lastMessage: _messages.filter((message) => message.peerId === user.id).slice(-1)[0]
      })));
    };

    if(!$users.length || !$messages.length) {

      const {data: users} = await axios.get<UserModel[]>("/mockJson/users.json");
      const {data: messages} = await axios.get<MessageModel[]>("/mockJson/messages.json");

      fetchChats(users, messages);
    }
    else {
      fetchChats($users, $messages);
    }
  }, [$messages, $users, dispatch])

  // Chats searching
  useEffect(() => {

    if(chatsUpdateTimeout) {
      clearTimeout(chatsUpdateTimeout);
    }

    setLoadChatsPending(true);
    chatsUpdateTimeout = setTimeout(() => {
      loadChats().then(() => {
        setLoadChatsPending(false);
      }).catch(onError);
    }, 500);
  }, [searchQuery, loadChats]);

  // Render
  return (
    <div className="ChatsPage">

      <h1>Chats</h1>

      <div style={{marginTop: 20}}>
        <input type="text" placeholder="Search..." onChange={({target: {value}}) => setSearchQuery(value)} />
      </div>

      {!loadChatsPending ? (
        <div className="chats-list">
          {chats.filter((chat) => !searchQuery ? true : (chat.peerUser.firstName.match(new RegExp(searchQuery, "gi")) || chat.peerUser.lastName.match(new RegExp(searchQuery, "gi")))).sort((chat, previousChat) => DateTime.fromISO(previousChat.lastMessage.createdAt).toUnixInteger() - DateTime.fromISO(chat.lastMessage.createdAt).toUnixInteger()).map((chat, i) => (
            <ChatItem key={i} chat={chat} />
          ))}
        </div>
      ) : (
        <div className="loader-wrapper">
          <Loader color="#000" size={30} width={3} spinsPerSecond={1.5} />
        </div>
      )}
    </div>
  );
}
