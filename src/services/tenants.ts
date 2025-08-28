import { Tenant } from "../types";
import { mockTenants } from "../data/mockData";
import { readAllDocuments, updateDocument } from "../utils/db";

export interface TenantsRepository {
  list(): Promise<Tenant[]>;
  // Future: create(data: Partial<Tenant>): Promise<Tenant>;
  update(id: string, data: Partial<Tenant>): Promise<Tenant>;
  // Future: delete(id: string): Promise<void>;
}

export const mockTenantsRepository: TenantsRepository = {
  async list(): Promise<Tenant[]> {
    // Simulate latency so loading states are visible in UI
    const allTenants = await readAllDocuments("tenants");
    console.log("all tenants", allTenants);
    const tenantsWithDates = allTenants.map((tenant: any) => ({
      ...tenant,
      createdAt: tenant.createdAt?.toDate
        ? tenant.createdAt.toDate()
        : tenant.createdAt,
      updatedAt: tenant.updatedAt?.toDate
        ? tenant.updatedAt.toDate()
        : tenant.updatedAt,
      leaseStart: tenant.leaseStart?.toDate
        ? tenant.leaseStart.toDate()
        : tenant.leaseStart,
      leaseEnd: tenant.leaseEnd?.toDate
        ? tenant.leaseEnd.toDate()
        : tenant.leaseEnd,
    }));
    console.log("all tenants with dates", tenantsWithDates);

    return tenantsWithDates as Tenant[];
  },

  async update(id: string, data: Partial<Tenant>): Promise<Tenant> {
    const tenantIndex = mockTenants.findIndex((t) => t.id === id);
    if (tenantIndex === -1) {
      return Promise.reject(new Error("Tenant not found"));
    }
    try {
      await updateDocument("tenants", id, data);
      // mockTenants = mockTenants.map((p) =>
      //   p.id === id ? ({ ...p, ...data } as Tenant) : p
      // );
    } catch (e) {}
    const updatedTenant = {
      ...mockTenants[tenantIndex],
      ...data,
      updatedAt: new Date(),
    };
    mockTenants[tenantIndex] = updatedTenant;
    return Promise.resolve(updatedTenant);
  },
};
