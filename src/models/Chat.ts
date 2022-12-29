import MessageModel from "./Message";
import UserModel from "./User";

export default interface ChatModel {
  id: string,
  peerUser: UserModel,
  lastMessage: MessageModel;
}
