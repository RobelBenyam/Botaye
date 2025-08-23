import { useQuery } from '@tanstack/react-query';
import { MaintenanceRequest } from '../types';
import { mockMaintenanceRepository } from '../services/maintenance';

export const maintenanceQueryKeys = {
  all: ['maintenanceRequests'] as const,
};

export function useMaintenanceRequests() {
  return useQuery<MaintenanceRequest[]>({
    queryKey: maintenanceQueryKeys.all,
    queryFn: () => mockMaintenanceRepository.list(),
  });
} 