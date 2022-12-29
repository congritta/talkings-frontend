export default interface NotificationModel {
  id: string,
  title: string,
  description?: string,
  status: "info" | "success" | "warn" | "error",
  expireDate: string; // important to be a string
}
