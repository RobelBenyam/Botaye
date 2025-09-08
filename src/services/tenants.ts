import { User } from "../context/AuthContext";
import { Tenant } from "../types";
import { readAllDocuments, updateDocument } from "../utils/db";

const mockTenants: Tenant[] = [];
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
    // Convert Firestore Timestamp fields to JS Date objects

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

    const userString = localStorage.getItem("auth.user");
    const currentUser: User | null = userString
      ? (JSON.parse(userString) as User)
      : null;
    console.log("Current User:", currentUser);
    if (currentUser?.role === "property_manager") {
      const userTenants = (tenantsWithDates as Tenant[]).filter(
        (t) =>
          t.propertyId && currentUser.assignedProperties?.includes(t.propertyId)
      );
      return userTenants as Tenant[];
    }

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
