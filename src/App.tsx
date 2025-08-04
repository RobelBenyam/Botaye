import React, { useState } from 'react';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { DashboardStats } from './components/Dashboard/DashboardStats';
import { RecentActivity } from './components/Dashboard/RecentActivity';
import { PropertyList } from './components/Properties/PropertyList';
import { TenantList } from './components/Tenants/TenantList';
import { MaintenanceList } from './components/Maintenance/MaintenanceList';
import { PaymentList } from './components/Payments/PaymentList';
import { LeaseList } from './components/Leases/LeaseList';
import { ReportsDashboard } from './components/Reports/ReportsDashboard';
import { SettingsPanel } from './components/Settings/SettingsPanel';
import { 
  mockProperties, 
  mockTenants, 
  mockMaintenanceRequests, 
  mockPayments,
  mockDashboardStats 
} from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="page-enter space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold font-display gradient-text mb-3">
                Welcome Back, Sarah
              </h1>
              <p className="text-xl text-gray-600 font-medium">
                Here's what's happening with your properties today
              </p>
            </div>
            
            <DashboardStats stats={mockDashboardStats} />
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <RecentActivity />
              </div>
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-lg font-bold text-gray-900 font-display mb-4">Quick Insights</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-primary-50 to-transparent rounded-xl">
                      <span className="text-gray-700 font-medium">Occupancy Rate</span>
                      <span className="font-bold text-primary-600">
                        {Math.round((mockDashboardStats.occupiedUnits / mockDashboardStats.totalUnits) * 100)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-success-50 to-transparent rounded-xl">
                      <span className="text-gray-700 font-medium">Avg. Rent</span>
                      <span className="font-bold text-success-600">$3,400</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-secondary-50 to-transparent rounded-xl">
                      <span className="text-gray-700 font-medium">Collection Rate</span>
                      <span className="font-bold text-secondary-600">98.5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                    <span className="text-2xl font-bold text-white">AI</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Smart Insights</h4>
                  <p className="text-sm text-gray-600 mb-4">Get AI-powered recommendations for your properties</p>
                  <button className="btn-primary text-sm py-2 px-4">
                    Enable AI Assistant
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'properties':
        return <PropertyList properties={mockProperties} />;
      case 'tenants':
        return <TenantList tenants={mockTenants} />;
      case 'leases':
        return <LeaseList tenants={mockTenants} />;
      case 'maintenance':
        return <MaintenanceList requests={mockMaintenanceRequests} />;
      case 'payments':
        return <PaymentList payments={mockPayments} />;
      case 'reports':
        return <ReportsDashboard />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <Header />
      <main className="ml-72 pt-40 p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App; 