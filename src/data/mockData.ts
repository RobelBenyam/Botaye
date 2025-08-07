import { Property, Tenant, MaintenanceRequest, Payment, DashboardStats } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    name: 'Two Rivers Mall Residences',
    address: 'Limuru Road, Ruaka, Nairobi',
    type: 'residential',
    units: 45,
    rentAmount: 120000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    description: 'Luxury apartments adjacent to Two Rivers Mall',
    amenities: ['Shopping Mall Access', 'Gym', 'Swimming Pool', 'Security', '24/7 Water', 'Backup Power'],
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Gigiri Diplomatic Heights',
    address: 'United Nations Avenue, Gigiri, Nairobi',
    type: 'residential',
    units: 28,
    rentAmount: 180000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    description: 'Premium diplomatic area residences',
    amenities: ['Diplomatic Security', 'Garden', 'Parking', 'Security', 'Backup Power', 'Water Tank'],
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Westlands Business Park',
    address: 'Chiromo Road, Westlands, Nairobi',
    type: 'commercial',
    units: 20,
    rentAmount: 150000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    description: 'Modern office spaces in Westlands business district',
    amenities: ['Conference Rooms', 'Parking', 'Security', 'High-Speed Internet', 'Generator', 'Cafeteria'],
    createdAt: new Date('2023-03-10')
  },
  {
    id: '4',
    name: 'Karen Golf View',
    address: 'Karen Road, Karen, Nairobi',
    type: 'residential',
    units: 12,
    rentAmount: 200000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab60b6b0e6c8?w=400&h=300&fit=crop',
    description: 'Exclusive golf course view residences',
    amenities: ['Golf Course Access', 'Swimming Pool', 'Tennis Court', 'Security', 'Garden', 'Servant Quarters'],
    createdAt: new Date('2023-04-05')
  },
  {
    id: '5',
    name: 'Upperhill Financial Centre',
    address: 'Ragati Road, Upperhill, Nairobi',
    type: 'commercial',
    units: 25,
    rentAmount: 220000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    description: 'Premium financial district office complex',
    amenities: ['Conference Facilities', 'Parking', 'Security', 'High-Speed Internet', 'Cafeteria', 'Banking Services'],
    createdAt: new Date('2023-05-12')
  },
  {
    id: '6',
    name: 'South C Comfort Homes',
    address: 'Mombasa Road, South C, Nairobi',
    type: 'residential',
    units: 40,
    rentAmount: 75000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    description: 'Comfortable family homes in South C',
    amenities: ['Parking', 'Security', 'Water Tank', 'Backup Power', 'Playground'],
    createdAt: new Date('2023-06-18')
  },
  {
    id: '7',
    name: 'Lavington Green Apartments',
    address: 'James Gichuru Road, Lavington, Nairobi',
    type: 'residential',
    units: 35,
    rentAmount: 110000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
    description: 'Green living apartments in upscale Lavington',
    amenities: ['Garden', 'Parking', 'Security', 'Solar Power', 'Water Tank', 'Recycling'],
    createdAt: new Date('2023-07-10')
  },
  {
    id: '8',
    name: 'Kilimani Business Hub',
    address: 'Argwings Kodhek Road, Kilimani, Nairobi',
    type: 'commercial',
    units: 18,
    rentAmount: 140000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    description: 'Modern business hub in Kilimani',
    amenities: ['Conference Rooms', 'Parking', 'Security', 'High-Speed Internet', 'Generator', 'Restaurant'],
    createdAt: new Date('2023-08-15')
  },
  {
    id: '9',
    name: 'Westlands Executive Suites',
    address: 'Westlands Road, Westlands, Nairobi',
    type: 'residential',
    units: 22,
    rentAmount: 160000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    description: 'Executive suites for business professionals',
    amenities: ['Business Center', 'Gym', 'Parking', 'Security', 'Backup Power', 'Concierge'],
    createdAt: new Date('2023-09-20')
  },
  {
    id: '10',
    name: 'Karen Country Club Residences',
    address: 'Karen Road, Karen, Nairobi',
    type: 'residential',
    units: 15,
    rentAmount: 250000,
    status: 'occupied',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab60b6b0e6c8?w=400&h=300&fit=crop',
    description: 'Luxury residences at Karen Country Club',
    amenities: ['Country Club Access', 'Golf Course', 'Swimming Pool', 'Tennis Court', 'Security', 'Fine Dining'],
    createdAt: new Date('2023-10-25')
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
    rentAmount: 200000,
    depositAmount: 200000,
    status: 'active',
    emergencyContact: {
      name: 'David Muthoni',
      phone: '+254 700 543 210',
      relationship: 'Spouse'
    }
  },
  {
    id: '6',
    firstName: 'Tadesse',
    lastName: 'Haile',
    email: 'tadesse.haile@email.com',
    phone: '+254 700 678 901',
    propertyId: '7',
    unitNumber: 'E12',
    leaseStart: new Date('2023-08-01'),
    leaseEnd: new Date('2024-07-31'),
    rentAmount: 110000,
    depositAmount: 110000,
    status: 'active',
    emergencyContact: {
      name: 'Martha Haile',
      phone: '+254 700 432 109',
      relationship: 'Spouse'
    }
  },
  {
    id: '7',
    firstName: 'Njeri',
    lastName: 'Wanjiku',
    email: 'njeri.wanjiku@email.com',
    phone: '+254 700 789 012',
    propertyId: '8',
    unitNumber: 'F5',
    leaseStart: new Date('2023-09-01'),
    leaseEnd: new Date('2024-08-31'),
    rentAmount: 140000,
    depositAmount: 140000,
    status: 'active',
    emergencyContact: {
      name: 'John Wanjiku',
      phone: '+254 700 321 098',
      relationship: 'Spouse'
    }
  },
  {
    id: '8',
    firstName: 'Yohannes',
    lastName: 'Tekle',
    email: 'yohannes.tekle@email.com',
    phone: '+254 700 890 123',
    propertyId: '9',
    unitNumber: 'G8',
    leaseStart: new Date('2023-10-01'),
    leaseEnd: new Date('2024-09-30'),
    rentAmount: 160000,
    depositAmount: 160000,
    status: 'active',
    emergencyContact: {
      name: 'Sara Tekle',
      phone: '+254 700 210 987',
      relationship: 'Spouse'
    }
  },
  {
    id: '9',
    firstName: 'Wanjira',
    lastName: 'Karanja',
    email: 'wanjira.karanja@email.com',
    phone: '+254 700 901 234',
    propertyId: '10',
    unitNumber: 'H2',
    leaseStart: new Date('2023-11-01'),
    leaseEnd: new Date('2024-10-31'),
    rentAmount: 250000,
    depositAmount: 250000,
    status: 'active',
    emergencyContact: {
      name: 'Peter Karanja',
      phone: '+254 700 109 876',
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
    amount: 120000,
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
    propertyId: '2',
    amount: 180000,
    type: 'rent',
    status: 'completed',
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2024-01-01'),
    description: 'January 2024 Rent',
    method: 'transfer'
  },
  {
    id: '3',
    tenantId: '3',
    propertyId: '3',
    amount: 150000,
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
    propertyId: '6',
    amount: 75000,
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
    amount: 200000,
    type: 'rent',
    status: 'completed',
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2023-12-30'),
    description: 'January 2024 Rent',
    method: 'transfer'
  },
  {
    id: '6',
    tenantId: '6',
    propertyId: '7',
    amount: 110000,
    type: 'rent',
    status: 'pending',
    dueDate: new Date('2024-01-01'),
    description: 'January 2024 Rent'
  },
  {
    id: '7',
    tenantId: '7',
    propertyId: '8',
    amount: 140000,
    type: 'rent',
    status: 'completed',
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2024-01-01'),
    description: 'January 2024 Rent',
    method: 'transfer'
  },
  {
    id: '8',
    tenantId: '8',
    propertyId: '9',
    amount: 160000,
    type: 'rent',
    status: 'completed',
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2023-12-29'),
    description: 'January 2024 Rent',
    method: 'transfer'
  },
  {
    id: '9',
    tenantId: '9',
    propertyId: '10',
    amount: 250000,
    type: 'rent',
    status: 'completed',
    dueDate: new Date('2024-01-01'),
    paidDate: new Date('2023-12-31'),
    description: 'January 2024 Rent',
    method: 'transfer'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalProperties: 10,
  totalUnits: 260,
  occupiedUnits: 260,
  monthlyRevenue: 1685000,
  maintenanceRequests: 8,
  overduePayments: 2
}; 