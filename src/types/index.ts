export interface Property {
  id: string;
  name: string;
  address: string;
  type: "residential" | "commercial";
  units: number;
  rentAmount: number;
  status: "occupied" | "vacant" | "maintenance";
  imageUrls?: string[];
  floorPlanUrl?: string;
  description?: string;
  amenities: string[];
  createdAt: Date;
  createdBy: string;
}

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyId: string;
  unitNumber?: string;
  leaseStart: Date;
  leaseEnd: Date;
  rentAmount: number;
  depositAmount: number;
  status: "active" | "pending" | "expired";
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface MaintenanceRequest {
  id: string;
  propertyId: string; 
  tenantId?: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "completed" | "cancelled";
  category:
    | "plumbing"
    | "electrical"
    | "hvac"
    | "appliance"
    | "structural"
    | "other";
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  estimatedCost?: number;
  actualCost?: number;
}

export interface Payment {
  id: string;
  tenantId: string;
  propertyId: string;
  amount: number;
  type: "rent" | "deposit" | "fee" | "utility";
  status: "pending" | "completed" | "failed";
  dueDate: Date;
  paidDate?: Date;
  description: string;
  method?: "cash" | "check" | "card" | "transfer";
}

export interface DashboardStats {
  totalProperties: number;
  totalUnits: number;
  occupiedUnits: number;
  monthlyRevenue: number;
  maintenanceRequests: number;
  overduePayments: number;
}
