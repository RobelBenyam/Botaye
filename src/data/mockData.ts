import { Property, Tenant, MaintenanceRequest, Payment, DashboardStats } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Sunset Apartments',
    address: '123 Sunset Blvd, Los Angeles, CA 90028',
    type: 'residential',
    units: 24,
    rentAmount: 2500,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    description: 'Modern apartment complex with premium amenities',
    amenities: ['Pool', 'Gym', 'Parking', 'Laundry'],
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Downtown Lofts',
    address: '456 Main St, Downtown, CA 90012',
    type: 'residential',
    units: 18,
    rentAmount: 3200,
    status: 'vacant',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    description: 'Luxury lofts in the heart of downtown',
    amenities: ['Rooftop Deck', 'Concierge', 'Gym', 'Storage'],
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Office Plaza',
    address: '789 Business Ave, Beverly Hills, CA 90210',
    type: 'commercial',
    units: 12,
    rentAmount: 8500,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    description: 'Premium office space with modern facilities',
    amenities: ['Conference Rooms', 'High-Speed Internet', 'Parking', 'Security'],
    createdAt: new Date('2023-03-10')
  }
];

export const mockTenants: Tenant[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    propertyId: '1',
    unitNumber: 'A12',
    leaseStart: new Date('2023-06-01'),
    leaseEnd: new Date('2024-05-31'),
    rentAmount: 2500,
    depositAmount: 2500,
    status: 'active',
    emergencyContact: {
      name: 'Jane Smith',
      phone: '(555) 987-6543',
      relationship: 'Spouse'
    }
  },
  {
    id: '2',
    firstName: 'Emily',
    lastName: 'Johnson',
    email: 'emily.johnson@email.com',
    phone: '(555) 234-5678',
    propertyId: '1',
    unitNumber: 'B8',
    leaseStart: new Date('2023-08-15'),
    leaseEnd: new Date('2024-08-14'),
    rentAmount: 2500,
    depositAmount: 2500,
    status: 'active',
    emergencyContact: {
      name: 'Robert Johnson',
      phone: '(555) 876-5432',
      relationship: 'Father'
    }
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 345-6789',
    propertyId: '3',
    unitNumber: '301',
    leaseStart: new Date('2023-04-01'),
    leaseEnd: new Date('2025-03-31'),
    rentAmount: 8500,
    depositAmount: 17000,
    status: 'active',
    emergencyContact: {
      name: 'Sarah Brown',
      phone: '(555) 765-4321',
      relationship: 'Spouse'
    }
  }
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    propertyId: '1',
    tenantId: '1',
    title: 'Leaky Faucet in Kitchen',
    description: 'The kitchen faucet has been dripping constantly for the past week.',
    priority: 'medium',
    status: 'open',
    category: 'plumbing',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    estimatedCost: 150
  },
  {
    id: '2',
    propertyId: '1',
    tenantId: '2',
    title: 'Air Conditioning Not Working',
    description: 'AC unit stopped working yesterday. Very hot in the apartment.',
    priority: 'high',
    status: 'in-progress',
    category: 'hvac',
    assignedTo: 'HVAC Repair Co.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12'),
    estimatedCost: 300
  },
  {
    id: '3',
    propertyId: '3',
    title: 'Elevator Maintenance',
    description: 'Monthly elevator inspection and maintenance required.',
    priority: 'low',
    status: 'completed',
    category: 'structural',
    assignedTo: 'Elevator Services Inc.',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-05'),
    completedAt: new Date('2024-01-05'),
    estimatedCost: 500,
    actualCost: 450
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    tenantId: '1',
    propertyId: '1',
    amount: 2500,
    type: 'rent',
    status: 'completed',
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2023-12-28'),
    description: 'January 2024 Rent',
    method: 'transfer'
  },
  {
    id: '2',
    tenantId: '2',
    propertyId: '1',
    amount: 2500,
    type: 'rent',
    status: 'pending',
    dueDate: new Date('2024-01-01'),
    description: 'January 2024 Rent'
  },
  {
    id: '3',
    tenantId: '3',
    propertyId: '3',
    amount: 8500,
    type: 'rent',
    status: 'completed',
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2024-01-02'),
    description: 'January 2024 Rent',
    method: 'check'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProperties: 3,
  totalUnits: 54,
  occupiedUnits: 42,
  monthlyRevenue: 156500,
  maintenanceRequests: 8,
  overduePayments: 2
}; 