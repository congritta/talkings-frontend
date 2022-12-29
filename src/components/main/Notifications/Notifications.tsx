import Icon from "../../Icon/Icon";
import React, {createRef, useEffect, useRef} from "react";

import "./Notifications.sass";
import {useAppSelector} from "../../../store/hooks";
import {getNotifications} from "../../../store/reducers/notifications";
import {deleteNotification} from "../../../helpers/notifications";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import classNames from "classnames";

const revealDuration = 320;

export default function Notifications() {

  const notifications = useAppSelector(getNotifications).map((notification) => ({
    ...notification,
    nodeRef: createRef<any>()
  }));
  const notificationsAmount = useRef<number>(0);

  // Scroll down on each notification
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(notificationsRef.current && notificationsAmount.current < notifications.length) {
      notificationsRef.current.scrollTo({top: notificationsRef.current.scrollHeight, behavior: "smooth"});
    }

    notificationsAmount.current = notifications.length;
  }, [notifications]);

  // Render
  return (
    <div ref={notificationsRef} className={classNames("Notifications", {
      _padded: !!notifications.length
    })} style={{
      "--animate-duration": `${revealDuration}ms`,
    } as any}>
      <TransitionGroup>
        {notifications.map((notification) => (
          <CSSTransition nodeRef={notification.nodeRef} key={notification.id} timeout={revealDuration} classNames={{
            enter: "animate__animated",
            enterActive: "animate__fadeInUp",
            exit: "animate__animated",
            exitActive: "animate__fadeOutDown"
          }}>
            <div ref={notification.nodeRef} className="notification" onClick={() => deleteNotification(notification.id)}>
              <div className="badge">
                <Icon icon={notification.status === "info" ? "info-lined" : notification.status === "success" ? "check-mark-circle-lined" : "error-lined"} />
              </div>
              <div className="data">
                <div className="title">{notification.title}</div>
                {notification.description ? (
                  <div className="description">
                    {notification.description}
                  </div>
                ) : null}
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
