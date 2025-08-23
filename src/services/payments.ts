import { Payment } from '../types';
import { mockPayments } from '../data/mockData';

export interface PaymentsRepository {
  list(): Promise<Payment[]>;
}

export const mockPaymentsRepository: PaymentsRepository = {
  async list(): Promise<Payment[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockPayments;
  },
}; 