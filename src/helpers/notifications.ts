import NotificationModel from "../models/Notification";
import {generateHex} from "./misc";
import {getNotifications, setNotifications} from "../store/reducers/notifications";
import {store} from "../store/store";
import {DateTime} from "luxon";

export function createNotification(notification: Omit<NotificationModel, "id">): NotificationModel["id"] {

  const notifications = getNotifications(store.getState());
  let $notification: NotificationModel = {
    ...notification,
    id: generateHex(8)
  };

  // If no description
  if(!notification.description) {
    $notification = {
      ...$notification,
      title: ["info", "success"].includes(notification.status) ? "Info" : notification.status === "warn" ? "Warning" : "An error occured",
      description: notification.title
    };
  }

  store.dispatch(setNotifications([...notifications, $notification]));

  return $notification.id;
}

export function deleteNotification(id: NotificationModel["id"]) {
  const notifications = getNotifications(store.getState());
  store.dispatch(setNotifications(notifications.filter((notification) => notification.id !== id)));
}

export function clearExpiredNotifications() {

  const notifications = getNotifications(store.getState());

  store.dispatch(setNotifications(notifications.filter(
    (notification) => DateTime.now() < DateTime.fromISO(notification.expireDate)
  )));
}
