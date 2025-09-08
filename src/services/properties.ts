import { Property } from "../types";
import { readAllDocuments, updateDocument } from "../utils/db";
import { User } from "../context/AuthContext";

export interface PropertiesRepository {
  list(): Promise<Property[]>;
  create(data: Omit<Property, "id" | "createdAt">): Promise<Property>;
  update(
    id: string,
    data: Partial<Omit<Property, "id" | "createdAt">>
  ): Promise<Property>;
  delete(id: string): Promise<void>;
}

// In-memory store for mock operations
let propertiesStore: Property[] = [];

export const mockPropertiesRepository: PropertiesRepository = {
  async list(): Promise<Property[]> {
    const allProperties = await readAllDocuments("properties");
    // Get the current user from localStorage or any auth context if available
    const userString = localStorage.getItem("auth.user");
    const currentUser: User | null = userString
      ? (JSON.parse(userString) as User)
      : null;
    console.log("Current User:", currentUser);
    if (currentUser?.role === "property_manager") {
      console.log("all ", allProperties);

      const userProperties = (allProperties as Property[]).filter(
        (_p) => true
        // p.createdBy === currentUser.id ||
        // currentUser.assignedProperties?.includes?.(p.id)
      );
      propertiesStore = userProperties as Property[];
      return userProperties as Property[];
    }

    propertiesStore = allProperties as Property[];
    return propertiesStore;
  },
  async create(data): Promise<Property> {
    const newProperty: Property = {
      id: Math.random().toString(36).slice(2),
      createdAt: new Date(),
      ...data,
    };
    propertiesStore = [newProperty, ...propertiesStore];
    return newProperty;
  },
  async update(id, data): Promise<Property> {
    try {
      await updateDocument("properties", id, data);
      propertiesStore = propertiesStore.map((p) =>
        p.id === id ? ({ ...p, ...data } as Property) : p
      );
    } catch (e) {}
    const updated = propertiesStore.find((p) => p.id === id)!;
    return updated;
  },
  async delete(id): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    propertiesStore = propertiesStore.filter((p) => p.id !== id);
  },
};
