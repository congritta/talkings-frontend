import {useCallback, useEffect, useRef, useState} from "react";

import "./ChatPage.sass";
import Avatar from "../../components/main/Avatar/Avatar";
import Icon from "../../components/Icon/Icon";
import MenuFrom from "../../components/MenuFrom/MenuFrom";

import TextareaAutosize from "react-textarea-autosize";
import {asyncSleep, randomNumber} from "../../helpers/misc";
import classNames from "classnames";
import {DateTime} from "luxon";
import {useNavigate} from "react-router-dom";
import Popup from "../../components/Popup/Popup";
import UserInfo from "../../components/main/UserInfo/UserInfo";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getMessages, getUsers, setMessages, setUsers} from "../../store/reducers/common";
import Loader from "../../components/Loader/Loader";
import UserModel from "../../models/User";
import axios from "axios";
import onError from "../../helpers/onError";
import MessageModel from "../../models/Message";
import useQuery from "../../helpers/hooks/useQuery";

function Message(props: {
  message: MessageModel;
}) {

  const [zIndex, setZIndex] = useState<number>(0)

  function setDefaultZIndex() {
    setZIndex(0)

    window.removeEventListener("click", setDefaultZIndex)
  }

  // Render
  return (
    <div
      className={classNames("Message", {
        _isMine: props.message.isMine
      })}
      onClick={() => {
        setZIndex(+(Date.now().toString().slice(-8)))

        setTimeout(() => {
          window.addEventListener("click", setDefaultZIndex)
        }, 0)
      }}
      style={{
        zIndex
      }}>

      <MenuFrom
        child={
          <div
            className="message-bubble" onContextMenu={(e) => {
              e.preventDefault();

              e.currentTarget.click();
            }}
          >
            <span>{props.message.text}</span>
            <div className="message-info">
              <span>{DateTime.fromISO(props.message.createdAt).toFormat("hh:mm")}</span>
              {props.message.isMine ? (<Icon icon={props.message.read ? "check-mark-17" : "check-mark-18"} />) : null}
            </div>
          </div>
        }
        options={[
          {
            value: "copyText", element: <button className="_zeroed">
              <Icon icon="copy-lined" />
              <span>Copy text</span>
            </button>
          },
          ...(props.message.isMine ? [{
            value: "edit", element: <button className="_zeroed">
              <Icon icon="pencil-text-filled" />
              <span>Edit message</span>
            </button>
          }] : []),
          ...(props.message.isMine ? [{
            value: "delete", element: <button className="_zeroed">
              <Icon icon="trash-can-lined" />
              <span>Delete message</span>
            </button>
          }] : []),
        ]}
      />
    </div>
  );
}

