export interface Property {
  id?: string;
  title: string;
  description?: string;
  address: string;
  city: string;
  state?: string;
  country: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number; // in square meters
  images?: string[];
  listedAt: Date;
  ownerId: string;
  isActive: boolean;
}
