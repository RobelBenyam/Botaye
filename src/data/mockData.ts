import { Property, Tenant, MaintenanceRequest, Payment, DashboardStats } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Westlands Heights',
    address: 'Westlands Road, Westlands, Nairobi',
    type: 'residential',
    units: 24,
    rentAmount: 85000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    description: 'Modern apartment complex in the heart of Westlands',
    amenities: ['Pool', 'Gym', 'Parking', 'Security', '24/7 Water'],
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Kilimani Gardens',
    address: 'Argwings Kodhek Road, Kilimani, Nairobi',
    type: 'residential',
    units: 18,
    rentAmount: 95000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    description: 'Luxury apartments with garden views',
    amenities: ['Garden', 'Parking', 'Security', 'Backup Power', 'Water Tank'],
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Lavington Business Centre',
    address: 'James Gichuru Road, Lavington, Nairobi',
    type: 'commercial',
    units: 12,
    rentAmount: 120000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    description: 'Professional office spaces in upscale Lavington',
    amenities: ['Conference Rooms', 'Parking', 'Security', 'High-Speed Internet', 'Generator'],
    createdAt: new Date('2023-03-10')
  },
  {
    id: '4',
    name: 'Karen Village',
    address: 'Karen Road, Karen, Nairobi',
    type: 'residential',
    units: 8,
    rentAmount: 150000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab60b6b0e6c8?w=400&h=300&fit=crop',
    description: 'Exclusive residential units in prestigious Karen',
    amenities: ['Swimming Pool', 'Tennis Court', 'Security', 'Garden', 'Servant Quarters'],
    createdAt: new Date('2023-04-05')
  },
  {
    id: '5',
    name: 'Upperhill Plaza',
    address: 'Ragati Road, Upperhill, Nairobi',
    type: 'commercial',
    units: 15,
    rentAmount: 180000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    description: 'Modern office complex in Nairobi\'s business district',
    amenities: ['Conference Facilities', 'Parking', 'Security', 'High-Speed Internet', 'Cafeteria'],
    createdAt: new Date('2023-05-12')
  },
  {
    id: '6',
    name: 'South B Estate',
    address: 'Mombasa Road, South B, Nairobi',
    type: 'residential',
    units: 32,
    rentAmount: 65000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    description: 'Affordable housing in convenient South B location',
    amenities: ['Parking', 'Security', 'Water Tank', 'Backup Power'],
    createdAt: new Date('2023-06-18')
  }
];

export const mockTenants: Tenant[] = [
  {
    id: '1',
    firstName: 'Amina',
    lastName: 'Ochieng',
    email: 'amina.ochieng@email.com',
    phone: '+254 700 123 456',
    propertyId: '1',
    unitNumber: 'A12',
    leaseStart: new Date('2023-06-01'),
    leaseEnd: new Date('2024-05-31'),
    rentAmount: 85000,
    depositAmount: 85000,
    status: 'active',
    emergencyContact: {
      name: 'James Ochieng',
      phone: '+254 700 987 654',
      relationship: 'Spouse'
    }
  },
  {
    id: '2',
    firstName: 'Kebede',
    lastName: 'Tadesse',
    email: 'kebede.tadesse@email.com',
    phone: '+254 700 234 567',
    propertyId: '1',
    unitNumber: 'B8',
    leaseStart: new Date('2023-08-15'),
    leaseEnd: new Date('2024-08-14'),
    rentAmount: 85000,
    depositAmount: 85000,
    status: 'active',
    emergencyContact: {
      name: 'Bethel Tadesse',
      phone: '+254 700 876 543',
      relationship: 'Spouse'
    }
  },
  {
    id: '3',
    firstName: 'Wanjiku',
    lastName: 'Kamau',
    email: 'wanjiku.kamau@email.com',
    phone: '+254 700 345 678',
    propertyId: '3',
    unitNumber: '301',
    leaseStart: new Date('2023-04-01'),
    leaseEnd: new Date('2025-03-31'),
    rentAmount: 120000,
    depositAmount: 240000,
    status: 'active',
    emergencyContact: {
      name: 'Peter Kamau',
      phone: '+254 700 765 432',
      relationship: 'Spouse'
    }
  },
  {
    id: '4',
    firstName: 'Abebe',
    lastName: 'Bekele',
    email: 'abebe.bekele@email.com',
    phone: '+254 700 456 789',
    propertyId: '2',
    unitNumber: 'C15',
    leaseStart: new Date('2023-09-01'),
    leaseEnd: new Date('2024-08-31'),
    rentAmount: 95000,
    depositAmount: 95000,
    status: 'active',
    emergencyContact: {
      name: 'Yohannes Bekele',
      phone: '+254 700 654 321',
      relationship: 'Brother'
    }
  },
  {
    id: '5',
    firstName: 'Grace',
    lastName: 'Muthoni',
    email: 'grace.muthoni@email.com',
    phone: '+254 700 567 890',
    propertyId: '4',
    unitNumber: 'D3',
    leaseStart: new Date('2023-07-01'),
    leaseEnd: new Date('2024-06-30'),
    rentAmount: 150000,
    depositAmount: 150000,
    status: 'active',
    emergencyContact: {
      name: 'David Muthoni',
      phone: '+254 700 543 210',
      relationship: 'Spouse'
    }
  }
];

