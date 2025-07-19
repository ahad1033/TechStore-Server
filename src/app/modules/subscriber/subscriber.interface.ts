export interface ISubscriber {
  email: string;
  status?: "pending" | "approved" | "cancelled";
}
