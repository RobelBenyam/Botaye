import { useQuery } from '@tanstack/react-query';
import { Payment } from '../types';
import { mockPaymentsRepository } from '../services/payments';

export const paymentsQueryKeys = {
  all: ['payments'] as const,
};

export function usePayments() {
  return useQuery<Payment[]>({
    queryKey: paymentsQueryKeys.all,
    queryFn: () => mockPaymentsRepository.list(),
  });
} 