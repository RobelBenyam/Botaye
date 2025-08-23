import { Property } from '../types';
import { mockProperties } from '../data/mockData';

export interface PropertiesRepository {
  list(): Promise<Property[]>;
  create(data: Omit<Property, 'id' | 'createdAt'>): Promise<Property>;
  update(id: string, data: Partial<Omit<Property, 'id' | 'createdAt'>>): Promise<Property>;
  delete(id: string): Promise<void>;
}

// In-memory store for mock operations
let propertiesStore: Property[] = mockProperties.map((p) => ({ ...p }));

export const mockPropertiesRepository: PropertiesRepository = {
  async list(): Promise<Property[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return propertiesStore;
  },
  async create(data): Promise<Property> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newProperty: Property = {
      id: Math.random().toString(36).slice(2),
      createdAt: new Date(),
      ...data,
    };
    propertiesStore = [newProperty, ...propertiesStore];
    return newProperty;
  },
  async update(id, data): Promise<Property> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    propertiesStore = propertiesStore.map((p) => (p.id === id ? { ...p, ...data } as Property : p));
    const updated = propertiesStore.find((p) => p.id === id)!;
    return updated;
  },
  async delete(id): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    propertiesStore = propertiesStore.filter((p) => p.id !== id);
  },
}; 