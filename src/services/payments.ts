import { Payment } from "../types";
import { mockPayments } from "../data/mockData";
import { createDocument, readAllDocuments } from "../utils/db";

export interface PaymentsRepository {
  list(): Promise<Payment[]>;
  create(payment: Payment): Promise<void>;
}

export const mockPaymentsRepository: PaymentsRepository = {
  async list(): Promise<Payment[]> {
    try {
      const fetchedPayments = await readAllDocuments("payments");

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