export default function ChatPage() {

  const textAreaEl = useRef<HTMLTextAreaElement>(null);
  const messagesHistoryEl = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const query = useQuery();

  const $messages = useAppSelector(getMessages);
  const $users = useAppSelector(getUsers);
  const dispatch = useAppDispatch();

  const [isUserPopupShown, setIsUserPopupShown] = useState(false);

  // Load peer info function
  const [currentPeer, setCurrentPeer] = useState<UserModel>();
  const loadPeerInfo = useCallback(async() => {
    await asyncSleep(randomNumber(50, 300));

    let currentPeer = $users.find((user) => user.id === query.get("id"));

    if(!currentPeer) {

      // Load users
      const {data: users} = await axios.get<UserModel[]>("/mockJson/users.json");
      dispatch(setUsers(users));

      // Return current peer
      currentPeer = users.find((user) => user.id === query.get("id"));

      if(!currentPeer) {throw new Error("Cant fetch peer info");}
    }

    return setCurrentPeer(currentPeer);
  }, [$users, dispatch, query]);

  // Load messages function
  const loadMessages = useCallback(async() => {
    let messages = $messages;

    if(!messages.length) {

      // Load users
      const {data: _messages} = await axios.get<MessageModel[]>("/mockJson/messages.json");
      dispatch(setMessages(_messages));

      messages = _messages.map((message) => ({
        ...message,
        createdAt: message.createdAt ?? DateTime.now().minus({seconds: randomNumber(1, 1000)}).toISO(),
        read: true
      }));
    }

    return dispatch(setMessages(messages));
  }, [$messages, dispatch]);

  // Load peer info and messages
  useEffect(() => {
    loadPeerInfo().then(() => {
      return loadMessages();
    }).then(() => {
      setTimeout(() => {
        messagesHistoryEl.current?.scrollTo({
          top: messagesHistoryEl.current.scrollHeight,
          behavior: "smooth"
        });
      }, 0);
    }).catch(onError);
  }, [loadMessages, loadPeerInfo]);

  // On messages list update
  useEffect(() => {

    if(!messagesHistoryEl.current) {return;}

    setTimeout(() => {
      messagesHistoryEl.current!.scrollTo({
        top: messagesHistoryEl.current!.scrollHeight,
        behavior: "smooth"
      });
    }, 0);
  }, [$messages, messagesHistoryEl]);

  // On new message
  const [text, setText] = useState("");
  function onNewMessageSent() {
    if(!text.trim()) {return;}

    if((randomNumber(0, 10) % 3)) {
      dispatch(setMessages($messages.concat([{
        id: (Math.random() * Date.now()).toString(16),
        createdAt: DateTime.now().toISO(),
        isMine: true,
        peerId: currentPeer!.id,
        read: true,
        text: text.trim()
      }])));
    }
    else {
      dispatch(setMessages(($messages.concat([{
        id: (Math.random() * Date.now()).toString(16),
        createdAt: DateTime.now().toISO(),
        isMine: false,
        peerId: currentPeer!.id,
        read: false,
        text: `You wrote: "${text.trim()}"`
      }]))));
    }

    setText("");
    textAreaEl.current!.focus();
  }

  // Render
  return currentPeer ? (
    <div className="ChatPage">

      <div className="chat-header">
        <button className="_zeroed" onClick={() => navigate("/chats")}>
          <Icon icon="arrow-64" />
        </button>

        <div
          className="flex _aic"
          style={{marginRight: "auto"}}
          onClick={() => setIsUserPopupShown(true)}
        >
          <Avatar color={currentPeer.color} firstName={currentPeer.firstName} size={40} />

          <div className="chat-data">
            <span>{currentPeer.firstName} {currentPeer.lastName}</span>
            <span>Online</span>
          </div>
        </div>

        <MenuFrom
          child={
            <button className="_zeroed">
              <Icon icon="menu-dot-vertical-filled" />
            </button>
          }
          options={[
            {value: "openChatProfile", element: "Chat profile"}
          ]}
          onTriggered={(value) => {
            if(value === "openChatProfile") {navigate(`/user/?id=${currentPeer.id}`);}
          }}
        />
      </div>

      <div ref={messagesHistoryEl} className="messages-history">
        {$messages.filter((message) => message.peerId === currentPeer.id).sort((message, prevMessage) => DateTime.fromISO(message.createdAt).toUnixInteger() - DateTime.fromISO(prevMessage.createdAt).toUnixInteger()).map((message, i) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <div className="chat-footer">
        <form onSubmit={(e) => {e.preventDefault(); onNewMessageSent();}}>
          <div className="field-wrapper">
            <TextareaAutosize ref={textAreaEl} className="_zeroed" placeholder="Message..." maxRows={5} value={text} onChange={({target: {value}}) => setText(value)} onKeyDown={(e) => {
              if(e.key === "Enter" && !e.shiftKey) {
                onNewMessageSent();
                e.preventDefault();
              }
            }} />
            <button className="_zeroed">
              <Icon icon="custom-send-1" />
            </button>
          </div>
        </form>
      </div>

      <Popup isShown={isUserPopupShown} onClose={() => setIsUserPopupShown(false)}>
        <div style={{padding: "50px 0"}}>
          <UserInfo user={currentPeer} />
        </div>
      </Popup>
    </div>
  ) : (
    <div className="loader-wrapper">
      <Loader color="#000" size={30} width={3} spinsPerSecond={1.5} />
    </div>
  );
}