export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: '1',
    propertyId: '1',
    tenantId: '1',
    title: 'Water Pressure Issue',
    description: 'Low water pressure in the bathroom for the past few days.',
    priority: 'medium',
    status: 'open',
    category: 'plumbing',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    propertyId: '1',
    tenantId: '2',
    title: 'Backup Generator Not Working',
    description: 'Generator failed to start during power outage yesterday.',
    priority: 'high',
    status: 'in-progress',
    category: 'electrical',
    assignedTo: 'Power Solutions Ltd.',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: '3',
    propertyId: '3',
    title: 'Security System Maintenance',
    description: 'Monthly security system inspection and maintenance required.',
    priority: 'low',
    status: 'completed',
    category: 'other',
    assignedTo: 'SecureTech Kenya',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-05'),
    completedAt: new Date('2024-01-05'),
    actualCost: 25000
  },
  {
    id: '4',
    propertyId: '2',
    tenantId: '4',
    title: 'Garden Irrigation System',
    description: 'Automatic sprinkler system not working properly.',
    priority: 'medium',
    status: 'open',
    category: 'other',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '5',
    propertyId: '4',
    title: 'Swimming Pool Pump',
    description: 'Pool pump making unusual noise and needs servicing.',
    priority: 'medium',
    status: 'in-progress',
    category: 'other',
    assignedTo: 'PoolCare Services',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-16')
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    tenantId: '1',
    propertyId: '1',
    amount: 85000,
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
    amount: 85000,
    type: 'rent',
    status: 'pending',
    dueDate: new Date('2024-01-01'),
    description: 'January 2024 Rent'
  },
  {
    id: '3',
    tenantId: '3',
    propertyId: '3',
    amount: 120000,
    type: 'rent',
    status: 'completed',
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2024-01-02'),
    description: 'January 2024 Rent',
    method: 'check'
  },
  {
    id: '4',
    tenantId: '4',
    propertyId: '2',
    amount: 95000,
    type: 'rent',
    status: 'completed',
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2024-01-01'),
    description: 'January 2024 Rent',
    method: 'transfer'
  },
  {
    id: '5',
    tenantId: '5',
    propertyId: '4',
    amount: 150000,
    type: 'rent',
    status: 'completed',
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2023-12-30'),
    description: 'January 2024 Rent',
    method: 'transfer'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProperties: 6,
  totalUnits: 109,
  occupiedUnits: 109,
  monthlyRevenue: 695000,
  maintenanceRequests: 5,
  overduePayments: 1
}; 