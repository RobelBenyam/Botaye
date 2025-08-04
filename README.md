# Property Management System

A modern, responsive property management application built with React, TypeScript, and Tailwind CSS.

## Features

### Dashboard
- Overview statistics with key metrics
- Recent activity feed
- Quick stats and performance indicators
- Modern, responsive design

### Property Management
- Property listings with detailed information
- Search and filter capabilities
- Property status tracking (occupied, vacant, maintenance)
- Image galleries and amenity listings

### Tenant Management
- Comprehensive tenant profiles
- Contact information and lease details
- Status tracking (active, pending, expired)
- Emergency contact information

### Maintenance Requests
- Request tracking system
- Priority levels (low, medium, high, urgent)
- Status management (open, in-progress, completed, cancelled)
- Cost estimation and tracking

### Additional Features
- Responsive design for all screen sizes
- Modern UI with smooth animations
- Search functionality across all modules
- Filter and sort capabilities
- Professional color scheme and typography

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot reload and fast refresh

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── DashboardStats.tsx
│   │   └── RecentActivity.tsx
│   ├── Layout/
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   ├── Properties/
│   │   ├── PropertyCard.tsx
│   │   └── PropertyList.tsx
│   ├── Tenants/
│   │   └── TenantList.tsx
│   └── Maintenance/
│       └── MaintenanceList.tsx
├── data/
│   └── mockData.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Features in Development

- Payment processing and tracking
- Financial reports and analytics
- Lease management system
- Document storage and management
- Automated notifications
- Advanced reporting dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 