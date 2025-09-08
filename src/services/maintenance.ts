import { User } from "../context/AuthContext";
import { MaintenanceRequest } from "../types";
import { createDocument, readAllDocuments } from "../utils/db";

export interface MaintenanceRepository {
  list(): Promise<MaintenanceRequest[]>;
  create(data: MaintenanceRequest): Promise<void>;
}

export const mockMaintenanceRepository: MaintenanceRepository = {
  async list(): Promise<MaintenanceRequest[]> {
    try {
      const maintenanceRequests = await readAllDocuments(
        "maintenance_requests"
      );

      const userString = localStorage.getItem("auth.user");
      const currentUser: User | null = userString
        ? (JSON.parse(userString) as User)
        : null;
      if (currentUser?.role === "property_manager") {
        const userMaintenance = (
          maintenanceRequests as MaintenanceRequest[]
        ).filter(
          (t) =>
            t.propertyId &&
            currentUser.assignedProperties?.includes(t.propertyId)
        );
        return userMaintenance;
      }

      return maintenanceRequests as MaintenanceRequest[];
    } catch (error) {
      console.error("Error fetching maintenance requests:", error);
      throw error;
    }
  },

  async create(data: MaintenanceRequest): Promise<void> {
    try {
      await createDocument("maintenance_requests", data);
    } catch (error) {
      console.error("Error creating maintenance request:", error);
      throw error;
    }
  },
};
