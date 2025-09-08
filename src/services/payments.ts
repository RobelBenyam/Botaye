import { User } from "../context/AuthContext";
import { Payment } from "../types";
import { createDocument, readAllDocuments } from "../utils/db";

export interface PaymentsRepository {
  list(): Promise<Payment[]>;
  create(payment: Payment): Promise<void>;
}

export const mockPaymentsRepository: PaymentsRepository = {
  async list(): Promise<Payment[]> {
    try {
      const fetchedPayments = await readAllDocuments("payments");

      const userString = localStorage.getItem("auth.user");
      const currentUser: User | null = userString
        ? (JSON.parse(userString) as User)
        : null;
      console.log("Current User:", currentUser);
      if (currentUser?.role === "property_manager") {
        const userPayments = (fetchedPayments as Payment[]).filter(
          (p) =>
            p.propertyId &&
            currentUser.assignedProperties?.includes(p.propertyId)
        );
        console.log("Filtered Payments for Property Manager:", userPayments);
        return userPayments;
      }
      console.log("all payments", fetchedPayments);
      if (fetchedPayments) {
        return fetchedPayments as Payment[];
      }
      return [];
    } catch {
      // return mockPayments;
    }
    return [];
  },
  async create(payment: Payment) {
    try {
      const newPayment = await createDocument("payments", payment);
      console.log("created payment", newPayment);
      // return newPayment;
    } catch {}
  },
};
