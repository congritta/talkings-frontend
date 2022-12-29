export default interface MessageModel {
  id: string,
  createdAt: string,
  text: string,
  read: boolean;
  peerId: string;
  isMine: boolean;
}
