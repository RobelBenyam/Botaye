import { Tenant } from '../types';
import { mockTenants } from '../data/mockData';

export interface TenantsRepository {
  list(): Promise<Tenant[]>;
  // Future: create(data: Partial<Tenant>): Promise<Tenant>;
  // Future: update(id: string, data: Partial<Tenant>): Promise<Tenant>;
  // Future: delete(id: string): Promise<void>;
}

export const mockTenantsRepository: TenantsRepository = {
  async list(): Promise<Tenant[]> {
    // Simulate latency so loading states are visible in UI
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockTenants;
  },
}; 