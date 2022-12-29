export default interface UserModel {
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  avatarUrl?: string,
  color: 0 | 1 | 2 | 3 | 4;
}
