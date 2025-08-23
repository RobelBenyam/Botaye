import { MaintenanceRequest } from '../types';
import { mockMaintenanceRequests } from '../data/mockData';

export interface MaintenanceRepository {
  list(): Promise<MaintenanceRequest[]>;
}

export const mockMaintenanceRepository: MaintenanceRepository = {
  async list(): Promise<MaintenanceRequest[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockMaintenanceRequests;
  },
}; 