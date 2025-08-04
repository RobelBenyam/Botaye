import React from 'react';
import { 
  Home, 
  Building2, 
  Users, 
  FileText, 
  Wrench, 
  DollarSign, 
  BarChart3,
  Settings,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'tenants', label: 'Tenants', icon: Users },
  { id: 'leases', label: 'Leases', icon: FileText },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench },
  { id: 'payments', label: 'Payments', icon: DollarSign },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-72 h-screen fixed left-0 top-0 z-30 bg-gradient-to-b from-white via-white to-gray-50/30 backdrop-blur-xl border-r border-white/50 shadow-medium">
      <div className="p-8">
        <div className="flex items-center space-x-4 group">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 rounded-2xl flex items-center justify-center shadow-glow transform group-hover:scale-110 transition-all duration-300">
              <Building2 className="w-6 h-6 text-white" />
              <Sparkles className="w-3 h-3 text-white/70 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold gradient-text">Botaye</h1>
            <p className="text-sm text-gray-500 font-medium">Property Management</p>
          </div>
        </div>
      </div>
      
      <nav className="px-6">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`sidebar-item w-full group ${
                  activeTab === item.id ? 'active' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-4 icon" />
                <span className="font-semibold text-sm tracking-wide">{item.label}</span>
                {activeTab === item.id && (
                  <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}; 